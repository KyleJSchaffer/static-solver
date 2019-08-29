//Stores the extra relations as an array of objects containing the left expression and right expression
export const ExtraRelations = {

    relations: [],
    addRelation(leftExpression, rightExpression) {
        this.relations.push(
            {
                leftExpression: leftExpression,
                rightExpression: rightExpression
            }
        )
        this.notify();
    },

    deleteRelation(index) {
        this.relations.splice(index, 1);
        this.notify();
    },

    editRelation(index, leftExpression, rightExpression) {
        this.relations[index] = {
            leftExpression: leftExpression,
            rightExpression: rightExpression
        };
        this.notify();
    },

    clearRelations() {
        this.relations = [];
        this.notify();
    },

    //The controllers subscribe to the model by providing a function, and the function is called when the model is changed.
    subscribers: [],

    subscribe(func) {
        this.subscribers.push(func);
    },

    notify() {
        this.subscribers.forEach(func => {
            func();
        })
    }
}