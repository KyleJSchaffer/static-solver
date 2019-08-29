//Stores the value of the moment
export const Moment = {
    value: 0,

    set(moment) {
        this.value = moment;
        this.notify();
    },

    clear() {
        this.value = 0;
        this.notify();
    },

    //The controllers subscribe to the model by providing a function, and the function is called when the model is changed.
    subscribers: [],

    subscribe(func) {
        this.subscribers.push(func);
    },

    notify(...args) {
        this.subscribers.forEach(func => {
            func(...args);
        })
    }

};