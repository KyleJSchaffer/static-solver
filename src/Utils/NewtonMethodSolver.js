import { parse, matrix, multiply, inv, index, abs, derivative } from 'mathjs'
//Uses Newton's Method for systems of equations to attempt to find a solution.
//The method follows the equation: Xk+1 = Xk-J(x)F(x), where k is the current iteration,
//Xk is a column vector containing the current estimate, J(X) is the jacobian of the system of equations,
//and F(x) is a column vector containing each equation

export function solveNewtonMethod(functions, variables) {
    const TOLERANCE = .0001;
    const MAX_ITERATIONS = 20;
    //Parse each function into an expression tree
    const functionExpressions = functions.map(func => (
        parse(func)
    ))

    //Assign each variable an inital estiamte of 1
    let initEstimate = {};
    variables.forEach(variable => {
        initEstimate[variable] = 1
    });
    let currentError = TOLERANCE + 1;
    let currentIteration = 0;
    let previousEstimate, currentEstimate = initEstimate;

    //Create function vector F(x), an [n,1] matrix where n is the number of functions and each element is a function
    const functionVector = matrix(functionExpressions);
    //Create jacobian matrix J(x)
    const jacobian = createJacobian(functionExpressions, variables);

    try {
        while (currentIteration < MAX_ITERATIONS && currentError > TOLERANCE) {
            //Find J(x) and -F(x) where x is the current estimates
            let evaluatedJacobian = calculateMatrixValues(jacobian, currentEstimate);
            let evaluatedFunctionVector = calculateMatrixValues(functionVector, currentEstimate);
            evaluatedFunctionVector = multiply(evaluatedFunctionVector, -1);

            //Calculate inverse of J(x) * -F(x)
            const deltaX = multiply(inv(evaluatedJacobian), evaluatedFunctionVector);

            //Find new estimate and calculate error
            previousEstimate = { ...currentEstimate };
            const errorArray = variables.map((variable, i) => {
                currentEstimate[variable] += deltaX.subset(index(i));
                return abs(currentEstimate[variable] - previousEstimate[variable])
            })
            currentError = Math.max(...errorArray);
            currentIteration++;
        }
    } catch (error) {
        return null;
    }
    if (currentIteration === MAX_ITERATIONS) {
        return null;
    } else {
        return currentEstimate
    }
}

export function createJacobian(functionArray, variableArray) {
    let jacobian = matrix();
    //Calculates the partial derivative for each variable, for each function and stores it in the jacobian matrix
    jacobian.resize([functionArray.length, variableArray.length]);
    for (let i = 0; i < functionArray.length; i++) {
        for (let j = 0; j < variableArray.length; j++) {
            const partialDer = derivative(functionArray[i], variableArray[j]);
            jacobian.subset(index(i, j), partialDer);
        }
    }
    return jacobian;
}

export function calculateMatrixValues(expressionMatrix, scope) {
    const evaluatedMatrix = expressionMatrix.map((expression) => {
        return expression.compile().evaluate(scope);
    })
    return evaluatedMatrix;

}

export default solveNewtonMethod