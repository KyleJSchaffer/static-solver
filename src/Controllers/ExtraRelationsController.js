import { ExtraRelations, ErrorMessage, Equations } from '../Models';
import { compile } from 'mathjs';

//Controller that updates the extra relations model and passes the data from the model to the view
export class ExtraRelationsController {

    constructor(view) {
        this.view = view

        //Pass event handlers to the view
        this.view.addRelation = this.addRelation
        this.view.editRelation = this.editRelation;
        this.view.deleteRelation = this.deleteRelation;

        //Subscribe to models so that update is called when they are changed
        ExtraRelations.subscribe(this.update)

        //Initial render
        this.update();
    }

    //Pass the data from the model to the view to be rendered
    update = () => {
        this.view.render(ExtraRelations.relations)
    }

    //Checks if the relation is valid before adding it to the model
    addRelation = (leftExpression, rightExpression) => {
        if (this._validateInput(leftExpression) && this._validateInput(rightExpression)) {
            ExtraRelations.addRelation(leftExpression, rightExpression)
        }
    }

    //Checks if the relation is valid before editing the model
    editRelation = (index, leftExpression, rightExpression) => {
        if (this._validateInput(leftExpression) && this._validateInput(rightExpression)) {
            ExtraRelations.editRelation(index, leftExpression, rightExpression);
        }
    }

    //Remove a relation from the model
    deleteRelation = (index) => {
        ExtraRelations.deleteRelation(index)
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