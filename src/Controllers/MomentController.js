import { Moment, ErrorMessage } from '../Models';
import { compile } from 'mathjs';

//Controller that updates the moment model and passes data from the model to the moment view
export class MomentController {

    constructor(view) {
        this.view = view;

        //Pass event handlers to the view
        this.view.editMoment = this.editMoment

        //Subscribe to models so that update is called when they are changed
        Moment.subscribe(this.update)

        //Initial render
        this.update();
    }

    //Pass data from the model to the view to be rendered
    update = () => {
        this.view.render(Moment.value)
    }

    //Edit the moment if the input is a valid expression
    editMoment = (moment) => {
        if (this._validateInput(moment)) {
            Moment.set(moment);
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