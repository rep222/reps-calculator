let firstOperand = null;
let secondOperand = null;
let firstOperator;
let currentInput = '';
let sum = null;
let isOperatorClicked = false;
let displayText = document.querySelector(".display-text");

const decimalPoint = document.querySelector(".decimalPoint");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".operate");
const clear = document.querySelector(".clear-all");
const valueBtn = document.querySelector(".value"); 

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
    if (b == 0){
        displayText.innerText = "ERROR";
        return;
    }
    return a / b;
}
function modulo(a, b) {
    a = Math.floor(a);
    b = Math.floor(b);
    if (b === 0){
        displayText.innerText = "ERROR";
        return;
    }
    return a % b;
}
function clearAll(){
    firstOperand = null;
    secondOperand = null;
    firstOperator = '';
    isOperatorClicked = false;
    currentInput = '';
    sum = 0;
    displayText.innerText = '';
}


function operate(operator, firstNumber, secondNumber) {
    console.log(firstNumber,secondNumber, operator);
    switch(operator) {
        case "+":
            sum = add(firstNumber, secondNumber);
            secondOperand = 0;
            break;
        case "-":
            sum = subtract(firstNumber, secondNumber);
            secondOperand = 0;
            break;
        case "*":
            sum = multiply(firstNumber, secondNumber);
            secondOperand = 0;
            break;
        case "/":
            sum = divide(firstNumber, secondNumber);
            secondOperand = 0;
            break;
        case "%":
            sum = modulo(firstNumber, secondNumber);
            secondOperand = 0;
            break;
        default:
            displayText.innerText = "ERROR";
    }
    if (sum.toString().includes('.')) {
        let [_, decimal] = sum.toString().split(".");
        if (decimal.length > 5) {
            sum = parseFloat(sum.toFixed(5));
        }
    }
    firstOperand = sum;
    currentInput = '';
}
function appendOrReplaceOperator(op) {
    const lastChar = displayText.innerText.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
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
        console.log(currentInput);
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

clear.addEventListener('click', () => {
    clearAll();
});

valueBtn.addEventListener('click', () =>{
    if (displayText.innerText != ''){
        if(currentInput.startsWith('-')){
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        displayText.innerText = currentInput;
    }
})