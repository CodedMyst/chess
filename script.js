// Create a new chess game instance using chess.js
const game = new Chess();

// Function to render the history of moves
function renderMoveHistory(moves) {
  let historyElement = $('#move-history').empty();
  historyElement.empty();
  moves.forEach(function(move) {
    historyElement.append('<span>' + move + '</span><br>');
  });
}

// Function to handle a move made on the board
function makeMove(move) {
  game.ugly_move(move);
  renderMoveHistory(game.history());
  renderBoard();
}

// Initialize the chessboard using Chessboard.js
var board = Chessboard('board1', {
  draggable: true, // Allow dragging pieces
  dropOffBoard: 'trash', // Allow pieces to be dropped off the board
  sparePieces: true, // Enable spare pieces
  onDrop: handleMove // Handle the move event
});

// Function to handle a move made on the board (triggered on drop)
function handleMove(source, target) {
  // Try to make the move using chess.js
  let move = game.move({
    from: source,
    to: target,
    promotion: 'q' // Always promote to a queen (for simplicity)
  });

  // If the move was valid, update the board and history
  if (move === null) {
    return 'snapback'; // Invalid move, return the piece back
  }

  renderMoveHistory(game.history());
  renderBoard();

  // Check if the game is over
  if (game.game_over()) {
    alert("Game Over");
  }
}

// Function to render the current board state
function renderBoard() {
  board.position(game.fen());
}

// Initialize the board when the page is ready
$(document).ready(function() {
  renderBoard(); // Display the initial board
});
