import { ExtraRelations, Equations, Solution } from '../Models';
import { solveNewtonMethod } from '../Utils/NewtonMethodSolver';
import { simplify } from 'mathjs';

//Controller that determines if a solution is possible and contains the function to find the solution.
export class SolutionController {

    constructor(view) {
        this.view = view;

        this.nonZeroFunctions = [];

        //Pass event handlers to the view
        this.view.solve = this.solve

        //Subscribe to models so that update is called when they are changed
        ExtraRelations.subscribe(this.update);
        Equations.subscribe(this.update)

        //Initial render
        this.update();

    }

    //Clears the current solution and determines if a solution is possible.
    update = () => {
        Solution.clear();
        this.nonZeroFunctions = [];
        //Test if x component equation is always zero
        if (!this._testForZeroValue(Equations.fxEquation)) {
            this.nonZeroFunctions.push(Equations.fxEquation)
        }
        //Test if y component equation is always zero
        if (!this._testForZeroValue(Equations.fyEquation)) {
            this.nonZeroFunctions.push(Equations.fyEquation)
        }
        //Test if moment equation is always zero
        if (!this._testForZeroValue(Equations.mEquation)) {
            this.nonZeroFunctions.push(Equations.mEquation)
        }
        //Test if each relation is always zero
        ExtraRelations.relations.forEach(relation => {
            const zeroRelation = `${relation.rightExpression} - (${relation.leftExpression})`
            if (!this._testForZeroValue(zeroRelation)) {
                this.nonZeroFunctions.push(zeroRelation)
            }
        })
        //Determine if the number of nonzero equations is equal to the number of unknown variables and passes the relavent message to the view
        let solutionPossible = true;
        let solutionMessage = `There are ${this.nonZeroFunctions.length} non-zero equations and ${Equations.unknownVariables.length} unknown variables. `;
        if (this.nonZeroFunctions.length > Equations.unknownVariables.length) {
            solutionPossible = false;
            solutionMessage += 'Add more unknown variables, remove extra relations, or adjust the forces so that the number of variables equals the number of non zero equations.'
        } else if (this.nonZeroFunctions.length < Equations.unknownVariables.length) {
            solutionPossible = false;
            solutionMessage += 'Remove unknown variables, add extra relations, or adjust the forces so that the number of variables equals the number of non zero equations.'
        } else if (this.nonZeroFunctions.length === 0) {
            solutionPossible = false;
            solutionMessage += 'Add forces or relations to solve the system.'
        } else {
            solutionPossible = true;
            solutionMessage = ''
        }
        this.view.renderSolveButton(solutionPossible, solutionMessage);
        this.view.renderAnswer(null); //Clears the current solution
    }

    solve = () => {
        //Tries to solve the system of equations and passes the solution (or no solution message) to the view
        const answers = solveNewtonMethod(this.nonZeroFunctions, Equations.unknownVariables);
        if (answers) {
            Solution.set(answers)
            this.view.renderAnswer(answers)
        } else {
            this.view.renderAnswer(null, 'No Solution')
        }
        this.view.renderSolveButton(null, null, true); //Removes the solve button
    }

    _testForZeroValue(equation) {
        //Simplifies the equation and returns true if it simplified to 0
        const simplifiedEquation = simplify(equation).toString();
        return simplifiedEquation === '0'
    }
}