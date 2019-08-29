import { solveNewtonMethod } from '../Utils/NewtonMethodSolver'
import { evaluate } from 'mathjs';

describe('Newton Method Solver', () => {
    it('solves system of 2 simple equations', () => {
        const equation1 = '2x + x*y + 3y +15';
        const equation2 = '7x*y - x';
        const functionArray = [equation1, equation2]
        const unknownVariables = ['x', 'y'];
        const answer = solveNewtonMethod(functionArray, unknownVariables);
        const evaluatedEquations = functionArray.map(func => (
            evaluate(func, answer)
        ))
        expect(Math.abs(Math.max(...evaluatedEquations))).toBeLessThan(.0001);
    })

    it('solves system of 4 simple equations', () => {
        const equation1 = '2x + x*y + 3y +15z+4';
        const equation2 = '7x*y - x-1';
        const equation3 = 'y+w+z';
        const equation4 = 'x*y*z+w +2';
        const functionArray = [equation1, equation2, equation3, equation4]
        const unknownVariables = ['x', 'y', 'z', 'w'];
        const answer = solveNewtonMethod(functionArray, unknownVariables);
        const evaluatedEquations = functionArray.map(func => (
            evaluate(func, answer)
        ))
        expect(Math.abs(Math.max(...evaluatedEquations))).toBeLessThan(.0001);
    })

    it('solves system of 2 trigonometric  equations', () => {
        const equation1 = '2x*cos(y)+2y*cos(3)';
        const equation2 = '7*sin(x)+2*sin(3)';
        const functionArray = [equation1, equation2]
        const unknownVariables = ['x', 'y'];
        const answer = solveNewtonMethod(functionArray, unknownVariables);
        const evaluatedEquations = functionArray.map(func => (
            evaluate(func, answer)
        ))
        expect(Math.abs(Math.max(...evaluatedEquations))).toBeLessThan(.0001);
    })

    it('solves system of 5 trigonometric and linear equations', () => {
        const equation1 = 'x*cos(2y)+2y*cos(3*z)';
        const equation2 = '7y*sin(x)+2*sin(3) +w +3';
        const equation3 = 'x+y+z+w-4';
        const equation4 = 'z-4a-2';
        const equation5 = 'cos(z)+sin(a)'
        const functionArray = [equation1, equation2, equation3, equation4, equation5]
        const unknownVariables = ['x', 'y', 'z', 'w', 'a'];
        const answer = solveNewtonMethod(functionArray, unknownVariables);
        const evaluatedEquations = functionArray.map(func => (
            evaluate(func, answer)
        ))
        expect(Math.abs(Math.max(...evaluatedEquations))).toBeLessThan(.0001);
    })

    it('solves system of 3 long equations', () => {
        const equation1 = '(x) * cos(y) * 75 + (x) * sin(y) * 75 * (100) + (-4) * cos(3z) * 75 + (-4) * sin(3z) * 75 * (2)';
        const equation2 = '(x) * cos(y) + (-4) * cos(3z)';
        const equation3 = '(x) * sin(y) + (-4) * sin(3z)';
        const functionArray = [equation1, equation2, equation3]
        const unknownVariables = ['x', 'y', 'z'];
        const answer = solveNewtonMethod(functionArray, unknownVariables);
        const evaluatedEquations = functionArray.map(func => (
            evaluate(func, answer)
        ))
        expect(Math.abs(Math.max(...evaluatedEquations))).toBeLessThan(.0001);
    })
})