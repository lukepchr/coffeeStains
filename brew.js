let w = 12; // width in squares
let h = 16; // height in squares
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

let ratios = [
[14, 1.125, 19.25, 1.60, '70g'],
[14, 1.03, 21.3, 1.6, '65g'],
[14, 0.96, 23.3, '60g'],
[14, 0.875, 25.55, '55g'],
[14.2, 0.8, 26, 1.46, '50g'],
[15.95, 0.8, 26, 1.29, '45g'],
[18.5, 0.8, 26, 1.13, '40g']
];

let realcanvas = document.getElementById('jpgcanvas');

let canvas = document.getElementById('canvas');
canvas.height = 2 * (h * size + 2 * p);
canvas.width = 2 * (w * size + 2 * p);
let context = canvas.getContext('2d');
context.scale(2, 2);

let locateExt = (pp = 20) => {
  return (pp - 14) * size + p;
};
// convert the extraction [%] value into position on the grid

let locateTds = (pp = 1.35) => {
  return (1.6 - pp) * 20 * size + p;
};
// convert the TDS [%] value into position on the grid

// This bit is to be readded later

// let brewFormula = () => {
//   //plot ebf
//   for (let i = 0; i < ebf.length; i++) {
//     context.beginPath();
//     context.moveTo(p, locateTds(ebf[i][0]));
//     col = `hsl(${80 + i / ebf.length * 280}, 100%, 50%)`;
//     context.strokeStyle = col;
//     context.fillStyle = col;
//     context.lineTo(w * size + p, locateTds(ebf[i][1]));
//     context.font = '9pt Helvetica';
//     context.fillText(`EBF ${ebf[i][2]}%`, 1.1 * p + w * size, locateTds(ebf[i][1]) + 3);
//     context.lineWidth = 0.7;
//     context.stroke();
//     context.closePath();
//   }
// };

let drawBoard = () => {

  context.lineWidth = defaultLine;
  canvas.textAlign = 'center';

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

    if((y % 2) == 0) {
      let label = ((16 - y / 2) / 10).toFixed(2);
      context.fillText(label, p - 50, p + y * size + 6);
    }

    context.lineTo (w * size + p, y * size + p);
    context.stroke();
    context.closePath();
  }

  validate();
  refresh();

  espressoBox('STRONG UNDERDEVELOPED', 14, minEx1, maxTds1, 1.6, 'white');
  espressoBox('WEAK UNDERDEVELOPED', 14, minEx1, 0.8, minTds1, 'white');
  espressoBox('STRONG BITTER', maxEx1, 26, maxTds1, 1.6, 'white');
  espressoBox('WEAK BITTER', maxEx1, 26, 0.8, minTds1, 'white');

  espressoBox('WEAK', minEx1, maxEx1, 0.8, minTds1, 'skyblue');
  espressoBox('STRONG', minEx1, maxEx1, maxTds1, 1.6, 'skyblue');
  espressoBox('UNDERDEVELOPED', 14, minEx1, minTds1, maxTds1, 'skyblue');
  espressoBox('BITTER', maxEx1, 26, minTds1, maxTds1, 'skyblue');

  espressoBox(boxtitle1, minEx1, maxEx1, minTds1, maxTds1, 'orange'); // "ideal"

  // if (document.getElementById('ebfcheck').checked) {
  //   brewFormula();
  // }

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
  boxtitle1 = document.getElementById('name1').value;
  minEx1 = document.getElementsByName('minextraction1')[0].value;
  maxEx1 = document.getElementsByName('maxextraction1')[0].value;
  minTds1 = document.getElementsByName('mintds1')[0].value;
  maxTds1 = document.getElementsByName('maxtds1')[0].value;

};

// user-proof behaviour.
let validate = () => {

  // first check if TDS is within spec and change if necessary.
  let alltds = document.getElementsByClassName('tds');
  for (let i = 0; i < alltds.length; i++) {
    let value = alltds[i].value;
    if (value > 1.6) {
      alltds[i].value = 1.6;
    };

    if (value < 0.8) {
      alltds[i].value = 0.8;
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
  checkboxes[x].addEventListener('input', drawBoard);
}

let numberfields = document.getElementsByClassName('tds');
for (let x = 0; x < numberfields.length; x++) {
  numberfields[x].addEventListener('click', drawBoard);
}

numberfields = document.getElementsByClassName('ext');
for (let x = 0; x < numberfields.length; x++) {
  numberfields[x].addEventListener('click', drawBoard);
}





function canvasToImage()
// not my function - thank you http://www.mikechambers.com/blog/
{
    //cache height and width
    var w = canvas.width;
    var h = canvas.height;

    var data;

  data = context.getImageData(0, 0, w, h);
  var compositeOperation = context.globalCompositeOperation;
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = "white";
  context.fillRect(0,0,w,h);
  var imageData = this.canvas.toDataURL("image/png");
  context.clearRect (0,0,w,h);
  context.putImageData(data, 0,0);
  context.globalCompositeOperation = compositeOperation;
  return imageData;
}
