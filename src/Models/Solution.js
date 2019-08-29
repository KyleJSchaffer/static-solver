//Stores the solution to the system of equations
export const Solution = {
    answers: null,

    set(answers) {
        this.answers = answers;
        this.notify()
    },

    clear() {
        this.answers = null;
        this.notify()
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