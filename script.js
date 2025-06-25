/* JS File for Tic-Tac-Toe Project */

// gameboard
// displayController
// player


const board = (function initializeBoard() {
    const gameBoard = [];
    for (let i = 0; i < 3; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = null;
        }
    }

    function print() {
        console.table(gameBoard);
    }

    function reset() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = null;
            }
        }
    }

    function setCell(row, col, val) {
        if (gameBoard[row][col] == null) {
            gameBoard[row][col] = val;
            return true;
        }
        return false;
    }

    function getCell(row, col) {
        return gameBoard[row][col];
    }

    function isDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] == null) {
                    return false;
                }
            }
        }
        return true;
    }

    function isWin(val) {
        // Rows
        for (let i = 0; i < 3; i++) {
            let rowWin = true;
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] != val) {
                    rowWin = false;
                    break;
                }
            }
            if (rowWin) {
                return true;
            }
        }

        // Columns
        for (let i = 0; i < 3; i++) {
            let colWin = true;
            for (let j = 0; j < 3; j++) {
                if (gameBoard[j][i] != val) {
                    colWin = false;
                    break;
                }
            }
            if (colWin) {
                return true;
            }
        }

        // Diagonals
        let diagonalWin1 = true;
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][i] != val) {
                diagonalWin1 = false;
                break;
            }
        }
        if (diagonalWin1) {
            return true;
        }

        let diagonalWin2 = true;
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][2 - i] != val) {
                diagonalWin2 = false;
                break;
            }
        }
        if (diagonalWin2) {
            return true;
        }

        return false;
    }

    return { gameBoard, print, reset, setCell, getCell, isDraw, isWin };
})();

function testBoard() {
    console.log("Initializing board...")

    console.log("-----");

    console.log("Initial Board and Print Function:");
    board.print();

    console.log("-----");

    console.log("Set 1st row to be X, get the cells, verify if winner:");
    board.setCell(0, 0, "X");
    board.setCell(0, 1, "X");
    board.setCell(0, 2, "X");
    board.print();

    console.log("(0, 0): " + board.getCell(0, 0));
    console.log("(0, 1): " + board.getCell(0, 1));
    console.log("(0, 2): " + board.getCell(0, 2));
    console.log("(1, 0): " + board.getCell(1, 0));

    console.log("X: " + board.isWin("X"));
    console.log("O: " + board.isWin("O"));
    console.log("-----");

    console.log("Set all to be X, verify if draw:");
    board.setCell(1, 0, "X");
    board.setCell(1, 1, "X");
    board.setCell(1, 2, "X");
    board.setCell(2, 0, "X");
    board.setCell(2, 1, "X");
    console.log("Testing if draw before all X: " + board.isDraw());
    board.setCell(2, 2, "X");

    board.print();
    console.log("Now board is all X: " + board.isDraw());

    console.log("-----");

    console.log("Now trying to put O on top of X: ")
    board.setCell(0, 0, "O");
    board.setCell(0, 1, "O");
    board.setCell(0, 2, "O");
    board.print();

    console.log("-----");
    console.log("Reset");
    board.reset();
    board.print();
}

const displayController = (function () {

    function updateBoard(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const value = board.getCell(row, col);
        cell.textContent = value;
    }

    function showMessage(msg) {

    }

    return { updateBoard, showMessage };
})();

const gameController = (function () {
    const playerOne = document.querySelector(".player-one");
    const playerTwo = document.querySelector(".player-two");
    let currentPlayer = playerOne;

    const cells = document.querySelectorAll(".cell");

    function clickCell(row, col) {
        if (board.setCell(row, col, currentPlayer == playerOne ? "X" : "O")) {
            currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
            displayController.updateBoard(row, col);
        }
    }

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            clickCell(row, col);
        });
    });

})();