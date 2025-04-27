/*
  Example Usage:
  const gridEl = document.getElementById('grid');  // your container
  const grid = new Grid(10, 10, gridEl);
  grid.init();
  grid.render();
  
  // Later, to update cell (2,3):
  grid.updateCell(2, 3, { arrow: '►', value: '42' });
*/

import { Cell } from "./cell.mjs";

export class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
      
        this.reference = document.createElement('div');
        this.reference.style.display = 'inline-grid';
        this.reference.style.gridTemplateColumns = `repeat(${cols}, auto)`;   // <-- key
        this.reference.style.gridTemplateRows = `repeat(${rows}, auto)`;       // <-- key
        this.reference.style.gap = '3px';                                       // optional, spacing between cells
      }
  
    init() {
        for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
            const cell = new Cell(x, y);
            this.cells.push(cell);
            this.reference.appendChild(cell.reference);  // <-- append each cell's DOM element

            if (x === 8 && y === 7)  // +10
               cell.reference.style.border = '3px solid darkgreen';
            else if (x === 7 && y === 2) // +5
              cell.reference.style.border = '3px solid lightgreen';
            else if (x === 3 && y === 4) // -5
              cell.reference.style.border = '3px solid pink';
            else if (x === 3 && y === 7) // -10
              cell.reference.style.border = '3px solid darkred';
            else 
              cell.reference.style.border = '3px solid aliceblue';
          }
        }
      }
  
    render() {
      this.cells.forEach(cell => cell.render());
    }
  
    // example helper to update a specific cell
    updateCell(x, y, arrowDir, value ) {
      const idx = y * this.cols + x;
      const cell = this.cells[idx];
      cell.update(arrowDir, value)
    }
  }
  