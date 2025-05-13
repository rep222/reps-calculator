let firstOperand;
let secondOperand;
let firstOperator;
let secondOperator;
let currentInput = '';
let sum;
let isOperatorClicked = false;
let displayText = document.querySelector(".display-text");

const decimalPoint = document.querySelector(".decimalPoint");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".operate");
const clear = document.querySelector(".clear-all");

function add(a, b) {
    sum = a + b;
    return a + b;
}

function subtract(a, b) {
    sum = a - b;
    return a - b;
}

function multiply(a, b) {
    sum = a * b;
    return a * b;
}

function divide(a, b) {
    if (b == 0){
        return "ERROR";
    }
    sum = a / b;
    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    console.log(firstNumber,secondNumber, operator);
    switch(operator) {
        case "+":
            sum = add(firstNumber, secondNumber);
            firstOperand = 0;
            secondOperand = 0;
            break;
        case "-":
            sum = subtract(firstNumber, secondNumber);
            firstOperand = 0;
            secondOperand = 0;
            break;
        case "*":
            sum = multiply(firstNumber, secondNumber);
            firstOperand = 0;
            secondOperand = 0;
            break;
        case "/":
            sum = divide(firstNumber, secondNumber);
            firstOperand = 0;
            secondOperand = 0;
            break;
        default:
            sum = "ERROR";
    }
    let decimalValue = sum.toString().indexOf(".");
    let result = sum.toString().substring(decimalValue+1);
    if (result.length > 5){
        sum = parseFloat(sum.toFixed(5));
    }
    firstOperand = sum;
    currentInput = '';
}
function appendOrReplaceOperator(op) {
    const lastChar = displayText.innerText.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        displayText.innerText = displayText.innerText.slice(0, -1) + op;
    } else {
        displayText.innerText += op;
    }
}
decimalPoint.addEventListener('click', event => {
    if (currentInput.includes(".")){
        return;
    } else {
        currentInput += event.target.id;
        displayText.innerText = currentInput;
    }
})
numbers.forEach( number => {
    number.addEventListener('click', num => {
        currentInput += num.target.id;
        displayText.innerText = currentInput;
    })
})
operators.forEach( operator => {
    operator.addEventListener('click', event => {
        if (displayText.innerText){
            if (!isOperatorClicked){
                isOperatorClicked = true;
                firstOperator = event.target.innerText;
                if (firstOperand){
                    secondOperand = parseFloat(currentInput);
                } else {
                    firstOperand = parseFloat(currentInput);
                }
                if (!isNaN(firstOperand) && !isNaN(secondOperand) && firstOperator) {
                    operate(firstOperator, firstOperand, secondOperand);
                    displayText.innerText = sum;
                }
                currentInput = '';
                appendOrReplaceOperator(firstOperator);
            } else if (isOperatorClicked && currentInput){
                secondOperand = parseFloat(currentInput); 
                if (!isNaN(firstOperand) && !isNaN(secondOperand) && firstOperator) {
                    operate(firstOperator, firstOperand, secondOperand);
                    displayText.innerText = sum;
                    firstOperator = event.target.innerText;
                    appendOrReplaceOperator(firstOperator);
                }
    

            } else if (isOperatorClicked){
                firstOperator = event.target.innerText;
                appendOrReplaceOperator(firstOperator);
            }
        } else console.log("No Input");
    })
})

equals.addEventListener('click', () => {
    if(isOperatorClicked){
        secondOperand = parseFloat(currentInput);
    }
    if (!isNaN(firstOperand) && !isNaN(secondOperand) && firstOperator){
        operate(firstOperator, firstOperand, secondOperand);
        displayText.innerText = sum;
        firstOperator = '';
        isOperatorClicked = false;
    }
    }
)