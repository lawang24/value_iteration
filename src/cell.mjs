export class Cell {

    constructor() {
        // internal state
        this.value = 0;
        this.arrow_degrees = 0;   // 0=up, 1=right, 2=down, 3=left
        this.color = '#000';
    
        const cell = document.createElement('div');
        this.reference = cell;
        cell.className = 'cell';
        
        // CSS Flexbox layout for centering
        cell.style.display = 'flex';
        cell.style.flexDirection = 'column';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.border = '1px solid #ccc'; 
        cell.style.width = '50px';  // optional, can set from outside too
        cell.style.height = '50px'; // optional
    
        // arrow sub-element
        this.arrowEl = document.createElement('div');
        this.arrowEl.className = 'arrow';
        this.arrowEl.textContent = '▲';  // default up arrow
        cell.appendChild(this.arrowEl);
    
        // value sub-element
        this.valueEl = document.createElement('div');
        this.valueEl.className = 'value';
        this.valueEl.textContent = this.value;  
        cell.appendChild(this.valueEl);
      }

    // update internal state 
    update(arrowDir, value) {
        this.arrowDir = arrowDir;
        this.value = value;
      }
  
    render(){
        // point arrow in right direction
        this.arrowEl.style.transform = `rotate(${this.arrowDir*90}deg)`;
        this.valueEl.textContent = Math.round(this.value * 100) / 100;
    }
    
}