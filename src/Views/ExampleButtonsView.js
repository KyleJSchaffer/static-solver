
export class ExampleButtonsView {

    constructor(containerID) {
        //Add container element to the DOM
        this.container = $('#' + containerID);
    }

    render() {
        //Create buttons for each example and add them to the DOM
        const $clearButton = $('<button>Clear All</button>')
        const $exampleButton1 = $('<button>Example 1</button>')
        const $exampleButton2 = $('<button>Example 2</button>')
        const $exampleButton3 = $('<button>Example 3</button>')
        const $buttonGroup = $('<div></div>').append(
            $clearButton,
            $exampleButton1,
            $exampleButton2,
            $exampleButton3
        )
        this.container.html($buttonGroup)

        //Add event handlers from the controller
        $clearButton.click(() => this.clear());
        $exampleButton1.click(() => this.setExample1());
        $exampleButton2.click(() => this.setExample2());
        $exampleButton3.click(() => this.setExample3());
    }
}