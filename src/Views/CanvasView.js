import { evaluate } from 'mathjs';

//Draws the rectangle on the canvas along with the forces acting on it.
//If this is to be expanded further, it would be best to use a library to make the canvas manipulation easier to implement
export class CanvasView {

    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = canvas.getContext('2d')
        this.ctx.font = '12px Arial'
    }

    LINE_LENGTH_MULTIPLIER = 8;
    ARROW_LENGTH = 10;
    LABEL_PADDING = 10;

    draw = (forces, rectangle) => {
        //Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        rectangle.width = parseFloat(rectangle.width);
        rectangle.height = parseFloat(rectangle.height);

        // Set the origin so that a rectangle drawn starting at the origin will be centered on the canvas
        const origin = {
            x: canvas.width / 2 - rectangle.width / 2,
            y: canvas.height / 2 - rectangle.height / 2
        }

        //Draw the rectangle
        this.ctx.strokeRect(origin.x, origin.y, rectangle.width, rectangle.height);
        //this.ctx.stroke();

        //Counter used to space out the labels of the unknown offsets so they don't overlap
        let unknownOffsetCounter = 0;
        //Draw top side forces
        forces.topForces.forEach((force, index) => {
            //Try to evaluate the value of the offset,
            //if it cannot evaluated set it to a value proportional to the width and add a a variable label
            let canvasOffset;
            try {
                canvasOffset = evaluate(force.offset + '+0')
            } catch (error) {
                canvasOffset = (index + 1) / (forces.topForces.length + 1) * rectangle.width
                unknownOffsetCounter++
                const labelPosition = { x: origin.x, y: origin.y - unknownOffsetCounter * this.LABEL_PADDING }
                this._drawHorizontalLabel(force.offset, labelPosition, canvasOffset)
            }

            //Point where the force contacts the rectangle
            const contactPoint = { x: origin.x + canvasOffset, y: origin.y };

            //Try to evaluate the angle or determine if it is unknown
            const canvasAngle = this._getAngle(force.angle, contactPoint)

            this._drawLine(contactPoint, canvasAngle, force.magnitude);
        });

        ///Draw bottom side forces
        unknownOffsetCounter = 0;
        forces.bottomForces.forEach((force, index) => {
            //Try to evaluate the value of the offset,
            //if it cannot evaluated set it to a value proportional to the width and add a label for the unknown value
            let canvasOffset;
            try {
                canvasOffset = evaluate(force.offset + '+0')
            } catch (error) {
                //if it cannot evaluated set it to a value proportional to the width and add a label
                canvasOffset = (index + 1) / (forces.bottomForces.length + 1) * rectangle.width
                unknownOffsetCounter++;
                const labelPosition = { x: origin.x, y: origin.y + rectangle.height + unknownOffsetCounter * this.LABEL_PADDING }
                this._drawHorizontalLabel(force.offset, labelPosition, canvasOffset)
            }

            //Point where the force contacts the rectangle
            const contactPoint = { x: origin.x + canvasOffset, y: origin.y + rectangle.height };

            //Try to evaluate the angle or determine if it is unknown
            const canvasAngle = this._getAngle(force.angle, contactPoint)

            this._drawLine(contactPoint, canvasAngle, force.magnitude);
        });

        //Draw left side forces
        unknownOffsetCounter = 0;
        forces.leftForces.forEach((force, index) => {
            //Try to evaluate the value of the offset,
            //if it cannot evaluated set it to a value proportional to the width and add a label for the unknown value
            let canvasOffset;
            try {
                canvasOffset = evaluate(force.offset + '+0')
            } catch (error) {
                //if it cannot evaluated set it to a value proportional to the height
                canvasOffset = (index + 1) / (forces.leftForces.length + 1) * rectangle.height;
                //Draw label
                unknownOffsetCounter++;
                const labelXPos = origin.x - unknownOffsetCounter * this.LABEL_PADDING
                this._drawVerticleLabel(force.offset, { x: labelXPos, y: origin.y }, canvasOffset)
            }

            //Point where the force contacts the rectangle
            const contactPoint = { x: origin.x, y: origin.y + canvasOffset };

            //Try to evaluate the angle or determine if it is unknown
            const canvasAngle = this._getAngle(force.angle, contactPoint)

            this._drawLine(contactPoint, canvasAngle, force.magnitude)
        })

        //Draw right side forces
        unknownOffsetCounter = 0;
        forces.rightForces.forEach((force, index) => {

            //Try to evaluate the value of the offset,
            //if it cannot evaluated set it to a value proportional to the width and add a label for the unknown value
            let canvasOffset;
            try {
                canvasOffset = evaluate(force.offset + '+0')
            } catch (error) {
                //if it cannot evaluated set it to a value proportional to the height and add the variable label
                canvasOffset = (index + 1) / (forces.rightForces.length + 1) * rectangle.height;
                unknownOffsetCounter++;
                const labelXPos = origin.x + rectangle.width - unknownOffsetCounter * this.LABEL_PADDING
                this._drawVerticleLabel(force.offset, { x: labelXPos, y: origin.y }, canvasOffset)
            }
            //Find the point where the force contacts the object
            const contactPoint = { x: origin.x + rectangle.width, y: origin.y + canvasOffset };

            //Try to evaluate the angle or determine if it is unknown
            const canvasAngle = this._getAngle(force.angle, contactPoint)

            this._drawLine(contactPoint, canvasAngle, force.magnitude)
        })
    }

    _drawLine = (contactPoint, angle, magnitude) => {
        const forcePath = new Path2D();
        //Try to evaluate the magnitude, if it fails assign a standard length and flag it to add a label
        let lineLength;
        let labelNeeded = false;
        let positiveMagnitude = true;
        try {
            const evaluatedMag = evaluate(magnitude + '+0')
            positiveMagnitude = (evaluatedMag > 0)
            lineLength = this.LINE_LENGTH_MULTIPLIER * (1 + Math.abs(evaluatedMag))
        } catch (error) {
            positiveMagnitude = true;
            lineLength = this.LINE_LENGTH_MULTIPLIER * 5
            labelNeeded = true;
        }

        //Get the endpoint of the line
        const endpoint = {
            x: contactPoint.x + lineLength * Math.cos(parseFloat(angle)),
            y: contactPoint.y - lineLength * Math.sin(parseFloat(angle))
        }
        forcePath.moveTo(contactPoint.x, contactPoint.y);
        forcePath.lineTo(endpoint.x, endpoint.y);
        //Draw label if needed
        if (labelNeeded) {
            this.ctx.fillText(magnitude, endpoint.x, endpoint.y)
        }
        //Draw the arrow head depending on the sign of the magnitude. Positive points towards the object, negative away
        if (positiveMagnitude) {
            //Draw the arrow head at the contact point
            forcePath.moveTo(contactPoint.x, contactPoint.y);
            forcePath.lineTo(
                contactPoint.x + this.ARROW_LENGTH * Math.cos(parseFloat(angle + Math.PI / 8)),
                contactPoint.y - this.ARROW_LENGTH * Math.sin(parseFloat(angle + Math.PI / 8))
            )
            forcePath.moveTo(contactPoint.x, contactPoint.y);
            forcePath.lineTo(
                contactPoint.x + this.ARROW_LENGTH * Math.cos(parseFloat(angle - Math.PI / 8)),
                contactPoint.y - this.ARROW_LENGTH * Math.sin(parseFloat(angle - Math.PI / 8))
            )
        } else {
            //Draw arrow head at the line end point
            forcePath.moveTo(endpoint.x, endpoint.y);
            forcePath.lineTo(
                endpoint.x - this.ARROW_LENGTH * Math.cos(parseFloat(angle + Math.PI / 8)),
                endpoint.y + this.ARROW_LENGTH * Math.sin(parseFloat(angle + Math.PI / 8))
            )
            forcePath.moveTo(endpoint.x, endpoint.y);
            forcePath.lineTo(
                endpoint.x - this.ARROW_LENGTH * Math.cos(parseFloat(angle - Math.PI / 8)),
                endpoint.y + this.ARROW_LENGTH * Math.sin(parseFloat(angle - Math.PI / 8))
            )
        }
        this.ctx.stroke(forcePath)
    }

    _drawUnknownAngle = (unknownAngle, contactPoint) => {
        let placeholderAngle = Math.PI / 4
        //Draw a label text
        this.ctx.fillText(unknownAngle, contactPoint.x + 15, contactPoint.y - 5)
        //Draw an arc indicating the unknown angle
        this.ctx.beginPath();
        this.ctx.arc(contactPoint.x, contactPoint.y, 15, -1 * placeholderAngle, 0);
        this.ctx.stroke();

        return placeholderAngle;
    }

    _getAngle = (angle, contactPoint) => {
        //Try to evaluate the angle, if it cannot be evaluated set the angle to 45 degrees and add the variable label
        try {
            const evaluatedAngle = evaluate(angle + '+0')
            return evaluatedAngle
        } catch (error) {
            const placeholderAngle = Math.PI / 4
            //Draw a label text
            this.ctx.fillText(angle, contactPoint.x + 15, contactPoint.y - 5)
            //Draw an arc indicating the unknown angle
            this.ctx.beginPath();
            this.ctx.arc(contactPoint.x, contactPoint.y, 15, -1 * placeholderAngle, 0);
            this.ctx.stroke();

            return placeholderAngle;
        }
    }

    _drawVerticleLabel = (text, position, length) => {
        //Draw label text
        this.ctx.fillText(text, position.x, position.y + (length / 2) + 4)
        //Draw offset indicator lines with a gap for the label
        this.ctx.beginPath();
        this.ctx.moveTo(position.x, position.y);
        this.ctx.lineTo(position.x, position.y + ((length - this.LABEL_PADDING) / 2));
        this.ctx.moveTo(position.x, position.y + ((length + this.LABEL_PADDING) / 2));
        this.ctx.lineTo(position.x, position.y + length);
        this.ctx.stroke();
    }

    _drawHorizontalLabel = (text, position, length) => {
        //Draw label text
        this.ctx.fillText(text, position.x + (length / 2), position.y - 2)
        //Draw offset indicator lines with a gap for the label
        this.ctx.beginPath();
        this.ctx.moveTo(position.x, position.y);
        this.ctx.lineTo(position.x + ((length - this.LABEL_PADDING) / 2), position.y);
        this.ctx.moveTo(position.x + ((length + this.LABEL_PADDING) / 2), position.y);
        this.ctx.lineTo(position.x + length, position.y);
        this.ctx.stroke();
    }

    //Renders a button to toggle the solution 
    renderSolutionToggleButton = (displayButton, showSolution) => {
        const $toggleButton = $('<button></button>');
        if (showSolution) {
            $toggleButton.html('Show Original Problem')
        } else {
            $toggleButton.html('Show Solution')
        }
        $toggleButton.click(() => this.toggleSolution());
        $('#toggle-button-container').html($toggleButton);
        if (displayButton) {
            $('#toggle-button-container').show()
        } else {
            $('#toggle-button-container').hide()
        }
    }

}