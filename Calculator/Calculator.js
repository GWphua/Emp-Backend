let previousString = "";
let previousOperand = "";
let displayString = "";

const panelDisplay = document.getElementById("panelDisplay");

function logButton(input) {
  if (isClear(input)) {
    clearValues();
  } else if (isOperand(input)) {
    displayString = calculateValue(input);
  } else {
    updateNumber(input);
  }

  panelDisplay.innerHTML = displayString;
}

function isOperand(input) {
  return (
    input == "+" || input == "-" || input == "*" || input == "/" || input == "="
  );
}

function isClear(input) {
  return input == "C";
}

function clearValues() {
  previousString = "";
  previousOperand = "";
  displayString = "";
  previousInput = "";
}

function updateNumber(input) {
  displayString = displayString == "NaN" ? input : displayString + input;
}

function noPreviousOperand() {
  return previousOperand == "";
}

function isInvalidCalculation() {
  return displayString == "";
}

function calculateValue(input) {
  if (isInvalidCalculation()) {
    return "NaN";
  }

  if (input == "=") {
    if (noPreviousOperand()) {
      return displayString;
    } else {
      const result = evaluate(previousOperand);
      previousOperand = "";
      return result;
    }
  } else {
    if (noPreviousOperand()) {
      previousOperand = input;
      previousString = displayString;
      return "";
    } else {
      const result = evaluate(input);
      previousOperand = input;
      console.log("RESULT = ", result);
      return result;
    }
  }
}

function evaluate(input) {
  console.log(`EVALUATING: Goal = ${displayString} ${input} ${previousString}`);
  let result = undefined;

  switch (input) {
    case "+":
      result = parseFloat(previousString) + parseFloat(displayString);

      break;
    case "-":
      result = parseFloat(previousString) - parseFloat(displayString);

      break;
    case "*":
      result = parseFloat(previousString) * parseFloat(displayString);
      break;
    case "/":
      result = parseFloat(previousString) / parseFloat(displayString);
      break;
    case "":
      return displayString;
    default:
      return "NaN";
  }

  // Rounding off to 5 significant figures.
  return (sigFigs(result, 5)).toString();
}

function sigFigs(n, sig) {
  var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
  return Math.round(n * mult) / mult;
}