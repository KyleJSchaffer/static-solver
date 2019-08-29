import { ErrorMessage } from '../Models'

//Passes the string from the error message model to the error message view
export class ErrorMessageController {
    constructor(view) {
        this.view = view

        //Subscribe to models so that update is called when they are changed
        ErrorMessage.subscribe(this.update);

        //Initial render
        this.update()
    }

    update = () => {
        this.view.render(ErrorMessage.message);
    }
}