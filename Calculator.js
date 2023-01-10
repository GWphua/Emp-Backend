let previousString = "";
let previousOperand = "";
let displayString = "";
let previousInput = "";

const panelDisplay = document.getElementById("panelDisplay");

function logButton(input) {
  if (isClear(input)) {
    clearValues();
  } else if (isOperand(input)) {
    displayString = calculateValue(input);
  } else if (isOperand(previousInput)) {
    displayString = handleNewNumber(input);
  } else {
    updateNumber(input);
  }

  console.log("PreviousString = ", previousString);
  console.log("PreviousOperand = ", previousOperand);
  console.log("displayString = ", displayString);

//  previousInput = input;
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

function handleNewNumber(input) {
  previousString = displayString;
  displayString = '';
  return input;
}

function calculateValue(input) {
  console.log("Calculating... Previous String =", previousString);
  console.log("PreviousOperand = ", previousOperand);
  console.log("displayString = ", displayString);
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

  return (Math.round(result * 100000) / 100000).toString();
}
