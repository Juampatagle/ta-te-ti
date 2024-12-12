const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.addEventListener('click', handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    message.textContent = `¡Jugador ${currentPlayer} ganó! 🎉`;
    highlightWinningCells();
    gameActive = false;
  } else if (gameState.every(cell => cell)) {
    message.textContent = '¡Es un empate! 🤝';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Turno del jugador ${currentPlayer}`;
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    if (combination.every(index => gameState[index] === currentPlayer)) {
      highlightCells(combination);
      return true;
    }
    return false;
  });
}

function highlightCells(indices) {
  indices.forEach(index => {
    const cell = board.children[index];
    cell.style.background = '#2ecc71';
    cell.style.color = '#fff';
  });
}

resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState.fill(null);
  message.textContent = `Turno del jugador ${currentPlayer}`;
  createBoard();
});

createBoard();
