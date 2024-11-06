const board = document.getElementById('board');
const initialPositions = [
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    [],
    [],
    [],
    [],
    ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"]
];

// Generate the board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        square.className = 'square ' + ((i + j) % 2 === 0 ? 'white' : 'black');
        board.appendChild(square);

        // Place initial pieces
        if (initialPositions[i][j]) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.textContent = initialPositions[i][j];
            piece.draggable = true;
            square.appendChild(piece);

            // Add drag and drop events
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.textContent);
                e.target.classList.add('dragging');
            });

            piece.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        }

        square.addEventListener('dragover', (e) => e.preventDefault());

        square.addEventListener('drop', (e) => {
            const data = e.dataTransfer.getData('text/plain');
            if (e.target.classList.contains('square')) {
                e.target.innerHTML = ''; // Clear the square before dropping
                const droppedPiece = document.createElement('div');
                droppedPiece.className = 'piece';
                droppedPiece.textContent = data;
                droppedPiece.draggable = true;

                e.target.appendChild(droppedPiece);

                droppedPiece.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', e.target.textContent);
                });
            }
        });
    }
}
