const squareElements = document.querySelectorAll("[data-square]");

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

  const incrementActiveSquare = () => activeSquare++;
  const decrementActiveSquare = () => activeSquare--;

  const getGameBoard = () => gameBoard;

  const addLetter = (letter) => {
    gameBoard[activeSquare] = letter;
    incrementActiveSquare();
  };

  const deleteLetter = () => {
    if (activeSquare === 0) return;
    decrementActiveSquare();
    gameBoard[activeSquare] = null;
  };

  const resetGameBoard = () => {
    gameBoard.forEach((square) => {
      gameBoard[square] = null;
    });
  };

  return {
    getGameBoard,
    addLetter,
    deleteLetter,
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
});
