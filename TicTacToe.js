document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) return;
        
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }
    
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }
    
    function handleResultValidation() {
        let roundWon = false;
        
        for (const [a, b, c] of winningConditions) {
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            statusDisplay.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        if (!gameState.includes('')) {
            statusDisplay.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }
        
        changePlayer();
    }
    
    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    }
    
    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill('');
        statusDisplay.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    }
    
    modeToggle.addEventListener('click', () => body.classList.toggle('dark-mode'));
    restartBtn.addEventListener('click', restartGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});