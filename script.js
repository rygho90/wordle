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
  let guessedWords = [];

  const incrementActiveSquare = () => activeSquare++;
  const decrementActiveSquare = () => activeSquare--;
  const incrementActiveRow = () => activeRow++;

  const getGameBoard = () => gameBoard;

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

    let newWord = '';
    for (let i = activeSquare - 5; i < activeSquare; i++) {
        newWord += gameBoard[i]
    }
    guessedWords.push(newWord)

    incrementActiveRow();
  }

  const resetGameBoard = () => {
    gameBoard.forEach((square) => {
      gameBoard[square] = null;
    });
  };

  return {
    getGameBoard,
    addLetter,
    deleteLetter,
    submitWord,
    resetGameBoard,
  };
})();

const displayController = (() => {
  const renderBoard = (board) => {
    let count = 0;
    squareElements.forEach((square) => {
      square.textContent = board[count];
      count++;
    });
  };

  return { renderBoard };
})();

document.addEventListener("keypress", (e) => {
  if (!validLetters.includes(e.key.toUpperCase())) return;

  gameController.addLetter(e.key.toUpperCase());
  displayController.renderBoard(gameController.getGameBoard());
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    gameController.deleteLetter();
    displayController.renderBoard(gameController.getGameBoard());
  }

  if (e.key === "Enter") {
    gameController.submitWord();
  }
});
