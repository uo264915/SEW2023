class Sudoku {


  constructor() {
    this.handleCellClick = null;
    this.boardString = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
    this.rows = 9;
    this.columns = 9;
    this.board = this.start();
  }

  start() {
    const tablero = [];
    let index = 0;

    for (let i = 0; i < this.rows; i++) {
      tablero[i] = [];
      for (let j = 0; j < this.columns; j++) {
        if (this.boardString[index] === '.') {
          tablero[i][j] = 0; // Valor 0 para celdas vacías
        } else {
          tablero[i][j] = parseInt(this.boardString[index]);
        }
        index++;
      }
    }
    return tablero;
  }

  createStructure() {
    const main = document.querySelector('main');
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const celda = document.createElement('p');
        if (this.board[i][j] === 0) {
          celda.dataset.state = 'clicked';
          celda.addEventListener('click', (event) => {
            celda.setAttribute('data-state', 'selected');
            this.handleCellClick = event.target;
        });
        } else {
          celda.textContent = this.board[i][j];
          celda.dataset.state = 'blocked';
        }
        main.appendChild(celda);
      }
    }
  }

  paintSudoku() {
    this.createStructure();
  }
  
  introduceNumber(number) {
    const selectedCell = document.querySelector('p[data-state="selected"]');
    const grid = document.querySelectorAll('p');
    if (!selectedCell) {
        return; // No hay celda seleccionada
    }


    
    let row, col;
    
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].getAttribute('data-state') === 'selected') {
        let pos = i;
        row = Math.floor(pos / 9); 
        col = pos % 9; 
      }
    } 

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (grid[i+j].getAttribute('data-state') === 'selected') {
          let pos = i+j;
          row = Math.floor(pos / 9); 
          col = pos % 9; 
        }
      }
    } 

    //comprobaciones
    for (let i = 0; i < this.columns; i++) {
      if (this.board[row][i] == number) {
        alert("Numero no valido");
        return;
      }
    }

    for (let i = 0; i < this.rows; i++) {
      if (this.board[i][col] == number) {
        alert("Numero no valido");
        return;
      }
    } 
    
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (this.board[i + startRow][j + startCol] == number) {
            alert("Numero no valido");
            return;
          }
      }
    }
    
    selectedCell.textContent = number;
    selectedCell.dataset.state = 'correct';
    selectedCell.removeEventListener('click', this.handleCellClick);

    for (let i = 0; i < grid.length; i++) {
      const textContent = grid[i].textContent.trim();
      if (!textContent || isNaN(textContent)) {
        return; 
      }
    }
    alert("Sudoku completo");
    return true; 
  }
  


}
  
  

