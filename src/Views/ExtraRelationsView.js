//Renders input for new relations and displays existing relations
export class ExtraRelationsView {

    constructor(containerID) {
        //Create container two container elements and add them to the DOM
        this.newRelationContainer = $('<div></div>');
        this.relationListContainer = $('<div></div>');
        $('#' + containerID).append(this.newRelationContainer, this.relationListContainer);
    }

    render(relations){
        this.renderNewRelationInput();
        this.renderRelationList(relations)
    }

    renderNewRelationInput() {
        //Create inputs for new relation and the button to add them. Then adds them to the container element
        const $leftExpression = $('<input></input>');
        const $rightExpression = $('<input></input>');
        const $addButton = $('<button>Add</button>')
        const $newRelationForm = $('<div></div>').append(
            $leftExpression,
            ' = ',
            $rightExpression,
            $addButton
        );
        this.newRelationContainer.html($newRelationForm);

        //Attach event handler from the controller to the add button
        $addButton.click(() => this.addRelation($leftExpression.val(), $rightExpression.val()));
    }

    renderRelationList(relations) {
        //Create inputs for each relation and the button to delete them
        const $relationList = $('<ul></ul>');
        relations.forEach((relation, index) => {
            const $leftExpression = $(`<input value=${relation.leftExpression}></input>`);
            const $rightExpression = $(`<input value=${relation.rightExpression}></input>`);
            const $deleteButton = $('<button>Delete</button>')
            const $relationEntry = $('<li></li>').append(
                $leftExpression,
                ' = ',
                $rightExpression,
                $deleteButton
            )
            $relationList.append($relationEntry)

            //Add event handlers from the controller
            $leftExpression.change(() => this.editRelation(index, $leftExpression.val(), $rightExpression.val()))
            $rightExpression.change(() => this.editRelation(index, $leftExpression.val(), $rightExpression.val()))
            $deleteButton.click(() => this.deleteRelation(index))
        })
        //Add the relation list to the container element
        this.relationListContainer.html($relationList)
    }
}