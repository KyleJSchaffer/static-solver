import '../css/ForceView.css'

//Renders an input for new forces and displays existing forces
export class ForceView {

    constructor(containerID) {
        //Create two container elements, and add them to the DOM
        this.newForceContainer = $('<div></div>');
        this.forceListContainer = $('<div></div>');
        $('#' + containerID).append(this.newForceContainer, this.forceListContainer);
    }

    render(forces) {
        this._renderNewForceInput();
        this._renderForceList(forces)
    }

    _renderNewForceInput() {
        //Create elements for each input
        const $offset = $('<input></input>');
        const $angle = $('<input></input>');
        const $magnitude = $('<input></input>');
        const $addButton = $('<button>Add Force</button>')

        //Append inputs to a div element with labels and insert them into the container element
        const $forceInputForm = $('<div></div>').append(
            '<label>Offset</label>', $offset,
            '<label>Angle</label>', $angle,
            '<label>Magnitude</label>', $magnitude,
            $addButton
        );
        $(this.newForceContainer).html($forceInputForm);

        //Add an event handle from the controller to the add button
        $addButton.click(() => this.addForce($offset.val(), $angle.val(), $magnitude.val()));
    }

    _renderForceList(forces) {
        //Iterate through each force passed from the controller and add an entry to the force list 
        const $forceList = $('<ul></ul>')
        forces.forEach((force, index) => {
            //Create elements for each input
            const $offset = $(`<input value=${force.offset}></input>`);
            const $angle = $(`<input value=${force.angle}></input>`);
            const $magnitude = $(`<input value=${force.magnitude}></input>`);
            const $deleteButton = $(`<button>Delete</button>`);

            //Append inputs to a li element with labels and then add the li element to the forceList
            const $forceListEntry = $('<li></li>').append(
                '<label>Offset:</label>', $offset,
                '<label>Angle:</label>', $angle,
                '<label>Magnitude:</label>',
                $magnitude, $deleteButton);
            $forceList.append($forceListEntry)

            //Add on change event handlers from the controller to each input
            $offset.change((e) => this.editForce(index, 'offset', e.target.value))
            $angle.change((e) => this.editForce(index, 'angle', e.target.value))
            $magnitude.change((e) => this.editForce(index, 'magnitude', e.target.value))

            //Add event handler from the controller to the delete button
            $deleteButton.click(() => this.deleteForce(index))
        })
        //Insert the force list into the DOM
        $(this.forceListContainer).html($forceList)
    }
}