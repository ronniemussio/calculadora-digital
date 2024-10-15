let displayValue = '';
let firstValue = null;
let operator = null;
let isNewInput = false;

function appendToDisplay(value) {
    if (isNewInput) {
        displayValue = '';
        isNewInput = false;
    }
    if (value === '.' && displayValue.includes('.')) return; // evitar múltiplos decimais
    displayValue += value;
    updateDisplay();
}

function setOperator(op) {
    if (firstValue === null) {
        firstValue = parseFloat(displayValue);
    } else if (displayValue !== '') {
        const secondValue = parseFloat(displayValue);
        firstValue = operate(operator, firstValue, secondValue);
        displayValue = firstValue.toString(); // Atualiza o display com o resultado
    }
    operator = op;
    isNewInput = true;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    firstValue = null;
    operator = null;
    updateDisplay();
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    if (firstValue !== null && displayValue !== '') {
        const secondValue = parseFloat(displayValue);
        const result = operate(operator, firstValue, secondValue);
        displayValue = result.toString();
        updateDisplay();
        firstValue = result; // Armazena o resultado para operações futuras
        operator = null; // Reiniciar operador após calcular
    }
}

function operate(op, a, b) {
    switch (op) {
        case '+': return roundResult(a + b);
        case '-': return roundResult(a - b);
        case '*': return roundResult(a * b);
        case '/': 
            if (b === 0) {
                alert("Você não pode dividir por zero!");
                return a; // Retorna o primeiro valor se a divisão por zero acontecer
            }
            return roundResult(a / b);
        default: return b;
    }
}

function roundResult(value) {
    return Math.round(value * 10000) / 10000; // arredondar a 4 casas decimais
}

// Suporte ao teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ('0123456789'.includes(key)) {
        appendToDisplay(key);
    } else if ('+-*/'.includes(key)) {
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === '.') {
        appendToDisplay('.');
    }
});

