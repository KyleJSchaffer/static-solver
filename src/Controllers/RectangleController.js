import { Rectangle, ErrorMessage } from '../Models';

//Controller that updates the rectangle model and passes data from the model to the rectangle view
export class RectangleController {

    constructor(view) {
        this.view = view;
        //Pass event handlers to the view
        this.view.editRectangle = this.editRectangle

        //Subscribe to models so that update is called when they are changed
        Rectangle.subscribe(this.update)

        //Initial render
        this.update();
    }

    //Pass data from the model to the view to be rendered
    update = () => {
        this.view.render(Rectangle.width, Rectangle.height);
    }

    //Checks if input is valid before updating the model
    editRectangle = (width, height) => {
        if (this._validateInput(width) && this._validateInput(height)) {
            Rectangle.set(width, height)
        }
    }

     //Returns true if the input is valid, otherwise returns false and updates the error message model
    _validateInput = (value) => {        
        if (value <= 0) {
            ErrorMessage.set('Rectangle dimensions must be greater than 0')
            return false
        } else {
            ErrorMessage.set('')
            return true
        }
    }
}