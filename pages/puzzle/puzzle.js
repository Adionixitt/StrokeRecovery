import getTranslation from "../../scripts/internalization.js";
import Popup from "../../scripts/popup.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const restartBtn = document.getElementById('restart-btn');
    const puzzlePreviewImg = document.getElementById('puzzle-preview');
    const puzzleContainer = document.getElementById('puzzle-container');
    const numberOfPuzzles = 13;
    let puzzleID;
    let puzzlePiecesPerSide = 4;
    let puzzlePieces = [];
    let selectedPiece = null;

    function getNewPuzzleID(){
        puzzleID = Math.floor(Math.random()*numberOfPuzzles+1);
        return puzzleID;
    }

    function splitImage(url, n) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
    
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);
    
                const parts = [];
                const partWidth = img.width / n;
                const partHeight = img.height / n;
    
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        const startX = j * partWidth;
                        const startY = i * partHeight;
                        const data = ctx.getImageData(startX, startY, partWidth, partHeight);
                        parts.push(data);
                    }
                }
    
                resolve(parts);
            };
    
            img.onerror = function() {
                reject(new Error('Failed to load the image'));
            };
    
            img.src = url;
        });
    }

    function shufflePieces(pieces = []){
        let piecesCopy = pieces.slice();
        let shuffledPieces = [];
        for (let i = 0; i < pieces.length; i++) {
            const randomIndex = Math.floor(Math.random() * piecesCopy.length);
            const piece = piecesCopy.splice(randomIndex, 1)[0];
            shuffledPieces.push(piece);
        }
        return shuffledPieces;
    }


    function getImageUrlFromImageData(imageData) {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }
    function restart(){
        puzzlePiecesPerSide = Math.floor(Math.random() * (10 - 2 + 1) + 2);
        puzzleContainer.style.gridTemplateColumns = 'repeat('+puzzlePiecesPerSide+', '+(640/puzzlePiecesPerSide)+'px)';
        puzzleContainer.style.gridTemplateRows = 'repeat('+puzzlePiecesPerSide+', '+(640/puzzlePiecesPerSide)+'px)';
        puzzleContainer.classList.remove('disabled');
        puzzlePreviewImg.src = './src/img' + getNewPuzzleID() + '.jpg';
        puzzlePieces = [];
        
        splitImage(puzzlePreviewImg.src, puzzlePiecesPerSide)
            .then(parts => {
                puzzleContainer.innerHTML = ''; // Clear the container before adding puzzle pieces

                parts.forEach((part, index) => {
                    let pieceId = `piece_${index}`; // Unique id for puzzle piece
                    puzzlePieces.push({
                        id: pieceId,
                        imageUrl: getImageUrlFromImageData(part)
                    });
                });

                puzzlePieces = shufflePieces(puzzlePieces); // Shuffle the puzzle pieces

                puzzlePieces.forEach((piece, index) => {
                    let pieceImg = document.createElement('img');
                    pieceImg.classList.add('puzzle-piece');
                    pieceImg.dataset.pieceId = piece.id; // Set piece id as a data attribute
                    pieceImg.src = piece.imageUrl;
                    puzzleContainer.appendChild(pieceImg);
                    pieceImg.addEventListener('click', ()=>{
                        selectPiece(piece);
                    });
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    restart();
    restartBtn.addEventListener('click', () => {
        restart();
    });

    const correctOrder = Array.from(puzzlePieces).map(piece => piece.dataset.order);
    let currentOrder = [];
    
    // ... код для обработки кликов по пазлам, замены их местами
    
    function checkPuzzleCompletion() {
        let puzzleComplete = true;
        let allPieces = document.querySelectorAll('.puzzle-piece');
        let currOrderID = 0;
        allPieces.forEach(puzzlePiece => {
            if(puzzlePiece.getAttribute('data-piece-id') == "piece_"+currOrderID){
                currOrderID++;
            } else {
                puzzleComplete = false;
            }
        });
        if(puzzleComplete){
            puzzleContainer.classList.add('disabled');
            const popup = new Popup({
                title: getTranslation("puzzle-win-popup-title"),
                contents: getTranslation("puzzle-win-popup-text"),
                icon: "trophy"
            });
            popup.Show();
        }
    }

    document.addEventListener('click', function(event) {
        const piece = event.target;

        if (!piece.classList.contains('puzzle-piece')) {
            return; // если кликнули не на пазл, игнорируем
        }

        if (!selectedPiece) {
            selectedPiece = piece;
            piece.classList.add('selected');
        } else if(selectedPiece == piece){
            piece.classList.remove('selected');
            selectedPiece = undefined;
        } else if (selectedPiece !== piece) {
            piece.classList.remove('selected');
            selectedPiece.classList.remove('selected');
            // Меняем местами элементы внутри их общего родителя (контейнера)
            const container = selectedPiece.parentElement;

            selectedPiece.replaceWith(piece.cloneNode(true));
            piece.replaceWith(selectedPiece.cloneNode(true));

            selectedPiece = null;
        }
        checkPuzzleCompletion(); // Проверка после каждого действия
    });

    
});