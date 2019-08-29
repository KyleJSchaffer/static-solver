import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import './css/index.css'
import { ForceView, RectangleView, CanvasView, MomentView, ExtraRelationsView, SolutionView, ErrorMessageView } from './Views';
import { ForceController, RectangleController, CanvasController, MomentController, ExtraRelationsController, SolutionController, ErrorMessageController } from './Controllers';
import { TopForces, BottomForces, LeftForces, RightForces } from './Models';
import { ExampleButtonsView } from "./Views/ExampleButtonsView";
import { ExampleButtonsController } from "./Controllers/ExampleButtonsController";
import { EquationsView } from "./Views/EquationsView";
import { EquationsController } from "./Controllers/EquationsController";
import { HelpInfoView } from "./Views/HelpInfoView";

//Initialize each force view and controller
const topForceView = new ForceView('top-force-container');
const topForceController = new ForceController(topForceView, TopForces);
const bottomForceView = new ForceView('bottom-force-container');
const bottomForceController = new ForceController(bottomForceView, BottomForces);
const leftForceView = new ForceView('left-force-container');
const leftForceController = new ForceController(leftForceView, LeftForces);
const rightForceView = new ForceView('right-force-container');
const rightForceController = new ForceController(rightForceView, RightForces);

//Initialize the moment and extra relations view and conrollers
const momentView = new MomentView('moment-input-container');
const momentController = new MomentController(momentView);
const extraRelationsView = new ExtraRelationsView('extra-relations-container');
const extraRelationsController = new ExtraRelationsController(extraRelationsView);

//Initialize the equation and solution view and controllers
const equationView = new EquationsView('equations-container');
const equationConroller = new EquationsController(equationView);
const solutionView = new SolutionView('solution-container');
const solutionController = new SolutionController(solutionView);

//Initialize the rectangle and canvas view and controllers
const rectangleView = new RectangleView('rectangle-input-container');
const rectangleController = new RectangleController(rectangleView);
const canvasView = new CanvasView('canvas');
const canvasController = new CanvasController(canvasView);

//Initialize the help info, error message, and example buttons views and controllers
const helpInfoView = new HelpInfoView('help-info-container')
const errorMessageView = new ErrorMessageView('error-message-container');
const errorMessageController = new ErrorMessageController(errorMessageView);
const exampleButtonView = new ExampleButtonsView('example-buttons-container')
const exampleButtonsController = new ExampleButtonsController(exampleButtonView);












