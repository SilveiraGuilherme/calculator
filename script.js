let arrNumber = [],
  onDisplay = "0",
  num1 = null,
  num2 = null,
  operator = null,
  result = null;

const btnNumbers = document.querySelectorAll(".numbers"),
  btnOperators = document.querySelectorAll(".operators"),
  display = document.querySelector(".display"),
  btnClear = document.querySelector(".clear"),
  btnBackspace = document.querySelector(".backspace"),
  btnPercent = document.querySelector(".percent"),
  btnDot = document.querySelector(".decimal"),
  btnSign = document.querySelector(".sign"),
  btnResult = document.querySelector(".result");

document.addEventListener("keydown", (e) => {
  const key = document.querySelector(`button[key='${e.key}']`);
  if (key) {
    key.click();
  }
});

btnClear.addEventListener("click", () => {
  clear();
});

function displayUpdate() {
  display.textContent = onDisplay;
}

function addToDisplay() {
  btnNumbers.forEach((btnNumber) => {
    btnNumber.addEventListener("click", () => {
      if (arrNumber.length < 9) {
        if (arrNumber[0] === "0" && arrNumber[1] !== ".") {
          arrNumber.shift();
        } else if (
          arrNumber[0] === "-" &&
          arrNumber[1] === "0" &&
          arrNumber[2] !== "."
        ) {
          arrNumber.splice(1, 1);
        }
        arrNumber.push(btnNumber.value);
        onDisplay = arrNumber.join("");
        displayUpdate();
      }
    });
  });
}

function operatorChoice() {
  btnOperators.forEach((btnOperator) => {
    btnOperator.addEventListener("click", () => {
      if (!result) {
        num1 = onDisplay;
      } else {
        num1 = result;
      }
      operator = btnOperator.value;
      arrNumber = [];
    });
  });
}

function getResult() {
  btnResult.addEventListener("click", () => {
    if (operator) {
      if (result) {
        num1 = result;
        console.log("Second: " + num1, num2, operator, result);
      } else {
        num2 = onDisplay;
        console.log("Third: " + num1, num2, operator, result, result);
        arrNumber = [];
      }
      result = operate(+num1, +num2, operator);
      checkResult();
    }
  });
}

function checkResult() {
  if (result.toString().length > 9) {
    const arrResult = result.toString().split("");
    arrResult.splice(9, Infinity, "..");
    onDisplay = arrResult.join("");
  } else {
    onDisplay = result.toString();
  }
  displayUpdate();
}

function addDecimal() {
  btnDot.addEventListener("click", () => {
    const dot = btnDot.value;
    if (onDisplay === "0" || onDisplay === result) {
      arrNumber = ["0", dot];
    } else if (!arrNumber.includes(dot)) {
      arrNumber.push(dot);
    }
    onDisplay = arrNumber.join("");
    displayUpdate();
  });
}

function addSign() {
  btnSign.addEventListener("click", () => {
    if (onDisplay === "0") {
      arrNumber = ["-", "0"];
    } else if (!arrNumber.includes("-")) {
      arrNumber.unshift("-");
    } else {
      arrNumber.shift();
    }

    onDisplay = arrNumber.join("");
    displayUpdate();
  });
}

function addPercent() {
  btnPercent.addEventListener("click", () => {
    if (!num1 || (num1 && arrNumber === [])) {
      onDisplay = (+onDisplay / 100).toString();
    } else {
      onDisplay = ((+num1 * +onDisplay) / 100).toString();
    }
    displayUpdate();
  });
}

function backspace() {
  btnBackspace.addEventListener("click", () => {
    if (onDisplay !== "0") {
      if (arrNumber.length === 1 && arrNumber[0] !== "0") {
        arrNumber.splice(0, 1, "0");
      } else if (arrNumber.length === 0) {
        clear();
        arrNumber.push("0");
      } else {
        arrNumber.pop();
      }
      onDisplay = arrNumber.join("");
    }
    displayUpdate();
  });
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

function clear() {
  arrNumber = [];
  onDisplay = "0";
  num1 = null;
  num2 = null;
  operator = null;
  result = null;
  displayUpdate();
}

displayUpdate();
addToDisplay();
operatorChoice();
getResult();
addDecimal();
addSign();
addPercent();
backspace();
