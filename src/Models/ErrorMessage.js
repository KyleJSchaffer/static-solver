//Stores the latest error message as a string
export const ErrorMessage = {

    message: '',

    set(message) {
        this.message = message;
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