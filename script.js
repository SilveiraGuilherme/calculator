let arrNumber = [];
let onDisplay = 0;
let num1 = null;
let num2 = null;
let operator = null;
let result = null;

const btnNumbers = document.querySelectorAll(".numbers");
const btnOperators = document.querySelectorAll(".operators");
const btnResult = document.querySelector(".result");
const btnClear = document.querySelector(".clear");
btnClear.addEventListener("click", () => {
  clear();
  displayUpdate();
});

function add(a, b) {
  return parseFloat(a + b);
}
function subtract(a, b) {
  return parseFloat(a - b);
}
function multiply(a, b) {
  return parseFloat(a * b);
}
function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return parseFloat(a / b);
}

function operate(a, b, op) {
  switch (op) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
}

function displayUpdate() {
  const display = document.querySelector(".display");
  display.textContent = onDisplay;
  if (onDisplay.length > 9) {
    display.textContent = onDisplay.subString(0, 9);
  }
}
displayUpdate();

function addToDisplay() {
  btnNumbers.forEach((btnNumber) => {
    btnNumber.addEventListener("click", () => {
      arrNumber.push(btnNumber.value);
      onDisplay = +arrNumber.join("");
      displayUpdate();
    });
  });
}
addToDisplay();

function operatorChoice() {
  btnOperators.forEach((btnOperator) => {
    btnOperator.addEventListener("click", () => {
      if (!result) {
        num1 = onDisplay;
        operator = btnOperator.value;
        arrNumber = [];
      } else {
        num1 = result;
        operator = btnOperator.value;
        arrNumber = [];
      }
    });
  });
}
operatorChoice();

function getResult() {
  btnResult.addEventListener("click", () => {
    if (operator === null) {
      onDisplay = onDisplay;
    } else {
      if (arrNumber === []) {
        num2 = num1;
        result = operate(num1, num2, operator);
        onDisplay = result;
        displayUpdate();
        console.log(num1);
        console.log(num2);
      } else {
        num2 = onDisplay;
        result = operate(num1, num2, operator);
        onDisplay = result;
        displayUpdate();
        console.log(num1);
        console.log(num2);
      }
    }
  });
}
getResult();

function clear() {
  arrNumber = [];
  onDisplay = 0;
  num1 = null;
  num2 = null;
  operator = null;
  result = null;
}
