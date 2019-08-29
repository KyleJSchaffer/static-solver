import { TopForces, BottomForces, LeftForces, RightForces, Rectangle, Solution } from '../Models';
import { evaluate } from 'mathjs';

//Controller that passes data from the rectangle and force models to the canvas view
export class CanvasController {

    constructor(canvasView) {
        this.canvasView = canvasView

        this.showSolution = true;
        this.canvasView.toggleSolution = this.toggleSolution

        //Subscribe to models so that update is called when they are changed
        TopForces.subscribe(this.update);
        BottomForces.subscribe(this.update);
        LeftForces.subscribe(this.update);
        RightForces.subscribe(this.update);
        Rectangle.subscribe(this.update);
        Solution.subscribe(this.update);

        //Initial render
        this.update();
    }

    //Pass data from the model to the view to render
    update = () => {
        //Passes either the original forces or the evaluated forces depending on if show solution is toggled
        if (!Solution.answers || !this.showSolution) {
            const forces = this._createForceObject();
            this.canvasView.draw(forces, Rectangle)
        } else {
            const forces = this._createEvaluatedForceObject();
            this.canvasView.draw(forces, Rectangle)
        }
        this.canvasView.renderSolutionToggleButton(Solution.answers, this.showSolution);
    }

    _createForceObject = () => {
        //Combines the force data from the models into a single object
        return {
            topForces: TopForces.forceList,
            bottomForces: BottomForces.forceList,
            leftForces: LeftForces.forceList,
            rightForces: RightForces.forceList
        }
    }

    _createEvaluatedForceObject = () => {
        //Returns an object that contains the force data evaluated with the scope of the solution
        return {
            topForces: TopForces.forceList.map(force => this._evaluateForce(force)),
            bottomForces: BottomForces.forceList.map(force => this._evaluateForce(force)),
            leftForces: LeftForces.forceList.map(force => this._evaluateForce(force)),
            rightForces: RightForces.forceList.map(force => this._evaluateForce(force))
        }
    }

    _evaluateForce = (force) => {
        return {
            offset: evaluate(force.offset, Solution.answers),
            angle: evaluate(force.angle, Solution.answers),
            magnitude: evaluate(force.magnitude, Solution.answers)
        }
    }

    toggleSolution = () => {
        this.showSolution = !this.showSolution;
        this.update();
    }


}
