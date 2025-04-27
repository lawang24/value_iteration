// controlPanel.js

export class ControlPanel {
    
    constructor(onStep, onReset, onDiscountChange, onAbsorbingToggle, onRunNSteps) {
      this.onStep = onStep;
      this.onReset = onReset;
      this.onDiscountChange = onDiscountChange;
      this.onAbsorbingToggle = onAbsorbingToggle;
      this.onRunNSteps = onRunNSteps
      this.fastForwardSteps = 1
      this.el = this._createElement();
      this.currentStep = 0
    }
  
    _createElement() {
      const container = document.createElement('div');
      container.className = 'control-panel';
      container.style.display = 'flex'
      container.style.gap = '20px'
  
      // Step button
      const stepBtn = document.createElement('button');
      stepBtn.textContent = 'Step';
      stepBtn.addEventListener('click', () => this.onStep());
      container.appendChild(stepBtn);
  
      // Reset button
      const resetBtn = document.createElement('button');
      resetBtn.textContent = 'Reset';
      resetBtn.addEventListener('click', () => this.onReset());
      container.appendChild(resetBtn);
  
      // Discount slider + display
      const discountLabel = document.createElement('label');
      discountLabel.textContent = 'Discount:';
      const discountInput = document.createElement('input');
      discountInput.type = 'range';
      discountInput.min = '0';
      discountInput.max = '1';
      discountInput.step = '0.01';
      discountInput.value = '1';
      discountInput.addEventListener('input', (e) => {
        const v = parseFloat(e.target.value);
        valueSpan.textContent = v.toFixed(2);
        this.onDiscountChange(v);
      });
      const valueSpan = document.createElement('span');
      valueSpan.textContent = discountInput.value;
      discountLabel.append(discountInput, valueSpan);
      container.appendChild(discountLabel);
  
      // Absorbing-state checkbox
      const absorbingLabel = document.createElement('label');
      const absorbingInput = document.createElement('input');
      absorbingInput.type = 'checkbox';
      absorbingInput.addEventListener('change', (e) =>
        this.onAbsorbingToggle(e.target.checked)
      );
      absorbingLabel.append(absorbingInput, document.createTextNode('Absorbing State'));
      container.appendChild(absorbingLabel);

       // — N Steps Input —
      const stepsLabel = document.createElement('label');
      stepsLabel.textContent = 'Steps:';
      const stepsInput = document.createElement('input');
      stepsInput.type  = 'number';
      stepsInput.min   = '1';
      stepsInput.value = this.fastForwardSteps;
      stepsInput.style.width = '4rem';
      stepsInput.addEventListener('input', e => {
        const v = parseInt(e.target.value) || 0;
        this.fastForwardSteps = v;
      });
      stepsLabel.appendChild(stepsInput);
      container.appendChild(stepsLabel);

      // — Run N Button —
      const runBtn = document.createElement('button');
      runBtn.textContent = `Run`;
      runBtn.addEventListener('click', () =>
        this.onRunNSteps(this.fastForwardSteps)
      );
      container.appendChild(runBtn);

      // Step Counter
      this.stepCounter = document.createElement('span');
      this.stepCounter.textContent = 'Step: 0';
      container.appendChild(this.stepCounter);

      return container;
    }
  
  }


  