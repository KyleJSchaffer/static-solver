export class EquationsView {

    //Displays the x component equation, y component equation, moment equation, unknown variables, and any extra relations
    constructor(containerID) {
        //Creates the containers for the equation list and simplify button and adds them to the DOM
        this.$equationListContainer = $('<div></div>');
        this.$simplifyButtonContainer = $('<div></div>');
        $('#' + containerID).append(this.$equationListContainer, this.$simplifyButtonContainer);
    }

    render = (fx, fy, moments, extraRelations, variables, simplifyEquations) => {
        this.renderEquations(fx, fy, moments, extraRelations, variables);
        this.renderSimplifyButton(simplifyEquations);
    }

    renderEquations = (fx, fy, moments, extraRelations, variables) => {
        //Create elements for x component, y component, and moment equation
        const $fxComponentStr = `<p>ΣFx = ${fx}</p>`;
        const $fyComponentStr = `<p>ΣFy = ${fy}</p>`;
        const $mComponentStr = `<p>ΣM = ${moments}</p>`;

        //Create element for unknown variables
        let $varStr = `<p>Unknown Variables:  `;
        variables.forEach((variable) => {
            $varStr += variable + ', ';
        })
        //Remove trailing comma and add the closing tag
        $varStr = $varStr.slice(0, $varStr.length - 2);
        $varStr += '</p>';

        //Create element for the extra relations
        let $relationList = $('<div></div>');
        extraRelations.forEach(relation => {
            $relationList.append(`<p>${relation.leftExpression} = ${relation.rightExpression}`)
        })

        //Add each of the equation elements to the container
        const $equations = $('<div></div>').append(
            $fxComponentStr,
            $fyComponentStr,
            $mComponentStr,
            $relationList,
            $varStr
        );
        this.$equationListContainer.html($equations);
    }

    //Renders a button that toggles whether equations should be simplified
    renderSimplifyButton = (simplifyEquations) => {
        const $simplifyButton = $('<button></button>');
        if (simplifyEquations) {
            $simplifyButton.html('Show Unsimplified Equations')
        } else {
            $simplifyButton.html('Show Simplified Equations')
        }
        this.$simplifyButtonContainer.html($simplifyButton);

        $simplifyButton.click(() => this.toggleSimplify())
    }
}
