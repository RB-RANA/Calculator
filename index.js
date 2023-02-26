
class calculator{
    constructor(previousOperantTextElement,currentOperandTextElement){

        this.previousOperantTextElement = previousOperantTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.cler();

    }

    cler(){
        this.currentOperand = "";
        this.PreiviouOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber (number){
        if(number ==="." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.PreiviouOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.PreiviouOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
let result;
const prev = parseFloat(this.PreiviouOperand);
const current = parseFloat(this.currentOperand);
if(isNaN(prev) || isNaN(current)) return;

switch(this.operation){
case "+":
    result = prev + current;
    break;
    case "-":
        result = prev - current;
    break;
    case "×":
        result = prev * current;
    break;
    case "÷":
        result = prev / current;
    break;

    default:
        break;

}
this.currentOperand = result;
this.operation = undefined;
this.PreiviouOperand = "";

    }
getDisplayNumber(number){
    const stringNumber = number.toString();
    const numArr = stringNumber.split(".");
    const integerDigits = parseFloat(numArr[0]);
    const decimalDigits = numArr[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
        integerDisplay = "";
    }else{
        integerDisplay = integerDigits.toLocaleString("en",{
            maximumFractionDigits:0,
        });
    }
    if(decimalDigits !=null){
        return`${integerDisplay}.${decimalDigits}`;

    }else{return integerDisplay;}
        


}

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation!=null){
            this.previousOperantTextElement.innerText = `${this.getDisplayNumber(this.PreiviouOperand)} ${this.operation}`;
        }else{
            this.previousOperantTextElement.innerText = this.getDisplayNumber(this.PreiviouOperand); 
        }
        
    }
}



const numButtons = document.querySelectorAll("[data-Number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-Delete]");
const allClearBtn = document.querySelector("[data-all-clear]");

const previousOperantTextElement = document.querySelector("[data-prev-operand]");
const currentOperandTextElement = document.querySelector("[data-curr-oprand]");

document.addEventListener("DOMContentLoaded", () =>{
    const cale = new calculator(previousOperantTextElement,currentOperandTextElement);

    numButtons.forEach((button) => {
button.addEventListener("click", () =>{
    
    cale.appendNumber(button.innerText)
    cale.updateDisplay();
})
    });

    operationBtns.forEach((button) =>{
        button.addEventListener("click", () => {
        cale.chooseOperation(button.innerText);
        cale.updateDisplay();
        });
    } );
    equalButton.addEventListener("click", () =>{
        cale.compute();
        cale.updateDisplay()
    });

    deleteButton.addEventListener("click",() =>{
        cale.delete();
        cale.updateDisplay()
    })
    allClearBtn.addEventListener("click",()=>{
        cale.cler();
        cale.updateDisplay();
    })

});
