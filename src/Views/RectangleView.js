//Renders the input to display and edit the dimensions of the rectangle
export class RectangleView {

    constructor(containerID) {
        this.container = $('#' + containerID);
    }

    render = (width, height) => {
        //Create inputs for the width and height
        const $width = $(`<input type='number' value=${width}></input>`);
        const $height = $(`<input type='number' value=${height}></input>`);
        //Append the inputs with labels to a div element 
        const $rectangleInputs = $('<div></div>').append(
            '<label>Width</label>',
            $width,
            '<label>Height</label>',
            $height
        )
        //Add the inputs to the DOM
        this.container.html($rectangleInputs);

        //Add on change event handlers from the controller to the inputs
        $width.change((e) => this.editRectangle(e.target.value, $height.val()));
        $height.change((e) => this.editRectangle($width.val(), e.target.value));
    }
}