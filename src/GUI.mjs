import { VIcore } from "./value_iteration_engine.mjs";

 const core = new VIcore();
 let brightness = 1.0, fontSize = 14, sq = 50;
 const gridEl = document.getElementById('grid');
    
 // utility to apply CSS vars
 function updateCssVars() {
   document.documentElement.style.setProperty('--sq', sq+'px');
   document.documentElement.style.setProperty('--font-size', fontSize+'px');
 }

 // initial reset
 core.doreset(0.0);
 updateCssVars();
 drawGridInstant();

 // draw instantly (no animation)
 function drawGridInstant(){
   document.querySelectorAll('.cell').forEach(cell=>{
     const x = +cell.dataset.x, y = +cell.dataset.y;
     const v = core.values[x][y];
     const color = v>=0
       ? `rgb(0,${Math.min(255,Math.pow(v/10,brightness)*255)|0},0)`
       : `rgb(${Math.min(255,Math.pow(-v/10,brightness)*255)|0},0,0)`;
     cell.style.backgroundColor = color;
     const best = core.qvalues[x][y]
       .indexOf(Math.max(...core.qvalues[x][y]));
     cell.querySelector('.arrow')
       .style.transform = `rotate(${best*90}deg)`;
     cell.querySelector('.value')
       .textContent = v.toFixed(2);
   });
 }

 // animate to new grid
 function animateStep(){
   const d = parseFloat(discountField.value) || core.discount;
   core.dostep(d);

   // prepare next styles
   document.querySelectorAll('.cell').forEach(cell=>{
     const x = +cell.dataset.x, y = +cell.dataset.y;
     const v = core.values[x][y];
     cell.nextColor = v>=0
       ? `rgb(0,${Math.min(255,Math.pow(v/10,brightness)*255)|0},0)`
       : `rgb(${Math.min(255,Math.pow(-v/10,brightness)*255)|0},0,0)`;
     const best = core.qvalues[x][y]
       .indexOf(Math.max(...core.qvalues[x][y]));
     cell.nextRot = best*90;
     cell.nextVal = v.toFixed(2);
   });

   anime({
     targets: '.cell',
     backgroundColor: el => el.nextColor,
     duration: 600,
     easing: 'easeInOutQuad',
     complete: () => {
       // after anim, update arrows + text
       document.querySelectorAll('.cell').forEach(cell=>{
         cell.querySelector('.arrow')
             .style.transform = `rotate(${cell.nextRot}deg)`;
         cell.querySelector('.value')
             .textContent = cell.nextVal;
       });
     }
   });
 }

 // --- Wire up controls ---
 document.getElementById('stepBtn').onclick = animateStep;
 document.getElementById('resetBtn').onclick = () => {
   core.doreset(parseFloat(initValField.value) || 0.0);
   drawGridInstant();
 };
 const discountField = document.getElementById('discountField');
 document.getElementById('discDec').onclick = () => {
   discountField.value = (parseFloat(discountField.value) - 0.1).toFixed(2);
 };
 document.getElementById('discInc').onclick = () => {
   discountField.value = (parseFloat(discountField.value) + 0.1).toFixed(2);
 };
 document.getElementById('absorbingBox').onchange = e => {
   core.absorbing = e.target.checked;
 };
 document.getElementById('brightDec').onclick = () => { brightness*=1.1; };
 document.getElementById('brightReset').onclick = () => { brightness=1.0; };
 document.getElementById('brightInc').onclick = () => { brightness/=1.1; };
 document.getElementById('fontDec').onclick = () => { fontSize=Math.max(8, fontSize-1); updateCssVars(); };
 document.getElementById('fontInc').onclick = () => { fontSize++; updateCssVars(); };
 document.getElementById('sizeDec').onclick = () => { sq=Math.max(20, sq-5); updateCssVars(); };
 document.getElementById('sizeInc').onclick = () => { sq+=5; updateCssVars(); };
</script>