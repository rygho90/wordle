const squareElements = document.querySelectorAll("[data-square]");
const keyElements = document.querySelectorAll("[data-letter]");
const endGameModal = document.querySelector("[data-end-game]");
const endGameText = document.querySelector("[data-end-text]");
const resetButton = document.querySelector("[data-reset-btn]");

const wordleList = ["JAZZY"];
const validLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const gameController = (() => {
  let gameBoard = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  let activeSquare = 0;
  let activeRow = 0;
  let wordle = "JAZZY";

  let letterData = {
    guessedLetters: [],
    missedLetters: [],
    matchedLetters: [],
  };

  let rowData = {
    guessedLetters: [],
    missedLetters: [],
    matchedLetters: [],
  };

  const incrementActiveSquare = () => activeSquare++;
  const decrementActiveSquare = () => activeSquare--;
  const incrementActiveRow = () => activeRow++;

  const getGameBoard = () => gameBoard;
  const getActiveRow = () => activeRow;
  const getLetterData = () => letterData;
  const getRowData = () => rowData;
  const getWordle = () => wordle;

  const addLetter = (letter) => {
    if (activeSquare === 5 + activeRow * 5) return;
    gameBoard[activeSquare] = letter;
    incrementActiveSquare();
  };

  const deleteLetter = () => {
    if (activeSquare === 0 + activeRow * 5) return;
    decrementActiveSquare();
    gameBoard[activeSquare] = null;
  };

  const submitWord = () => {
    if (activeSquare !== 5 + activeRow * 5) return;

    let lettersToCheck = [];
    rowData = {
      guessedLetters: [],
      missedLetters: [],
      matchedLetters: [],
    };
    let pos = 0;
    let lettersCorrect = 0;

    for (let i = activeSquare - 5; i < activeSquare; i++) {
      lettersToCheck.push(gameBoard[i]);
    }

    lettersToCheck.forEach((letter) => {
      if (!wordle.includes(letter)) {
        console.log("Letter not found");
        if (!letterData.guessedLetters.includes(letter)) {
          letterData.guessedLetters.push(letter);
        }
        rowData.guessedLetters.push(letter);
      } else if (lettersToCheck[pos] === wordle[pos]) {
        console.log("Letter found in correct spot");
        if (!letterData.matchedLetters.includes(letter)) {
          letterData.matchedLetters.push(letter);
        }
        rowData.matchedLetters.push(letter);
        lettersCorrect++;
      } else {
        console.log("Letter found in incorrect spot");
        if (!letterData.missedLetters.includes(letter)) {
          letterData.missedLetters.push(letter);
        }
        rowData.missedLetters.push(letter);
      }
      pos++;
    });

    if (lettersCorrect === 5) displayController.showEndGameModal("won");
    if (activeRow >= 5 && lettersCorrect !== 5)
      displayController.showEndGameModal("lost");

    incrementActiveRow();
  };

  const resetGame = () => {
    gameBoard = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    activeSquare = 0;
    activeRow = 0;
    wordle = "JAZZY";

    letterData = {
      guessedLetters: [],
      missedLetters: [],
      matchedLetters: [],
    };

    rowData = {
      guessedLetters: [],
      missedLetters: [],
      matchedLetters: [],
    };
  };

  return {
    getGameBoard,
    getActiveRow,
    getLetterData,
    getRowData,
    getWordle,
    addLetter,
    deleteLetter,
    submitWord,
    resetGame,
  };
})();

const displayController = (() => {
  const renderLetters = (board) => {
    let count = 0;
    squareElements.forEach((square) => {
      square.textContent = board[count];
      count++;
    });
  };

  const renderRowColors = (row, letterData) => {
    const squareSpots = [0, 1, 2, 3, 4];
    activeSquares = squareSpots.map((square) => square + (row - 1) * 5);

    activeSquares.forEach((pos) => {
      let activeLetter = squareElements[pos].textContent;
      if (letterData.guessedLetters.includes(activeLetter))
        squareElements[pos].classList.add("guessed-letter");
      if (letterData.missedLetters.includes(activeLetter))
        squareElements[pos].classList.add("missed-letter");
      if (
        letterData.matchedLetters.includes(activeLetter) &&
        activeLetter === gameController.getWordle()[pos - (row - 1) * 5]
      )
        squareElements[pos].classList.add("matched-letter");
    });
  };

  const renderKeyColors = (letterData) => {
    keyElements.forEach((key) => {
      let activeLetter = key.textContent;
      if (letterData.guessedLetters.includes(activeLetter))
        key.classList.add("guessed-letter");
      if (letterData.missedLetters.includes(activeLetter))
        key.classList.add("missed-letter");
      if (letterData.matchedLetters.includes(activeLetter))
        key.classList.add("matched-letter");
    });
  };

  const removeKeyTransition = (e) => {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("pressed");
  };

  const showEndGameModal = (outcome) => {
    endGameModal.classList.remove("hide");
    outcome === "won"
      ? endGameModal.classList.add("matched-letter")
      : endGameModal.classList.add("guessed-letter");
    endGameText.textContent = `You ${outcome}!`;
  };

  const resetDisplay = () => {
    squareElements.forEach((square) => {
      square.textContent = null;
      square.classList.remove("guessed-letter");
      square.classList.remove("missed-letter");
      square.classList.remove("matched-letter");
    });
    keyElements.forEach((key) => {
      key.classList.remove("guessed-letter");
      key.classList.remove("missed-letter");
      key.classList.remove("matched-letter");
    });
    endGameModal.classList.add("hide");
    endGameModal.classList.remove("matched-letter");
    endGameModal.classList.remove("guessed-letter");
  };

  return {
    renderLetters,
    renderRowColors,
    renderKeyColors,
    removeKeyTransition,
    showEndGameModal,
    resetDisplay,
  };
})();

document.addEventListener("keypress", (e) => {
  if (!validLetters.includes(e.key.toUpperCase())) return;

  gameController.addLetter(e.key.toUpperCase());
  displayController.renderLetters(gameController.getGameBoard());

  displayController.removeKeyTransition;
  keyElements.forEach((key) => {
    if (key.textContent === e.key.toUpperCase()) key.classList.add("pressed");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    gameController.deleteLetter();
    displayController.renderLetters(gameController.getGameBoard());
  }

  if (e.key === "Enter") {
    gameController.submitWord();
    displayController.renderRowColors(
      gameController.getActiveRow(),
      gameController.getRowData()
    );
    displayController.renderKeyColors(gameController.getLetterData());
  }
});

keyElements.forEach((key) =>
  key.addEventListener("transitionend", displayController.removeKeyTransition)
);

keyElements.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (!validLetters.includes(key.textContent)) return;
    displayController.removeKeyTransition;
    gameController.addLetter(e.target.textContent);
    displayController.renderLetters(gameController.getGameBoard());
    key.classList.add("pressed");
  });
});

resetButton.addEventListener("click", () => {
  gameController.resetGame();
  displayController.resetDisplay();
});
