let w = 11; // plotting
let h = 18; // plotting
let p = 70; // padding
let size = 40;
let defaultLine = 0.8;

//values for box 1
let espressobox1;
let boxtitle1;
let minEx1;
let maxEx1;
let minTds1;
let maxTds1;

//values for box 2
let espressobox2;
let boxtitle2;
let minEx2;
let maxEx2;
let minTds2;
let maxTds2;

//values for box 3
let espressobox3;
let boxtitle3;
let minEx3;
let maxEx3;
let minTds3;
let maxTds3;

let refresh = () => {
  //values for box 1
   espressobox1 = document.getElementById('espressobox1').checked;
   boxtitle1 = document.getElementById('name1').value;
   minEx1 = document.getElementsByName('minextraction1')[0].value;
   maxEx1 = document.getElementsByName('maxextraction1')[0].value;
   minTds1 = document.getElementsByName('mintds1')[0].value;
   maxTds1 = document.getElementsByName('maxtds1')[0].value;

  //values for box 2
   espressobox2 = document.getElementById('espressobox2').checked;
   boxtitle2 = document.getElementById('name2').value;
   minEx2 = document.getElementsByName('minextraction2')[0].value;
   maxEx2 = document.getElementsByName('maxextraction2')[0].value;
   minTds2 = document.getElementsByName('mintds2')[0].value;
   maxTds2 = document.getElementsByName('maxtds2')[0].value;

  //values for box 3
   espressobox3 = document.getElementById('espressobox3').checked;
   boxtitle3 = document.getElementById('name3').value;
   minEx3 = document.getElementsByName('minextraction3')[0].value;
   maxEx3 = document.getElementsByName('maxextraction3')[0].value;
   minTds3 = document.getElementsByName('mintds3')[0].value;
   maxTds3 = document.getElementsByName('maxtds3')[0].value;
};

// convert the extraction [%] value into position on the grid
let locateExt = (pp = 20) => {
  return (pp - 14) * size + p;
};
// convert the TDS [%] value into position on the grid
let locateTds = (pp = 8) => {
  return (20 - pp) * size + p;
};

let canvas = document.getElementById('canvas');
canvas.height = 2 * (h * size + 2 * p);
canvas.width = 2 * (w * size + 2 * p);
let context = canvas.getContext('2d');
context.scale(2, 2);

let brewFormula = () => {
  //plot ebf
  for (let i = 0; i < ebf.length; i++) {
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
  refresh();



  let img = new Image();
  img.onload = function() {


    context.scale(0.09, 0.09);

    context.drawImage(img, 10* p + size * w * 9, size*w*18.65 );

  }
  img.src="stains.svg";

  context.lineWidth = defaultLine;
  canvas.textAlign = 'center';
  box1title1 = document.getElementById('name1').value;
  espressobox1 = document.getElementById('espressobox1').checked;
  minEx1 = document.getElementsByName('minextraction1')[0].value;
  maxEx1 = document.getElementsByName('maxextraction1')[0].value;
  minTds1 = document.getElementsByName('mintds1')[0].value;
  maxTds1 = document.getElementsByName('maxtds1')[0].value;



  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '8pt Helvetica';
  context.beginPath();
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  context.fillText('[%TDS]', 0.5 * p, p - 22);
  let txt = 'Extraction [%]';
  context.fillText(txt, size * w / 2 + p - context.measureText(txt).width / 2,
    (h + 1) * size + p + 10);
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


  if (document.getElementById("espressobox1").checked) {
    espressoBox(boxtitle1, minEx1, maxEx1, minTds1, maxTds1, "olivedrab");
  }
  if (document.getElementById("espressobox2").checked) {
    espressoBox(boxtitle2, minEx2, maxEx2, minTds2, maxTds2, "orange");
  }
  if (document.getElementById("espressobox3").checked) {
    espressoBox(boxtitle3, minEx3, maxEx3, minTds3, maxTds3, "skyblue");
  }



  if (document.getElementById("ebfcheck").checked) {
    brewFormula();
  }



};

let espressoBox = (txt, minEx, maxEx, minTds, maxTds, color) => {

  context.beginPath();
  context.globalAlpha = 0.8;
  context.fillStyle = color; // Espresso
  context.strokeStyle = color;
  context.globalAlpha = 0.7;
  context.lineWidth = 3;
  context.strokeRect(locateExt(minEx), locateTds(minTds),
    locateExt(maxEx) - locateExt(minEx),
    locateTds(maxTds) - locateTds(minTds));
context.globalAlpha = 0.3;
   context.fillRect(locateExt(minEx), locateTds(minTds),
     locateExt(maxEx) - locateExt(minEx),
     locateTds(maxTds) - locateTds(minTds));
context.globalAlpha = 1;
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.strokeRect(locateExt(minEx), locateTds(minTds),
    locateExt(maxEx) - locateExt(minEx),
    locateTds(maxTds) - locateTds(minTds));
  let textWidth = context.measureText(txt).width;
  let boxWidth = locateExt(maxEx) - locateExt(minEx);


  let i = 20; // Default Font size

  context.font = `${i}pt Helvetica`;

  do {
    textWidth = context.measureText(txt).width;
    boxWidth = locateExt(maxEx) - locateExt(minEx);
    context.font = `${i}pt Helvetica`;
    i -= 0.5;
  }

  while (textWidth > boxWidth);

  let xMiddle = ((locateExt(maxEx) + locateExt(minEx)) / 2) - (context.measureText(txt).width) / 2;
  let yMiddle = ((locateTds(maxTds) + locateTds(minTds)) / 2 + 8);


  context.fillText(txt, xMiddle, yMiddle);
  context.lineWidth = 0.9;
  context.strokeText(txt, xMiddle, yMiddle);
  context.closePath();
  context.lineWidth = defaultLine;
  context.fillStyle = 'black';
  context.globalAlpha = 1;
}

drawBoard();

// add event listeners to react to input

let fields = document.getElementsByClassName('field');
for (let x = 0; x < fields.length; x++) {
  fields[x].addEventListener('focusout', drawBoard);
}

let checkboxes = document.getElementsByClassName('checkbox');
for (let x = 0; x < checkboxes.length; x++) {
  checkboxes[x].addEventListener('input', drawBoard);
}
