const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //Adicionando dígito na tela da calculadora 
    addDigit(digit) {
        //Verificando se a operação atual já tem um ponto
        if(digit==="." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    //Processando todas as operações calculadora
    processOperation(operation) {
        //Verificando se o valor atual está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //Mudando de operação
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return
        }

        //Obtendo valor atual e anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperator()
                break;
            case "CE":
                this.processClearCurrentOperation()
                break;
            case "C":
                this.processClearOperation()
                break;
            case "=":
                this.processEqualsOperator()
                break;
            default:
                return;
        }
    }

    //Alterando valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null, 
        current = null, 
        previous = null
    ) {

        if(operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation; 
        } else {
            //Verificando se zero é o valor, se for apenas adicione o valor atual
            if (previous === 0) {
                operationValue = current;
            }
            //Adicionando valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    //Alterando operações matemáticas
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Excluindo o último digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Limpando a operação atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    //Limpando todas as operações
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Processando uma operação
    processEqualsOperator() {

        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;
        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        } 
    })
})