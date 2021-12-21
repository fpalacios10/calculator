
let displayValue = "";
let displayElement = document.getElementById("display");
let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.getElementById("equal");
let clearButton = document.getElementById("clear");
let equation;
let isFirstNumber = true;
let clearNumber = false
let operatorLookup = {
	"add" : "+",
	"subtract" : "-",
	"multiply" : "*",
	"divide" : "/"
}
let operator;
let firstNumber;
let firstOperation;

function add(a,b) {
	return a + b;
}
function subtract(a,b) {
	return a - b;
}
function multiply(a,b) {
	return a * b;
}
function divide(a,b) {
	return a / b;
}

function operate(str, a, b) {
	switch (str) {
		case "+" :
			return add(a,b);
			break;
		case "-" :
			return subtract(a,b);
			break;
		case "*" :
			return multiply(a,b);
			break;
		case "/" :
			return divide(a,b);
			break;
		default:
			console.log("Invalid operator")
	}
}


function showResultInDisplay(res) {
	firstNumber = res;
	displayValue = res;
	displayElement.value =  res;
}
// clicking number buttons updates display
function updateDisplayValue(number, id) {
	// clear numb
	if (clearNumber){
		displayValue = "";
		clearNumber = false;
	}
	// if backspace , remove one character
	if (id === "delete") {
		displayValue = displayValue.split("").slice(0,-1).join("");

		displayElement.value = displayValue;
	} else {
	// add character to existing set of numbers
		displayValue = `${displayValue}${number}`;
		displayElement.value = displayValue
	}
}
numberButtons.forEach(button => {
	button.onclick = (el) => {
		let id =  el.target.id;
		updateDisplayValue(el.target.innerHTML, id)
	}
});

// clicking operator button saves first value and sets operator
operatorButtons.forEach(button => {
	button.onclick = (el) => {
		// set the operator
		operator =  operatorLookup[el.target.id];
		if (isFirstNumber) {
			firstNumber = Number(displayValue);
			firstOperation = operator;
			isFirstNumber =  false;
		} else {
			showResultInDisplay(operate(firstOperation, firstNumber, Number(displayValue)));
			isFirstNumber = true;
		}
		// clear display
		clearNumber = true;
	}
});

// solve equation
equalButton.onclick = () => {
	showResultInDisplay(operate(operator, firstNumber,Number(displayValue)));
	isFirstNumber = true;
	clearNumber = true;
}

// reset using clear button
clearButton.onclick = () => {
	displayValue = ""
	isFirstNumber = true;
	clearNumber = false;
	displayElement.value = displayValue;
}
