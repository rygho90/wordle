const squareElements = document.querySelectorAll("[data-square]");

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
  const gameBoard = [
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
  }

  const incrementActiveSquare = () => activeSquare++;
  const decrementActiveSquare = () => activeSquare--;
  const incrementActiveRow = () => activeRow++;

  const getGameBoard = () => gameBoard;
  const getActiveRow = () => activeRow;
  const getLetterData = () => letterData;
  const getRowData = () => rowData;

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
    }
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
        rowData.guessedLetters.push(letter)
      } else if (lettersToCheck[pos] === wordle[pos]) {
        console.log("Letter found in correct spot");
        if (!letterData.matchedLetters.includes(letter)) {
          letterData.matchedLetters.push(letter);
        }
        rowData.matchedLetters.push(letter)
        lettersCorrect++;
      } else {
        console.log("Letter found in incorrect spot");
        if (!letterData.missedLetters.includes(letter)) {
          letterData.missedLetters.push(letter);
        }
        rowData.missedLetters.push(letter)
      }
      pos++;
    });

    if (lettersCorrect === 5) console.log("Win!");

    incrementActiveRow();
  };

  const resetGameBoard = () => {
    gameBoard.forEach((square) => {
      gameBoard[square] = null;
    });
  };

  return {
    getGameBoard,
    getActiveRow,
    getLetterData,
    getRowData,
    addLetter,
    deleteLetter,
    submitWord,
    resetGameBoard,
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
      if (letterData.matchedLetters.includes(activeLetter))
        squareElements[pos].classList.add("matched-letter");
    });
  };

  return { renderLetters, renderRowColors };
})();

document.addEventListener("keypress", (e) => {
  if (!validLetters.includes(e.key.toUpperCase())) return;

  gameController.addLetter(e.key.toUpperCase());
  displayController.renderLetters(gameController.getGameBoard());
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
  }
});
