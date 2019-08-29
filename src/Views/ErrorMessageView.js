//Renders the last error message received
export class ErrorMessageView {

    constructor(containerID) {
        //Add container element to the DOM
        this.container = $('#' + containerID);
    }

    render = (error) => {
        //Create error message element and add it to the container element
        const $errorMessage = $(`<p>${error}</p>`);
        this.container.html($errorMessage);
    }

}