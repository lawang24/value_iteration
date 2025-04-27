import { Grid } from "./grid.mjs";
import { VIcore } from "./value_iteration_engine.mjs";
import { ControlPanel } from "./controlPanel";
import { createLegend } from "./legend";

function EngineToGrid(engine, grid){
    for (let x = 0; x < engine.WIDTH; x++) {
        for (let y = 0; y < engine.HEIGHT; y++) {
            const value = engine.values[x][y]
            const arrowDir = engine.qvalues[x][y].indexOf(Math.max(...engine.qvalues[x][y]))
            grid.updateCell(x, y, arrowDir, value)
        }
    }
}

function onStep(){
    ValueIterationEngine.dostep()
    EngineToGrid(ValueIterationEngine, grid)
    grid.render()
    controlPanel.currentStep++;
    controlPanel.stepCounter.textContent = `Step: ${controlPanel.currentStep}`;
}

function onReset(){
    ValueIterationEngine.doreset(0)
    EngineToGrid(ValueIterationEngine, grid)
    grid.render()

    // stop existing runs
    steps_running = false

    // update panel
    controlPanel.currentStep = 0
    controlPanel.stepCounter.textContent = `Step: ${controlPanel.currentStep}`;
}

function onDiscountChange(new_discount){
    ValueIterationEngine.discount = new_discount
}

function onAbsorbingToggle(new_absorbing_state){
    ValueIterationEngine.absorbing = new_absorbing_state
}

async function onRunNSteps(n){
    steps_running = true
    for (let i = 0; i<n; i++){
        if (!steps_running)
            return
        onStep()
        await new Promise(r => setTimeout(r, 100));
    }
}

const title = document.createElement('h1')
title.textContent = 'Value Iteration'
document.getElementById('app').appendChild(title)

// setup grid
const grid = new Grid(10, 10)
grid.reference.style.position = 'relative'
grid.reference.style.marginBottom = '10px'
document.getElementById('app').appendChild(grid.reference)
grid.init()
const ValueIterationEngine = new VIcore()

let steps_running = false

// setup control panel
const controlPanel = new ControlPanel(onStep , onReset, onDiscountChange, onAbsorbingToggle, onRunNSteps)
document.getElementById('app').appendChild(controlPanel.el)
controlPanel.el.style.marginTop = '10px'

// setup legend
const legend = createLegend()
legend.style.position = 'absolute'
legend.style.left = 'calc(100% + 5rem)'
legend.style.top = '20%'

grid.reference.appendChild(legend)

// citation
const citation = document.createElement('p');
const link = document.createElement('a');
link.href = 'https://www.cs.ubc.ca/~poole/demos/mdp/vi.html';
link.textContent = 'Refactored Version of this Demo';
link.target = '_blank';  // Open in new tab
citation.appendChild(link);

document.getElementById('app').appendChild(citation);






