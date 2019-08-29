//Stores the x component, y component, moment component, and list of unknown variables
export const Equations = {
    fxEquation: '',
    fyEquation: '',
    mEquation: '',
    unknownVariables: [],

    setFxEquation(equation) {
        this.fxEquation = equation;
    },

    setFyEquation(equation) {
        this.fyEquation = equation;
    },

    setMEquation(equation) {
        this.mEquation = equation;
    },

    setUnknownVariable(variables) {
        this.unknownVariables = variables
    },

    //The controllers subscribe to the model by providing a function, and the function is called when the model is changed.
    //For this model only, the notify function is called by the contoller after it is finished updating the model for performance reasons
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