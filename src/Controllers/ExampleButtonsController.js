
import { TopForces, BottomForces, LeftForces, RightForces, Moment, ExtraRelations, Rectangle } from '../Models';

//Controller that contains the equations to update the model with preset examples
export class ExampleButtonsController {

    constructor(view) {
        this.view = view

        //Pass event handlers to the view
        this.view.clear = this.clear;
        this.view.setExample1 = this.setExample1;
        this.view.setExample2 = this.setExample2;
        this.view.setExample3 = this.setExample3;

        //Initial render
        this.view.render()
    }

    clear = () => {
        Rectangle.reset();
        TopForces.clearForces();
        BottomForces.clearForces();
        LeftForces.clearForces();
        RightForces.clearForces();
        ExtraRelations.clearRelations();
        Moment.clear();
    }

    setExample1 = () => {
        this.clear();
        Rectangle.set(200, 20)
        TopForces.addForce(100, 'pi/2', 3);
        BottomForces.addForce(50, '3*pi/2', 'y');
        BottomForces.addForce(150, '3*pi/2', 'y');
    }

    setExample2 = () => {
        this.clear();
        Rectangle.set(150, 80)
        LeftForces.addForce(25, 'pi', 'Rx');
        LeftForces.addForce(25, '3*pi/2', 'Ry');
        TopForces.addForce(120, '.75', '-6');
        RightForces.addForce(60, 0, 2)
        Moment.set('RM')
    }

    setExample3 = () => {
        this.clear();
        
        Rectangle.set(150,200)
        TopForces.addForce(12, 2, 'F3');
        BottomForces.addForce(25, 4, 5);
        RightForces.addForce('x', 'θ', 'F1');
        RightForces.addForce('y', 'θ', 'F2');
        ExtraRelations.addRelation('F1', '.5*F2-1');
        ExtraRelations.addRelation('F3', 'F2+1');
        ExtraRelations.addRelation('y', '2x-5');       
       
    }
}