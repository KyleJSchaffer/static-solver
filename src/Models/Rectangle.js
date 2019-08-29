const initialHeight = 150;
const initialWidth = 150;

//Stores the width and height of the rectangle
export const Rectangle = {
    height: initialHeight,
    width: initialWidth,

    set(width, height) {
        this.width = width;
        this.height = height;
        this.notify();
    },

    reset() {
        this.width = initialWidth;
        this.height = initialHeight;
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
