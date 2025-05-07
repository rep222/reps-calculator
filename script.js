let firstOperand;
let secondOperand;
let firstOperator;
let secondOperator;

let displayText = 0;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a == 0 || b == 0){
        return "ERROR";
    }
    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    switch(operator) {
        case "addition":
            displayText = add(firstNumber, secondNumber);
            console.log(displayText);
            break;
        case "subtraction":
            displayText = subtract(firstNumber, secondNumber);
            console.log(displayText);
            break;
        case "multiplication":
            displayText = multiply(firstNumber, secondNumber);
            console.log(displayText);
            break;
        case "division":
            displayText = divide(firstNumber, secondNumber);
            console.log(displayText);
    }
}