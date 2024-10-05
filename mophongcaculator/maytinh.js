const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let previousInput = '';
let resultCalculated = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const btnValue = button.textContent;

        if (button.classList.contains('number')) {
            if (resultCalculated) {
                currentInput = '';
                resultCalculated = false;
            }
            currentInput += btnValue;
            updateDisplay(currentInput);
        }

        if (button.classList.contains('operator')) {
            if (currentInput === '' && previousInput !== '') {
                operator = btnValue;
                return;
            }
            if (currentInput === '') return;
            operator = btnValue;
            previousInput = currentInput;
            currentInput = '';
        }

        if (button.classList.contains('decimal')) {
            if (resultCalculated) {
                currentInput = '0';
                resultCalculated = false;
            }
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay(currentInput);
            }
        }

        if (button.id === 'clear') {
            clearAll();
        }

        if (button.id === 'equals') {
            calculate();
        }
    });
});

function updateDisplay(value) {
    display.textContent = value || '0';
}

function clearAll() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Không thể chia cho 0');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    updateDisplay(result);
    currentInput = result;
    operator = '';
    previousInput = '';
    resultCalculated = true;
}
