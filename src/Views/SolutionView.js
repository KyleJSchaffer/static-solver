//Renders the solve button, a message informing whether a solution is possible, and the solution if the system was solved
export class SolutionView {

    constructor(containerID) {
        //Create three container elements and add them to the DOM
        this.equationsContainer = $('<div></div>');
        this.solveButtonContainer = $('<div></div>');
        this.answerContainer = $('<div></div>');
        $('#' + containerID).append(this.equationsContainer, this.answerContainer, this.solveButtonContainer);
    }

    renderSolveButton(solutionPossible, message, solved) {
        //Create the solve button and add it to the container
        const $solveButton = $('<button>Solve</button>');
        $solveButton.click(() => this.solve());
        this.solveButtonContainer.html($solveButton);

        //Hide the solve button if an attempt to solve the system was made
        if(solved){
            this.solveButtonContainer.hide();
        }else{
            this.solveButtonContainer.show();
        }

        //Check if a solution is possible and display message if it is not
        if (solutionPossible) {
            $solveButton.attr('disabled', false)
        } else {
            const $message = $(`<p>${message}</p>`)
            this.solveButtonContainer.append($message)
            $solveButton.attr('disabled', true)
        }
    }

    renderAnswer(answers, message) {
        //Displays the answers if the system was successfully solved or a message from the controller if it was not
        if (answers) {
            const $answers = $('<ul></ul>');
            Object.keys(answers).forEach(variable => {
                $answers.append(`<li>${variable}: ${answers[variable].toFixed(6)}</li>`)
            })
            this.answerContainer.html($answers)
        } else if (message) {
            const $message = $(`<p>${message}</p>`);
            this.answerContainer.html($message)
        } else {
            this.answerContainer.html('');
        }
    }
}