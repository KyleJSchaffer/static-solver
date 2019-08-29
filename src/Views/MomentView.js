//Renders the input to display and edit the moment
export class MomentView {

    constructor(containerID) {
        this.container = $('#' + containerID);
    }

    render = (moment) => {
        //Create the input element for the moment and add it to the DOM
        const $moment = $(`<input value=${moment}></input>`);
        $(this.container).html($moment);

        //Attach the on change event handler from the controller
        $moment.change(() => this.editMoment($moment.val()))
    }
}