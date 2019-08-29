import { compile } from 'mathjs';
import { ErrorMessage } from '../Models';

//Controller that updates a force model and passes the data from a force model to a force view 
export class ForceController {

    //The force models are separated into different list, the force controller requires a force model in its contructor
    //to determine which model it is reading from and updating
    constructor(forceView, forces) {
        this.forces = forces;
        this.forceView = forceView;

        //Set the event handler functions for the view
        this.forceView.addForce = this.addForce;
        this.forceView.deleteForce = this.deleteForce;
        this.forceView.editForce = this.editForce;

        //Subscribe to models so that update is called when they are changed
        this.forces.subscribe(this.update)

        //Initial render
        this.forceView.render(this.forces.forceList)
    }

    //Pass the data from the force model to the force view
    update = () => {
        this.forceView.render(this.forces.forceList);
    }

    //Check if the input is valid before adding a force to the model
    addForce = (offset, angle, magnitude) => {
        if (this._validateInput(offset) && this._validateInput(angle) && this._validateInput(magnitude)) {
            this.forces.addForce(offset, angle, magnitude)
        }
    }

    //Remove a force from the model
    deleteForce = (index) => {
        this.forces.deleteForce(index);
    }

    //Check if a force is valid before editing the model
    editForce = (index, property, value) => {
        if (this._validateInput(value)) {
            this.forces.editForce(index, property, value)
        }
    }

    //Returns true if the expression is valid, otherwise returns false and updates the error message model
    _validateInput(expression) {
        //Validates an expression by checking if it is null and then trying to compile it
        if (!expression) {
            return false;
        }
        try {
            compile(expression);
            ErrorMessage.set('')
            return true;
        } catch (error) {
            ErrorMessage.set(expression + ' is not a valid input');
            return false;
        }
    }
}