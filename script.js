let arrInput = [],
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
  const btnKey = document.querySelector(`button[key='${e.key}']`);
  if (btnKey) {
    document.activeElement.blur();
    btnKey.click();
    btnKey.classList.add("active");
    document.addEventListener("keyup", () => {
      btnKey.classList.remove("active");
    });
    if (btnKey.classList.contains("operators")) {
      btnKey.focus();
    }
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
      if (arrInput.length < 9) {
        if (arrInput[0] === "0" && arrInput[1] !== ".") {
          arrInput.shift();
        } else if (
          arrInput[0] === "-" &&
          arrInput[1] === "0" &&
          arrInput[2] !== "."
        ) {
          arrInput.splice(1, 1);
        }
        arrInput.push(btnNumber.value);
        onDisplay = arrInput.join("");
        displayUpdate();
      }
    });
  });
}

function operatorChoice() {
  btnOperators.forEach((btnOperator) => {
    btnOperator.addEventListener("click", () => {
      if (result === null) {
        num1 = arrInput.join("");
      } else {
        num1 = result;
      }
      operator = btnOperator.value;
      arrInput = [];
    });
  });
}

function getResult() {
  btnResult.addEventListener("click", () => {
    if (operator) {
      if (result !== null) {
        num1 = result;
      } else {
        num2 = onDisplay;
        arrInput = [];
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
      arrInput = ["0", dot];
    } else if (!arrInput.includes(dot)) {
      arrInput.push(dot);
    }
    onDisplay = arrInput.join("");
    displayUpdate();
  });
}

function addSign() {
  btnSign.addEventListener("click", () => {
    if (onDisplay === "0") {
      arrInput = ["-", "0"];
    } else if (!arrInput.includes("-")) {
      arrInput.unshift("-");
    } else {
      arrInput.shift();
    }
    onDisplay = arrInput.join("");
    displayUpdate();
  });
}

function addPercent() {
  btnPercent.addEventListener("click", () => {
    if (!operator) {
      arrInput = [(+onDisplay / 100).toString()];
      onDisplay = arrInput.toString();
    } else {
      onDisplay = ((+num1 * +onDisplay) / 100).toString();
    }
    displayUpdate();
  });
}

function backspace() {
  btnBackspace.addEventListener("click", () => {
    if (onDisplay !== "0") {
      if (arrInput.length === 1 && arrInput[0] !== "0") {
        arrInput.splice(0, 1, "0");
      } else if (arrInput.length === 0) {
        clear();
        arrInput.push("0");
      } else {
        arrInput.pop();
      }
      onDisplay = arrInput.join("");
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
  return parseFloat(a + b).toFixed(4);
}
function subtract(a, b) {
  return parseFloat(a - b).toFixed(4);
}
function multiply(a, b) {
  return parseFloat(a * b).toFixed(4);
}
function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return parseFloat(a / b).toFixed(4);
}

function clear() {
  arrInput = [];
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
