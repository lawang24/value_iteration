export function createLegend() {
    // Outer wrapper
    const legend = document.createElement('div');
    legend.className = 'legend';
    legend.style.width = '200px'
  
    // +10 reward
    const item1 = document.createElement('div');
    const sw1  = document.createElement('span');
    sw1.className = 'swatch';
    sw1.style.background = 'darkgreen';
    item1.append(sw1, document.createTextNode('+10 reward'));
    legend.appendChild(item1);
  
    // +5 reward
    const item2 = document.createElement('div');
    const sw2  = document.createElement('span');
    sw2.className = 'swatch';
    sw2.style.background = 'lightgreen';
    const text  = document.createElement('span');
    text.textContent = '+5 reward'
    item2.append(sw2, text);
    legend.appendChild(item2);
  
    // –5 reward
    const item3 = document.createElement('div');
    const sw3  = document.createElement('span');
    sw3.className = 'swatch';
    sw3.style.background = 'pink';
    item3.append(sw3, document.createTextNode('–5 reward'));
    legend.appendChild(item3);
  
    // –10 reward
    const item4 = document.createElement('div');
    const sw4  = document.createElement('span');
    sw4.className = 'swatch';
    sw4.style.background = 'darkred';
    item4.append(sw4, document.createTextNode('–10 reward'));
    legend.appendChild(item4);
  
    // default
    const item5 = document.createElement('div');
    const sw5  = document.createElement('span');
    sw5.className = 'swatch';
    sw5.style.background = 'aliceblue';
    item5.append(sw5, document.createTextNode('default'));
    legend.appendChild(item5);

    return legend
  
    // Attach to your container
  }