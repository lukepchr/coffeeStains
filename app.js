let w = 11; // plotting
let h = 18; // plotting
let p = 70; // padding
let size = 40;
let defaultLine = 0.8;
let box1title = document.getElementById('name').value;
let espressobox = document.getElementById('espressobox').checked;
let minEx = document.getElementsByName('minextraction')[0].value;
let maxEx = document.getElementsByName('maxextraction')[0].value;
let minTds = document.getElementsByName('mintds')[0].value;
let maxTds = document.getElementsByName('maxtds')[0].value;

// convert the extraction [%] value into position on the grid
let locateExt = (pp = 20) => {return (pp - 14) * size + p;};
// convert the TDS [%] value into position on the grid
let locateTds = (pp = 8) => {return (20 - pp) * size + p;};

var canvas = document.getElementById('canvas');
canvas.height = 2 * (h * size + 2 * p);
canvas.width = 2 * (w * size + 2 * p);


var context = canvas.getContext('2d');
context.scale(2,2);



let brewFormula = () => {
  //plot ebf
  for (let i = 0; i < ebf.length; i++)
  {
    context.beginPath();
    context.moveTo(p, locateTds(ebf[i][0]));
    col = `hsl(${80 + i / ebf.length * 280}, 100%, 50%)`;
    context.strokeStyle = col;
    context.fillStyle = col;
    context.lineTo(w * size + p, locateTds(ebf[i][1]));
    context.font = '9pt Helvetica';
    context.fillText(`EBF ${ebf[i][2]}%`, 1.1 * p + w * size, locateTds(ebf[i][1]) + 3);
    context.lineWidth = 0.7;
    context.stroke();
    context.closePath();
  }
};

let drawBoard = () => {




  context.lineWidth = defaultLine;
  canvas.textAlign = 'center';
   box1title = document.getElementById('name').value;
   espressobox = document.getElementById('espressobox').checked;
   minEx = document.getElementsByName('minextraction')[0].value;
   maxEx = document.getElementsByName('maxextraction')[0].value;
   minTds = document.getElementsByName('mintds')[0].value;
   maxTds = document.getElementsByName('maxtds')[0].value;

  if (minEx < 14) {
    minEx = 14;
    document.getElementsByName('minextraction')[0].value = minEx;
    if (minEx == maxEx) {
      document.getElementsByName('maxextraction')[0].value = ++maxEx;
    }
  }

  if (minEx > 25) {
    minEx = 25;

    if (minEx == maxEx) {
      minEx--;
    }
    document.getElementsByName('minextraction')[0].value = minEx;
  }

  if (maxEx < 14) {
    maxEx = 15;
    document.getElementsByName('maxextraction')[0].value = maxEx;
    if (minEx == maxEx) {
      document.getElementsByName('minextraction')[0].value = --minEx;
    }
  }

  if (maxEx > 25) {
    maxEx = 25;
    document.getElementsByName('maxextraction')[0].value = maxEx;
    if (minEx == maxEx) {
      document.getElementsByName('minextraction')[0].value = --minEx;
    }
  }

  if (minTds < 2) {
    minTds = 2;
    document.getElementsByName('mintds')[0].value = minTds;
    if (minTds == maxTds) {
      document.getElementsByName('maxtds')[0].value = ++maxTds;
    }
  }

  if (minTds > 20) {
    minTds = 19;
    document.getElementsByName('mintds')[0].value = minTds;
    if (minTds == maxTds) {
      document.getElementsByName('maxtds')[0].value = ++maxTds;
    }
  }

  if (maxTds < 2) {
    maxTds = 3;
    document.getElementsByName('maxtds')[0].value = maxTds;
    if (minTds == maxTds){
      document.getElementsByName('mintds')[0].value = --minTds;
    }
  }

  if (maxTds > 20) {
    maxTds = 20;
    document.getElementsByName('maxtds')[0].value = maxTds;
    if (minTds == maxTds) {
      document.getElementsByName('mintds')[0].value = --minTds;
    }
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '8pt Helvetica';
  context.beginPath();
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  context.fillText('[%TDS]', 0.5 * p, p - 22);
  context.fillText('Extraction [%]', size * w / 2 + 10, (h + 1) * size + p + 10);
  context.closePath();



  // plot the horizontal lines
  for (let x = 0; x <= w; x++) {

    context.beginPath();
    context.moveTo(x * size + p, p);

    context.font = '12pt Helvetica';

    // add Extraction %s
    context.fillText(14 + x, x * size + p - 7.5, h * (size + 1.5) + p);

    context.lineTo(x * size + p, h * size + p + 10);
    context.stroke();
    context.closePath();
  }

  // plot the verical lines.
  context.font = '12pt Helvetica';
  for (let y = 0; y <= h; y++) {
    context.beginPath();
    context.moveTo(p - 10, y * size + p);
    context.fillText(20 - y, p - 30, p + y * size + 6);
    context.lineTo(w * size + p, y * size + p);
    context.stroke();
    context.closePath();
  }


  if (document.getElementById("espressobox").checked){
    espressoBox();
  }

  if (document.getElementById("ebfcheck").checked) {
    brewFormula();
  }



};

let espressoBox = () => {
    context.globalAlpha = 0.7;
    context.beginPath();
    context.fillStyle = 'orange'; // Espresso
    context.lineStyle= 'orange';
    context.lineWidth = 1;
    context.strokeRect(locateExt(minEx)  , locateTds(minTds) ,
      locateExt(maxEx) - locateExt(minEx) ,
      locateTds(maxTds) - locateTds(minTds) );
    context.fillRect(locateExt(minEx), locateTds(minTds),
      locateExt(maxEx) - locateExt(minEx),
      locateTds(maxTds) - locateTds(minTds));

      let textWidth = context.measureText(txt).width;
      let boxWidth = locateExt(maxEx) - locateExt(minEx);
        var txt = box1title;
        context.font = '20pt Helvetica';

let i = 20;

do{
    textWidth = context.measureText(txt).width;
    boxWidth = locateExt(maxEx) - locateExt(minEx);
    context.font = `${i}pt Helvetica`;
    i-=0.5
}
while(textWidth > boxWidth);

let xMiddle = ((locateExt(maxEx) + locateExt(minEx))/2) - (context.measureText(txt).width)/2;
let yMiddle = ((locateTds(maxTds) + locateTds(minTds))/2 + 8);

    context.strokeText(txt, xMiddle, yMiddle);

    context.closePath();
    context.lineWidth = defaultLine;
    context.fillStyle = 'black';
    context.globalAlpha = 1;
  }

drawBoard();

let fields = document.getElementsByClassName('field');
for (let x = 0; x < fields.length; x++) {
  fields[x].addEventListener('focusout', drawBoard);
}

let checkboxes = document.getElementsByClassName('checkbox');
for (let x = 0; x < checkboxes.length; x++) {
  checkboxes[x].addEventListener('input', drawBoard);
}
