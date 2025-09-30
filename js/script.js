window.onload = start; // Don't change this! This runs the "start" function when you hit Execute.

// set the overall size of the canvas
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 500;

// set the number of rows and columns in our "grid" layout
const NUM_ROWS = 8;
const NUM_COLS = 4;

// calculate row and column heights - don't change this!
const ROW_HEIGHT = Math.floor(CANVAS_HEIGHT / NUM_ROWS);
const COL_WIDTH = Math.floor(CANVAS_WIDTH / NUM_COLS);

// global variables - don't change these!
let mainDisplay;
let storedNumber = 0;
let selectedOperationFunc;
let selectedOperationLabel = "";

// This function will be called automatically when the page loads (or you click 'Execute' in JDoodle)
function start(){
    resizeCanvas(); // Don't remove this! It resizes the box to match CANVAS_WIDTH and CANVAS_HEIGHT.
    
    mainDisplay = createNumberDisplay(0, 0, CANVAS_WIDTH, ROW_HEIGHT, 50);
    updateNumberDisplay(mainDisplay, ""); // start display blank

    createDigitButton(1, 0, "1");
    createDigitButton(1, 1, "2");
    createDigitButton(1, 2, "3");
    // TO DO: add the rest of the digits 0-9
    
    // create the math operation buttons:
    
    // first, define what it means to do addition:
    function doAddition(number1, number2){
        return number1 + number2;
    }
    // then create the button which triggers this action:
    createOperationButton(1, 3, "+", doAddition);

    // TO DO: add subtraction, multiplication, division buttons
    // add them here:


    // This is the "equals" button - don't change this!
    // Define what it means to do a calculation:
    function calculate(){
        // get the currently displayed number, store it in `n`:
        let n = getDisplayContentsAsNumber(mainDisplay);
        // then do the currently selected operation, which is the function stored in `selectedOperationFunc`
        let result = selectedOperationFunc(storedNumber, n);
        // then write the result to the display:
        updateNumberDisplay(mainDisplay, result);
    }
    // create the equals button. It will trigger the `calculate` function we just defined: 
    createOtherButton(3, 3, "=", "green", 24, calculate);
    
}

// Below are some functions to make creating the buttons quicker. All of these are abstractions from createButton().

// This function "assumes" some details which are common to all the digit buttons, like:
//      - color
//      - button size and label size
//      - the kind of action they perform: the only difference is the actual digit, which we will provide as the `label` parameter.
function createDigitButton(row, col, label){
    // define the action that should happen when the digit buttons are clicked:
    function digitButtonAction(){
         // concatenate (put together) this digit with what's already on the display
        let newNumber = getDisplayContentsAsString(mainDisplay) + label;
        updateNumberDisplay(mainDisplay, newNumber);
    }
    createButton(getColumn(col), getRow(row), COL_WIDTH, ROW_HEIGHT, label, "gray", 36, digitButtonAction);
}

// This function "assumes" some details common to all operation buttons (+, - , *, /):
//      - color
//      - button size and label size
//      - the kind of action that they perform: they all have some functionality in common, which we are defining in
//          the `selectMathOperation()` function. The difference is the actual math operation, which is provided as a parameter: `actionFunc`.
function createOperationButton(row, col, label, actionFunc){
    // define the action that the operation buttons should trigger:
    function selectMathOperation(){
        selectedOperationFunc = actionFunc; // store the action function which was passed as a parameter to this function.
        selectedOperationLabel = label; // store the label too, this helps us show it on the display (and not confuse it for a number later)
        storedNumber = getDisplayContentsAsNumber(mainDisplay); // store the current display contents (that is, the first number)
        updateNumberDisplay(mainDisplay, label); // show the operation on the display
    }
    createButton(getColumn(col), getRow(row), COL_WIDTH, ROW_HEIGHT, label, "red", 18, selectMathOperation);
}

// for any other button we might need, here's a shortcut which assumes that we are placing it in the grid
function createOtherButton(row, col, label, color, fontSize, actionFunc){
    createButton(getColumn(col), getRow(row), COL_WIDTH, ROW_HEIGHT, label, color, fontSize, actionFunc);
}

// ************ Take a look, but don't change anything below here!! ***************

function createButton(x, y, width, height, label, color, fontSize, action){
    // don't worry about the internals of this function. Just notice the parameters above ^^^
    const cnvs = document.getElementById("inner-ctr");
    const btn = document.createElement("button");
    btn.setAttribute("style", `font-size: ${fontSize}; position: absolute; left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px; background-color: ${color};`);
    btn.innerText = label;
    btn.onclick = action;
    cnvs.appendChild(btn);
}

function getRow(rowNumber){
    return ROW_HEIGHT * rowNumber;
}

function getColumn(columnNumber){
    return COL_WIDTH * columnNumber;
}

function getDisplayContentsAsNumber(whichDisplay){
    // slightly tricky business here, but we are just converting the string on the display to a number,
    // and removing the operation label 
    if(whichDisplay.innerText === "") return 0;
    if(whichDisplay.innerText === selectedOperationLabel) return 0;
    return Number.parseInt((whichDisplay.innerText + "").replace(selectedOperationLabel, ""));
}

function getDisplayContentsAsString(whichDisplay){
    return whichDisplay.innerText;
}

function updateNumberDisplay(displayToUpdate, valueToDisplay){
    displayToUpdate.innerText = valueToDisplay;
}

function createNumberDisplay(x, y, width, height, fontSize){
    const cnvs = document.getElementById("inner-ctr");
    const disp = document.createElement("div");
    disp.setAttribute("class", "number-display");
    disp.setAttribute("style", `font-size: ${fontSize}px; left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px;`);
    cnvs.appendChild(disp);
    return disp;
}
// resize canvas to match the constants defined at the top
function resizeCanvas(){
    const cnvs = document.getElementById("inner-ctr");
    cnvs.setAttribute("style", `width: ${CANVAS_WIDTH}; height: ${CANVAS_HEIGHT};`);
}