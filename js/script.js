let pieces
let gameActive = true
let piecesOrder = [];
for (let i = 1; i < 3 * 3; i++) {
    piecesOrder.push(i);
}
console.log(piecesOrder)

// Appel de la fonction pour créer le puzzle avec une image spécifique et une grille 3x3
createPuzzlePieces('images/heart.jpg', 3, 3);

document.addEventListener('keydown', (e) => 
    {
        if(gameActive){
            switch (e.key) {
                case 'ArrowUp':
                    moveManagerPiece(-3); // Déplacement vers le haut
                    checkForWin()
                    break;
                case 'ArrowDown':
                    moveManagerPiece(3); // Déplacement vers le bas
                    checkForWin()
                    break;
                case 'ArrowLeft':
                    moveManagerPiece(-1);
                    checkForWin() // Déplacement vers la gauche
                    break;
                case 'ArrowRight':
                    moveManagerPiece(1);
                    checkForWin() // Déplacement vers la droite
                    break;
            }
        }
    }
);

// Fonction pour mélanger les pièces du puzzle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Fonction pour diviser l'image en pièces
function createPuzzlePieces(imagePath, rows, columns) {
    const puzzleContainer = document.getElementById('puzzle-container');
    pieces = [];

    for (let i = 0; i < rows * columns; i++) {
        const piece = document.createElement('div');
        
        if(i == 8){
            piece.className = 'puzzle-piece-manager';
            piece.id = "manager"
            piece.style.backgroundColor = 'gray';
        }else{
            piece.id = i + 1 ;
            piece.className = 'puzzle-piece';
            piece.style.backgroundImage = `url(${imagePath})`;
            piece.style.backgroundPosition =  `-${(i % columns) * 100}px -${Math.floor(i / rows) * 100}px`;
        }
        
        
        piece.addEventListener('click', (e) => {

            // Implementez l'interaction utilisateur ici (par exemple, échanger des pièces)
            console.log(`Piece ${i + 1} clicked`);
        });
        
        pieces.push(piece);
    }

    shuffleArray(pieces); // Mélangez les pièces
    pieces.forEach(piece => {
        
        puzzleContainer.appendChild(piece);
    });
}


//Diriger la la forme principal
function moveManagerPiece(columns) {
    const managerPieceIndex = pieces.findIndex(piece => piece.id === 'manager');
    console.log(managerPieceIndex)
    // Vérifiez si le mouvement est valide
    const targetIndex = managerPieceIndex + columns;
    if (targetIndex >= 0 && targetIndex < pieces.length) {
        // Échangez les positions des pièces
        [pieces[managerPieceIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[managerPieceIndex]];

        // Mettez à jour l'affichage
        updatePuzzleDisplay();
    }else{
        console.log("not valid")
    }
}

// Fonction pour mettre à jour l'affichage du puzzle
function updatePuzzleDisplay() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = ''; // Effacez le contenu actuel
    
    pieces.forEach(piece => {
        console.log(piece.id)
        puzzleContainer.appendChild(piece);
    });
}

function checkForWin() {
    
    const currentOrder = pieces.map(piece => {
        const id = parseInt(piece.id);
        return Number.isInteger(id) ? id : null; // Assurez-vous que l'id est un nombre entier
    }).filter(id => id !== null); 
    
    // Comparez la disposition actuelle avec la disposition correcte
    if (arraysAreEqual(currentOrder, piecesOrder)) {
        console.log('Félicitations, vous avez gagné !');
        gameActive =false;
        // Ajoutez ici le code à exécuter lorsque le joueur gagne
    }else{
        console.log("Le tableau n'est pas complet ", currentOrder)

    }
}

// Fonction pour vérifier si deux tableaux sont égaux
function arraysAreEqual(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
}