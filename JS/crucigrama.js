class Crucigrama {

    constructor() {
        this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"; 
        this.numColumns = 9; 
        this.numRows = 11; 
        this.init_time = undefined; 
        this.end_time = undefined; 
        this.boardArray = []; 
        this.selectedCell = null;
        this.inicializarTablero();
        this.start();
    }

    inicializarTablero() {
        let boardString = this.board.split(',');

        let index = 0;
        for (let i = 0; i < this.numRows; i++) {
            this.boardArray[i] = [];
            for (let j = 0; j < this.numColumns; j++) {
                this.boardArray[i][j] = boardString[index];
                index++;
            }
        }
    }

    start() {
        let index = 0;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numColumns; j++) {
                const cellValue = this.boardArray[i][j];
                if (!isNaN(parseInt(cellValue))) {
                    this.boardArray[i][j] = parseInt(cellValue);
                } else if (cellValue == '.') {
                    this.boardArray[i][j] = 0; 
                } else if (cellValue === '#') {
                    this.boardArray[i][j] = -1;
                } 
                index++;
            }
        }
    }

    paintMathword() {
        const main = $('main');
        let index = 0;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numColumns; j++) {
                const cellValue = this.boardArray[i][j];
                const parrafo = $('<p>');
                if (cellValue === 0) {
                    parrafo.click(function(event) {
                        parrafo.attr('data-state', 'clicked');
                        this.selectedCell = event.target;
                    });
                } else if (cellValue === -1) {
                    parrafo.attr('data-state', 'empty');
                } else {
                    parrafo.text(cellValue).attr('data-state', 'blocked');
                }
                main.append(parrafo);
                index++;
            }
        }
        this.init_time = new Date(); 
    }

    check_win_condition() {
        
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numColumns; j++) {
                if (this.boardArray[i][j] === 0) {
                    return false;
                }
            }
        }
        this.end_time = new Date();
        return true;
    }

    calculate_date_difference() {
        
        const difference = this.end_time - this.init_time;
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        return `${hours.toString()}:${minutes.toString()}:${seconds.toString()}`;

    }

    introduceElement(value) {
        const selectedCell = document.querySelector('p[data-state="clicked"]');
        const grid = document.querySelectorAll('p');
        if (!selectedCell) {
            return; // No hay celda seleccionada
        }

        //const index = Array.from(grid).indexOf(this.selectedCell);
       // const rowIndex = Math.floor(index / this.numColumns);
       // const colIndex = index % this.numColumns;


        let rowIndex, colIndex;
    
        for (let i = 0; i < grid.length; i++) {
          if (grid[i].getAttribute('data-state') === 'clicked') {
            let pos = i;
            rowIndex = Math.floor(pos / 9); 
            colIndex = pos % 9; 
          }
        } 

        // Comprobar si hay una celda seleccionada y si el valor es válido para la casilla seleccionada
        //if (selectedCell && isNumericOrOperator) {
            let expression_row = true;
            let expression_col = true;

            // Asignar el valor a la posición correspondiente del array del crucigrama
            this.boardArray[rowIndex][colIndex] = value;

            // Verificar la vertiente horizontal de la expresión
            // Comprobar hacia la derecha
            let i = colIndex + 1;
            while (i < this.numColumns && this.boardArray[rowIndex][i] !== '=') {
                if (this.boardArray[rowIndex][i] === -1) {
                    expression_row = false;
                    break;
                }
                i++;
            }

            // Realizar la evaluación horizontal de la expresión
            if (expression_row) {
                if (i < this.numColumns) {
                    const first_number = this.boardArray[rowIndex][i - 3];
                    const expression = this.boardArray[rowIndex][i - 2];
                    const second_number = this.boardArray[rowIndex][i - 1];
                    const result = this.boardArray[rowIndex][i + 1];
                    
                    // Validar expresión horizontalmente
                    const expr = [first_number, expression, second_number].join('');
                    if (eval(expr) !== result) {
                        expression_row = false;
                    }
                }
            }

            // Verificar la vertiente vertical de la expresión
            // Comprobar hacia abajo
            let j = rowIndex + 1;
            while (j < this.numRows && this.boardArray[j][colIndex] !== '=') {
                if (this.boardArray[j][colIndex] === -1) {
                    expression_col = false;
                    break;
                }
                j++;
            }

            // Realizar la evaluación vertical de la expresión
            if (expression_col) {
                if (j < this.numRows) {
                    const first_number = this.boardArray[j - 3][colIndex];
                    const expression = this.boardArray[j - 2][colIndex];
                    const second_number = this.boardArray[j - 1][colIndex];
                    const result = this.boardArray[j + 1][colIndex];
                    
                    // Validar expresión verticalmente
                    const expr = [first_number, expression, second_number].join('');
                    if (eval(expr) !== result) {
                        expression_col = false;
                    }
                }
            }

            // Si las comprobaciones son correctas, modificar la celda y su atributo data-state
            if (expression_row || expression_col) {
                selectedCell.textContent = value;
                selectedCell.dataset.state = 'correct';
                selectedCell.removeEventListener('click', this.selectedCell);
            } else {
                // Si hay un error, mostrar una alerta y revertir los cambios
                //this.selectedCell.text(0).attr('data-state', ''); 
                selectedCell.textContent = "";
                this.selectedCell = null;
            }

            // Comprobar si el crucigrama está completo
            if (this.check_win_condition()) {
                this.init_time = new Date(); // Inicializar init_time al valor de la fecha actual
                const timeTaken = this.calculate_date_difference(); // Calcular tiempo invertido
                alert(`¡Has completado el crucigrama en ${timeTaken}!`);
            }
        //}
    }
}
const crucigrama = new Crucigrama();