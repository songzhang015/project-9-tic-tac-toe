/* JS File for Tic-Tac-Toe Project */

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

const displayController = (function () {

    function updateBoard(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const value = board.getCell(row, col);
        cell.textContent = value;
    }

    function showMessage(msg) {
        const msgElement = document.querySelector(".msg h2")
        msgElement.textContent = msg;
    }

    function reset() {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });
        const msgElement = document.querySelector(".msg h2");
        msgElement.textContent = "";
    }

    return { updateBoard, showMessage, reset};
})();

const gameController = (function () {
    let gameOver = false;
    let playerOne;
    let playerTwo;
    let currentPlayer;
    const p1ScoreElement = document.querySelector(".player-one h2");
    const p2ScoreElement = document.querySelector(".player-two h2");

    const cells = document.querySelectorAll(".cell");

    function createPlayer (name, symbol) {
        return { name, symbol }
    }
    function switchPlayer() {
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
    }
    function getCurrentPlayer() {
        return currentPlayer;
    }

    function clickCell(row, col) {
        if (gameOver) return;
        if (board.setCell(row, col, currentPlayer.symbol)) {
            displayController.updateBoard(row, col);
            if (board.isWin(currentPlayer.symbol)) {
                gameOver = true;
                displayController.showMessage(`${currentPlayer.name} wins!`)
                if (currentPlayer == playerOne) {
                    p1ScoreElement.textContent = parseInt(p1ScoreElement.textContent) + 1;
                } else {
                    p2ScoreElement.textContent = parseInt(p2ScoreElement.textContent) + 1;
                }
                return
            }
            if (board.isDraw()) {
                gameOver = true;
                displayController.showMessage("It's a draw!");
                return;
            }
            switchPlayer();
            displayController.showMessage(`${currentPlayer.name}'s turn`);
        }
    }

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            clickCell(row, col);
        });
    });

    function startGame(name1, name2) {
        playerOne = createPlayer(name1 || "Player 1", "X");
        playerTwo = createPlayer(name2 || "Player 2", "O");
        currentPlayer = playerOne;
        board.reset();
        displayController.reset();
        p1TitleElement.textContent = inputOneElement.value || "Player 1";
        p2TitleElement.textContent = inputTwoElement.value || "Player 2";
        displayController.showMessage(`${currentPlayer.name}'s turn`);
    }

    const formElement = document.querySelector("form");
    const menuScreenElement = document.querySelector(".menu-screen");
    const playScreenElement = document.querySelector(".play-screen");
    const inputOneElement = document.querySelector("input[placeholder='Player 1 Name']");
    const inputTwoElement = document.querySelector("input[placeholder='Player 2 Name']");
    const p1TitleElement = document.querySelector(".player-one h1");
    const p2TitleElement = document.querySelector(".player-two h1");
    const restartElement = document.querySelector(".reset-btn");

    restartElement.addEventListener("click", (e) => {
        e.preventDefault();
        board.reset();
        displayController.reset();
        gameOver = false;
        currentPlayer = playerOne;
        displayController.showMessage(`${currentPlayer.name}'s turn`);
    });

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputOne = inputOneElement.value;
        const inputTwo = inputTwoElement.value;
        menuScreenElement.classList.add("hidden");
        playScreenElement.classList.remove("hidden");
        startGame(inputOne, inputTwo);
    });

    return { getCurrentPlayer, switchPlayer, startGame };
})();