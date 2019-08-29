import '../css/HelpInfo.css'

//Renders a button to display information about the application. This view does not use or edit any data from the model
//so there is no controller associated with it. 
export class HelpInfoView {

    constructor(containerID) {
        //Create two container elements and add them to the DOM
        this.$helpButtonContainer = $('<div></div>');
        this.$helpPopupContainer = $('<div></div>').attr('class', 'help-popup-container');
        $('#' + containerID).append(this.$helpButtonContainer, this.$helpPopupContainer)

        this.showHelpInfo = false;

        //Initial render
        this.render();
    }

    render = () => {
        //Create a help button elmeent and add it to the container. Button toggles the help popup when clicked
        const $helpButton = $('<button>Help</button>');
        $helpButton.click(() => this.$helpPopupContainer.toggle())
        this.$helpButtonContainer.html($helpButton);

        //Creates the popup that display information about the application
        this.$helpPopupContainer.append('<h2>Application Information</h2>')
        const $popupTextContainer = $('<div></div>').attr('class', 'popup-text-container')
        $popupTextContainer.append('<h3>Quick Guide</h3>');
        $popupTextContainer.append(
            `<p>
            This application does the following:
            </p>
            <ul>
                <li>Takes an input of forces and relations and then converts them into their x, y, and moment component equations</li>
                <li>Finds the unknown variables in each of the equations</li>
                <li>If the number of equations and unknowns are equal, it can attempt to solve the system</li>
                <li>At each step the forces are visually represented on the canvas</li>
            </ul>
            <p>
            To verify that the solution is correct, when the solved values of the variables are plugged into the equations the result should be approximately 0.<br/>
            For more information about the problem being solved or how the application works continue reading.
            </p>`
        )
        
        $popupTextContainer.append('<h3>The Problem</h3>');
        $popupTextContainer.append(
            `<p>
            The purpose of this application is to calculate the conditions where a system of forces will result in the object being in static equilibrium.
            These forces could be external forces, or reactions from a support structure holding the object in place.
            An object is said to be in static equilibrium when it is not experiencing any translational or rotational acceleration.
            To achieve this, the sum of all forces and the sum of all moments(or torques) must be equal to zero.
             </p> `
        );
        $popupTextContainer.append('<h3>Equations</h3>');
        $popupTextContainer.append(
            `<p>
            When the forces are acting in a two dimensional plane, there are 3 equations that must equal zero: <br />
            ΣFx - The sum of all forces in the x direction. <br />
            ΣFy - The sum of all forces in the y direction. <br />
            ΣFM - The sum of all moments. <br />
            Extra relations that are not represented by forces can also be added. <br />
            There are some cases where an equation will always be equal to zero and it cannot be used in the calculation.
            For example, if all forces are horizontal the sum of all y components will always be zero.
            To see if any equations are always zero, press the “Show Simplified Equations” button.
            </p> `
        );
        $popupTextContainer.append('<h3>Moments</h3>');
        $popupTextContainer.append(
            `<p>
            A moment is a force’s tendency to rotate an object about an axis.
            When the sum of all forces is zero, the sum of all moments will be the same regardless of what point you calculate it at.
            This application always calculates the sum of moments at the center of mass for simplicity’s sake.
            </p> `
        )
        $popupTextContainer.append('<h3>Equation Solver</h3>')
        $popupTextContainer.append(
            `<p>
            The application uses <a href="https://en.wikipedia.org/wiki/Newton%27s_method#Nonlinear_systems_of_equations" target="_blank">Newton’s Method for solving nonlinear systems</a>.
            It requires an equal number of equations and unknown variables to attempt to find a solution.
            Currently the algorithm returns the first solution it finds without regard for the context of the problem.
            There are often many (or infinite) possible solutions to these systems, so the algorithm may return a solution that mathematically solves the system but is trivial or does not make sense in the context of the problem.
            For example, it may set the magnitude of all forces to zero; move a force so that it is not applied to the object’s surface; or even return a complex number in some rare cases.
            Also, keep in mind that not every system of equations has a solution.
            </p> `
        )
        this.$helpPopupContainer.append($popupTextContainer);
        const $closeButton = $('<button>Close</button>').click(() => this.$helpPopupContainer.toggle())
        this.$helpPopupContainer.append($closeButton);
        this.$helpPopupContainer.hide();

    }
}