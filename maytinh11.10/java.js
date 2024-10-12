// script.js

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    memory: 0,
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.dataset.number) {
        inputDigit(target.dataset.number);
        updateDisplay();
        return;
    }

    if (target.dataset.operator) {
        handleOperator(target.dataset.operator);
        updateDisplay();
        return;
    }

    switch(target.id) {
        case 'decimal':
            inputDecimal();
            updateDisplay();
            break;
        case 'all-clear':
            resetCalculator();
            updateDisplay();
            break;
        case 'toggle-sign':
            toggleSign();
            updateDisplay();
            break;
        case 'equals':
            handleEquals();
            updateDisplay();
            break;
        case 'square':
            squareNumber();
            updateDisplay();
            break;
        case 'sqrt':
            squareRoot();
            updateDisplay();
            break;
        case 'memory-add':
            memoryAdd();
            break;
        case 'memory-sub':
            memorySubtract();
            break;
        case 'memory-recall':
            memoryRecall();
            updateDisplay();
            break;
    }
});

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal() {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);

        if (result === 'Error') {
            calculator.displayValue = 'Error';
            calculator.firstOperand = null;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
            return;
        } else {
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result;
        }
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => {
        if (secondOperand === 0) return 'Error';
        return firstOperand / secondOperand;
    },
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function toggleSign() {
    if (calculator.displayValue === '0') return;
    calculator.displayValue = calculator.displayValue.charAt(0) === '-' 
        ? calculator.displayValue.slice(1) 
        : '-' + calculator.displayValue;
}

function handleEquals() {
    const { firstOperand, operator, displayValue } = calculator;
    const secondOperand = parseFloat(displayValue);

    if (operator && !calculator.waitingForSecondOperand) {
        const result = performCalculation[operator](firstOperand, secondOperand);
        if (result === 'Error') {
            calculator.displayValue = 'Error';
        } else {
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result;
        }
        calculator.operator = null;
        calculator.waitingForSecondOperand = false;
    }
}

function squareNumber() {
    const currentValue = parseFloat(calculator.displayValue);
    const result = currentValue * currentValue;
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
}

function squareRoot() {
    const currentValue = parseFloat(calculator.displayValue);
    if (currentValue < 0) {
        calculator.displayValue = 'Error';
    } else {
        const result = Math.sqrt(currentValue);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    }
}

function memoryAdd() {
    const currentValue = parseFloat(calculator.displayValue);
    calculator.memory += currentValue;
}

function memorySubtract() {
    const currentValue = parseFloat(calculator.displayValue);
    calculator.memory -= currentValue;
}

function memoryRecall() {
    calculator.displayValue = `${parseFloat(calculator.memory.toFixed(7))}`;
    calculator.waitingForSecondOperand = true;
}
