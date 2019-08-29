import { evaluate } from 'mathjs';

//Each force model contains an array of Force objects defined here
class Force {
    constructor(offset, angle, magnitude) {
        this.offset = offset;
        this.angle = angle;
        this.magnitude = magnitude;
    }

    //Checks if the x component of the force is zero before returning the value
    get xComponent() {
        try {
            const evaluatedAngle = evaluate(`cos(${this.angle})`)
            if (Math.abs(evaluatedAngle) < .00001) {
                return '0';
            }
        } catch {
        }
        return `(${this.magnitude}) * cos(${this.angle})`;
    }

     //Checks if the y component of the force is zero before returning the value
    get yComponent() {
        try {
            const evaluatedAngle = evaluate(`sin(${this.angle})`)
            if (Math.abs(evaluatedAngle) < .00001) {
                return '0';
            }
        } catch {
        }
        return `(${this.magnitude}) * sin(${this.angle})`;
    }
}

//Stores an array of Force objects
class ForceModel {
    forceList = [];
    addForce(offset, angle, magnitude) {
        this.forceList.push(new Force(offset, angle, magnitude))
        this.notify();
    }
    deleteForce(index) {
        this.forceList.splice(index, 1);
        this.notify();
    }
    editForce(index, property, value) {
        this.forceList[index][property] = value;
        this.notify();
    }

    clearForces() {
        this.forceList = [];
        this.notify();
    }

    //The controllers subscribe to the model by providing a function, and the function is called when the model is changed.
    subscribers = [];

    subscribe(func) {
        this.subscribers.push(func);
    }

    notify(...args) {
        this.subscribers.forEach(func => {
            func(...args);
        })
    }
}

//Exports a force model for each category of forces
export const TopForces = new ForceModel();
export const BottomForces = new ForceModel();
export const LeftForces = new ForceModel();
export const RightForces = new ForceModel();