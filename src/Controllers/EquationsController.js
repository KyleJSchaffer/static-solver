import { Equations, Rectangle, TopForces, BottomForces, LeftForces, RightForces, Moment, ExtraRelations } from '../Models';
import { parse, simplify } from 'mathjs';

const CONSTANT_SYMBOLS = ['pi', 'PI', 'e', 'E'];

//Controller that pulls data from most of the models and converts them into equations before passing them to the equation view
export class EquationsController {
    constructor(view) {
        this.view = view

        //Determines if the simplified equations should be shown
        this.simplifyEquations = false

        //Pass event handlers to the view
        this.view.toggleSimplify = this.toggleSimplify

        //Subscribe to models so that update is called when they are changed
        Equations.subscribe(this.updateView);
        Rectangle.subscribe(this.updateEquations);
        TopForces.subscribe(this.updateEquations);
        BottomForces.subscribe(this.updateEquations);
        LeftForces.subscribe(this.updateEquations);
        RightForces.subscribe(this.updateEquations);
        Moment.subscribe(this.updateEquations);
        ExtraRelations.subscribe(this.updateEquations);

        //Initial render
        this.updateEquations()
        this.updateView();
    }

    //Passes the equations and unknown variables to the equation view to render
    updateView = () => {
        if (this.simplifyEquations) {
            const SimpleFxEquation = simplify(Equations.fxEquation).toString();
            const SimpleFyEquation = simplify(Equations.fyEquation).toString();
            const SimpleMEquation = simplify(Equations.mEquation).toString();
            this.view.render(SimpleFxEquation, SimpleFyEquation, SimpleMEquation,
                ExtraRelations.relations, Equations.unknownVariables, this.simplifyEquations
            )
        } else {
            this.view.render(Equations.fxEquation, Equations.fyEquation, Equations.mEquation,
                ExtraRelations.relations, Equations.unknownVariables, this.simplifyEquations
            )
        }
    }

    //Calculates the new equations and updates the equation model
    updateEquations = () => {
        const rectWidth = Rectangle.width;
        const rectHeight = Rectangle.height;

        let fxEquation = '';
        let fyEquation = '';
        let mEquation = Moment.value + ' + ';
        //Iterates over each force model and adds the x component, y component, and moment component to the correct equation
        TopForces.forceList.forEach((force) => {
            fxEquation += force.xComponent + ' + ';
            fyEquation += force.yComponent + ' + ';
            mEquation += `${force.xComponent} * ${rectHeight / 2} + `;
            mEquation += `${force.yComponent} * (${rectWidth / 2} - (${force.offset})) + `;
        })
        BottomForces.forceList.forEach((force) => {
            fxEquation += force.xComponent + ' + ';
            fyEquation += force.yComponent + ' + ';
            mEquation += `-${force.xComponent} * ${rectHeight / 2} + `;
            mEquation += `${force.yComponent} * (${rectWidth / 2} - (${force.offset})) + `;
        })
        LeftForces.forceList.forEach((force) => {
            fxEquation += force.xComponent + ' + ';
            fyEquation += force.yComponent + ' + ';
            mEquation += `${force.xComponent} * (${rectHeight / 2}- (${force.offset})) + `;
            mEquation += `${force.yComponent} * ${rectWidth / 2} + `;
        })
        RightForces.forceList.forEach((force) => {
            fxEquation += force.xComponent + ' + ';
            fyEquation += force.yComponent + ' + ';
            mEquation += `${force.xComponent} * (${rectHeight / 2}- (${force.offset})) + `;
            mEquation += `-${force.yComponent} * ${rectWidth / 2} + `;
        })

        //Removes the trailing " + "
        fxEquation = fxEquation.slice(0, fxEquation.length - 3);
        fyEquation = fyEquation.slice(0, fyEquation.length - 3);
        mEquation = mEquation.slice(0, mEquation.length - 3);

        //Check the equations length so a 0 is displayed instead of an empty string
        if (fxEquation.length === 0) {
            fxEquation = '0';
        }
        if (fyEquation.length === 0) {
            fyEquation = '0';
        }
        if (mEquation.length === 0) {
            mEquation = '0';
        }

        //Get the variable from each equation and add them to the model
        let unknownVariables = [];
        this._getUnknownVariables(fxEquation, unknownVariables);
        this._getUnknownVariables(fyEquation, unknownVariables);
        this._getUnknownVariables(mEquation, unknownVariables);
        ExtraRelations.relations.forEach(relation => {
            this._getUnknownVariables(`${relation.rightExpression} - ${relation.leftExpression}`, unknownVariables);
        })

        //update the model with the new equations and unknowns
        Equations.setFxEquation(fxEquation);
        Equations.setFyEquation(fyEquation);
        Equations.setMEquation(mEquation);
        Equations.setUnknownVariable(unknownVariables);
        Equations.notify();
    }

    toggleSimplify = () => {
        this.simplifyEquations = !this.simplifyEquations;
        this.updateView()
    }

    //Finds the unknown variables from an equation string and adds them to the given array
    _getUnknownVariables(equationStr, unknownVariables) {
        //Converts an equation string into an expression tree and iterates over it to find nodes labeled as symbols
        const expressionTree = parse(equationStr);
        expressionTree.traverse((node, path, parent) => {
            if (node.type === 'SymbolNode' && (!parent || parent.name !== node.name)
                && !unknownVariables.includes(node.name) && !CONSTANT_SYMBOLS.includes(node.name)) {
                unknownVariables.push(node.name)
            }
        })
    }
}