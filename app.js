let w = 11; // width in squares
let h = 18; // height in squares
let p = 70; // padding
let size = 40; // side of each square [px]
let defaultLine = 0.8; // line width for plotting

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

// ebf - coordinates for drawing EBF lines.
// [0] position on the left as "the height" of TDS
// [1] position on the right as the "height" of TDS
// [2] value of EBF to use as the little label [%]

let ebf = [
[3.7, 6.24, 25],
[4.5, 7.24, 30],
[5.4, 8.38, 35],
[6.25, 9.75, 40],
[6.95, 11.08, 45],
[7.66, 12.2, 50],
[8.35, 13.3, 55],
[9.15, 14.4, 60],
[10, 15.47, 65],
[10.7, 16.5, 70],
[11.4, 17.55, 75],
[12, 18.55, 80],
[12.8, 19.55, 85],
];

// for ratios, they use following format:
// starting point X, Y
// ending point X, Y,
// name
// all expressed in human units.

let realcanvas = document.getElementById('jpgcanvas');

let canvas = document.getElementById('canvas');
canvas.height = 2 * (h * size + 2 * p);
canvas.width = 2 * (w * size + 2 * p);
let context = canvas.getContext('2d');
context.scale(2, 2);

// convert the extraction [%] value into position on the grid

let locateExt = pp => (pp - 14) * size + p;

// convert the TDS [%] value into position on the grid

let locateTds = pp => (20 - pp) * size + p;

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

  context.lineWidth = defaultLine;
  canvas.textAlign = 'center';

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '10pt Helvetica';
  context.beginPath();
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  context.fillText('[%TDS]', 0.5 * p, p - 22);
  let txt = 'SOLUBLES YIELD - EXTRACTION [%]';
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

  validate();
  refresh();


  if (espressobox3) {
    espressoBox(boxtitle3, minEx3, maxEx3, minTds3, maxTds3, 'skyblue');
  }

  if (espressobox2) {
    espressoBox(boxtitle2, minEx2, maxEx2, minTds2, maxTds2, 'orange');
  }

  if (espressobox1) {
    espressoBox(boxtitle1, minEx1, maxEx1, minTds1, maxTds1, 'olivedrab');
  }

  if (isOn) {
    brewFormula();
  }

  realcanvas.src = canvasToImage();

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
  context.strokeStyle = 'black';
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

};

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

// user-proof behaviour.
let validate = () => {

  // first check if TDS is within spec and change if necessary.
  let alltds = document.getElementsByClassName('tds');
  for (let i = 0; i < alltds.length; i++) {
    let value = alltds[i].value;
    if (value > 20) {
      alltds[i].value = 20;
    };

    if (value < 2) {
      alltds[i].value = 2;
    };

  }

  // check extractions and change if necessary.
  let allext = document.getElementsByClassName('ext');

  for (let i = 0; i < allext.length; i++) {

    let value = allext[i].value;

    if (value > 25) {
      allext[i].value = 25;
    }

    if (value < 14) {
      allext[i].value = 14;
    }

  }

  let min = document.getElementsByClassName('minext');
  let max = document.getElementsByClassName('maxext');

  for (let i = 0; i < min.length; i++) {
    if (min[i].value > max[i].value) {
      [min[i].value, max[i].value] = [max[i].value, min[i].value];
    }
    if (min[i].value == max[i].value) {
      if (min[i].value >= 15) {
        min[i].value--;
      } else if (max[i].value <= 24) {
        max[i].value++;
      }
    }
  }
};

drawBoard();

// add event listeners to react to input

// all text/number fields on "focus out"
let fields = document.getElementsByClassName('field');
for (let x = 0; x < fields.length; x++) {
  fields[x].addEventListener('focusout', drawBoard);
}

//
let checkboxes = document.getElementsByClassName('checkbox');
for (let x = 0; x < checkboxes.length; x++) {
  checkboxes[x].addEventListener('click', drawBoard);
}

let numberfields = document.getElementsByClassName('tds');
for (let x = 0; x < numberfields.length; x++) {
  numberfields[x].addEventListener('click', drawBoard);
}

numberfields = document.getElementsByClassName('ext');
for (let x = 0; x < numberfields.length; x++) {
  numberfields[x].addEventListener('click', drawBoard);
}

function canvasToImage() {
  // not my function - thank you http://www.mikechambers.com/blog/
  //cache height and width
  var w = canvas.width;
  var h = canvas.height;

  var data;

  data = context.getImageData(0, 0, w, h);
  var compositeOperation = context.globalCompositeOperation;
  context.globalCompositeOperation = 'destination-over';
  context.fillStyle = 'white';
  context.fillRect(0, 0, w, h);
  var imageData = this.canvas.toDataURL('image/png');
  context.clearRect(0, 0, w, h);
  context.putImageData(data, 0, 0);
  context.globalCompositeOperation = compositeOperation;
  return imageData;
}
