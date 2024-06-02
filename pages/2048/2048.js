import getTranslation from "../../scripts/internalization.js";
import Popup from "../../scripts/popup.js";

document.addEventListener("DOMContentLoaded", function() {
    const restartBtn = document.querySelector("#restart-btn");
    const boardSize = 4;
    let cells = [];

    // Создание игрового поля
    function createGameBoard() {
        const board = document.getElementById("field");
        board.innerHTML = "";

        cells = [];

        for (let i = 0; i < boardSize ** 2; i++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.innerText = "";
            board.appendChild(cell);
            cells.push(cell);
        }

        addRandomTile();
        addRandomTile();
        render();
    }

    // Добавление случайного тайла на пустую клетку
    function addRandomTile() {
        const emptyCells = cells.filter(cell => cell.innerText === "");
        if(emptyCells.length > 0) {
            emptyCells[Math.floor(Math.random() * emptyCells.length)].innerText = Math.random() < 0.9 ? "2" : "4";
        }
    }

    // Рендер игрового поля
function render() {
    cells.forEach(cell => {
        cell.innerText = cell.innerText || "";
        cell.className = "cell";
        
        // Установка цвета в зависимости от значения в плитке
        const cellValue = parseInt(cell.innerText);

        switch (cellValue) {
            case 2:
                cell.style.backgroundColor = "#eee0cf";
                break;
            case 4:
                cell.style.backgroundColor = "#f2b179";
                break;
            case 8:
                cell.style.backgroundColor = "#f7945d";
                break;
            case 16:
                cell.style.backgroundColor = "#f57c5f";
                break;
            case 32:
                cell.style.backgroundColor = "#f8603b";
                break;
            case 64:
                cell.style.backgroundColor = "#edce71";
                break;
            case 128:
                cell.style.backgroundColor = "#edcc61";
                break;
            case 256:
                cell.style.backgroundColor = "#edc850";
                break;
            case 512:
                cell.style.backgroundColor = "#edc53f";
                break;
            case 1024:
                cell.style.backgroundColor = "#edc32e";
                break;
            case 2048:
                cell.style.backgroundColor = "#edc12e";
                break;
            case 4096:
                cell.style.backgroundColor = "#3c3a32";
                cell.style.color = "#f9f6f2";
                break;
            // Дополнительные цвета для других значений

            default:
                cell.style.backgroundColor = "var(--bg-secondary)";
                break;
        }

        if (cellValue >= 2048) {
            cell.className = "cell win-cell";
        } else if (cell.innerText === "") {
            cell.className = "cell empty-cell";
        }
    });
}



    // Проверка условия победы
    function checkWin() {
        if (cells.some(cell => cell.innerText === "2048")) {
            alert("Поздравляем, вы выиграли!");
        }
    }

    // Проверка условия поражения
    function checkGameOver() {
        const cellValues = cells.map(cell => parseInt(cell.innerText) || 0);
        if (!cellValues.includes(0) && !canMove()) {
            alert("Игра окончена. Попробуйте еще раз!");
        }
    }

    // Проверка возможности сделать ход
    function canMove() {
        for (let i = 0; i < cells.length; i++) {
            const cellValue = parseInt(cells[i].innerText) || 0;
            const topCellValue = parseInt(cells[i - boardSize]?.innerText) || 0;
            const bottomCellValue = parseInt(cells[i + boardSize]?.innerText) || 0;
            const leftCellValue = parseInt(cells[i - 1]?.innerText) || 0;
            const rightCellValue = parseInt(cells[i + 1]?.innerText) || 0;

            if (cellValue === 0 ||
                cellValue === topCellValue ||
                cellValue === bottomCellValue ||
                cellValue === leftCellValue ||
                cellValue === rightCellValue) {
                return true;
            }
        }
        return false;
    }

    function moveTiles(direction) {
        let row, col, targetRow, targetCol;
    
        switch(direction) {
            case "up":
                row = -1; col = 0; break;
            case "down":
                row = 1; col = 0; break;
            case "left":
                row = 0; col = -1; break;
            case "right":
                row = 0; col = 1; break;
            default:
                return;
        }
    
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                targetRow = i + row;
                targetCol = j + col;
    
                if (targetRow >= 0 && targetRow < boardSize && targetCol >= 0 && targetCol < boardSize) {
                    const currentCell = cells[i * boardSize + j];
                    const targetCell = cells[targetRow * boardSize + targetCol];
    
                    if (targetCell.innerText === "") {
                        targetCell.innerText = currentCell.innerText;
                        currentCell.innerText = "";
                    } else if (targetCell.innerText === currentCell.innerText) {
                        targetCell.innerText = parseInt(targetCell.innerText) * 2;
                        currentCell.innerText = "";
                    }
                }
            }
        }
    }
    

    // Обработчик событий для клавиш клавиатуры
    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "ArrowUp":
                moveTiles("up");
                break;
            case "ArrowDown":
                moveTiles("down");
                break;
            case "ArrowRight":
                moveTiles("right");
                break;
            case "ArrowLeft":
                moveTiles("left");
                break;
        }
        
        addRandomTile(); // Добавляем новый тайл после каждого хода
        render(); // Перерисовываем поле
        checkWin(); // Проверяем условие победы
        checkGameOver(); // Проверяем условие поражения
    });
    // Запуск создания игрового поля
    restartBtn.addEventListener('click', ()=> {
        createGameBoard();
    });
});
