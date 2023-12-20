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
    grid.forEach((cell, index) => {
        if (cell === selectedCell) {
            row = Math.floor(index / 9);
            col = index % 9;
        }
    });

    if (this.esNumeroValido(row, col, number)) {
        selectedCell.textContent = number;
        selectedCell.dataset.state = 'correct';
        selectedCell.removeEventListener('click', this.handleCellClick);

        if (this.sudokuCompleto()) {
            alert('¡Sudoku completado!');
        }
    }
  }

  esNumeroValidoEnFila(row, number) {
    for (let i = 0; i < this.columns; i++) {
        if (this.board[row][i] === number) {
            return false;
        }
    }
    return true;
}

esNumeroValidoEnColumna(col, number) {
    for (let i = 0; i < this.rows; i++) {
        if (this.board[i][col] === number) {
            return false;
        }
    }
    return true;
}

esNumeroValidoEnRegion(startRow, startCol, number) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.board[i + startRow][j + startCol] === number) {
                return false;
            }
        }
    }
    return true;
}

esNumeroValido(row, col, number) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    return (
        this.esNumeroValidoEnFila(this.board, row, number) &&
        this.esNumeroValidoEnColumna(this.board, col, number) &&
        this.esNumeroValidoEnRegion(this.board, startRow, startCol, number)
    );
}
  


  sudokuCompleto(){
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      
      for (let j = 0; j < 9; j++) {
          const rowValue = this.board[i][j];
          const colValue = this.board[j][i];
          
          if (rowValue === 0 || colValue === 0) {
              return false; 
          }
          
          rowSet.add(rowValue);
          colSet.add(colValue);
      }
      
      if (rowSet.size !== 9 || colSet.size !== 9) {
          return false; 
      }
    }

    // Verificar regiones 3x3
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const regionSet = new Set();
            
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    const value = this.board[i][j];
                    
                    if (value === 0) {
                        return false; // Si hay algún valor vacío, el Sudoku no está completo
                    }
                    
                    regionSet.add(value);
                }
            }
            
            if (regionSet.size !== 9) {
                return false; // Si hay valores repetidos en una región, no es válido
            }
        }
    }

    return true; // Si todo está bien, el Sudoku está completo y correcto
  }


}
  
  

