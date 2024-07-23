document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                calculateResult();
            } else if (button.classList.contains('operator')) {
                setOperator(value);
            } else {
                appendToDisplay(value);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.value = '';
    }

    function calculateResult() {
        if (operator && previousInput !== '' && currentInput !== '') {
            const result = eval(`${previousInput} ${operator} ${currentInput}`);
            display.value = result;
            currentInput = result;
            operator = '';
            previousInput = '';
        }
    }

    function setOperator(op) {
        if (currentInput !== '') {
            if (operator !== '') {
                calculateResult();
            }
            operator = op;
            previousInput = currentInput;
            currentInput = '';
        }
    }

    function appendToDisplay(value) {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        display.value = currentInput;
    }
});
