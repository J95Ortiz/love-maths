//console.log("Hello from the console!");

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

  document
    .getElementById("answer-box")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });

  runGame("addition");
});

/**
 * Main game's "loop". Fn gets called when script first loads,
 * & after users' answer's processed.
 */
function runGame(gameType) {
  //Wipes the previous answer from the answer box when a new question is loaded.
  document.getElementById("answer-box").value = "";

  //Sets the focus of the page on the answer box so user doesn't have to click on it each time.
  document.getElementById("answer-box").focus();

  //Creates 2 random numbers between 1 & 25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Yes! You got that right! :D");
    incrementScore();
  } else {
    alert(
      `Shame! You answered ${userAnswer}. The right answer was ${calculatedAnswer[0]}!`
    );
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (numbers) & the operator (plus, minus etc.)
 * directly from the dom & returns corect answer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    return [operand1 + operand2, "addition"];
  } else if (operator === "x") {
    return [operand1 * operand2, "multiply"];
  } else if (operator === "-") {
    return [operand1 - operand2, "subtract"];
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting!`;
  }
}

/**
 * Gets the current score from the DOM & increments it by 1.
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the wrong score from the DOM & increments it by 1.
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent =
    operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

//function displayDivisionQuestion() {}
