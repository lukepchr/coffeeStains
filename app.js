var w = 11; // plotting
var h = 18; // plotting
var p = 70; // padding
var size = 40;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvas.width;

canvas.height = h * size + 2 * p;
canvas.width = w * size + 2 * p;
canvas.textAlign = 'left';
context.lineWidth = 0.8;

// convert the extraction [%] value into position on the grid
let locateExt = (pp = 20) => {return (pp - 14) * size + p;};
// convert the TDS [%] value into position on the grid
let locateTds = (pp = 8) => {return (20 - pp) * size + p;};

let drawBoard = () => {
  let box1title = document.getElementById('name').value;
  let espressobox = document.getElementById('espressobox').checked;
  let minEx = document.getElementsByName('minextraction')[0].value;
  let maxEx = document.getElementsByName('maxextraction')[0].value;
  let minTds = document.getElementsByName('mintds')[0].value;
  let maxTds = document.getElementsByName('maxtds')[0].value;

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

  context.font = '12pt Helvetica';
  context.beginPath();
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  context.fillText('[%TDS]', 0.5 * p, p - 22);
  context.fillText('Extraction [%]', size * w / 2 + 10, (h + 1) * size + p + 10);
  context.closePath();

  if (espressobox) {
    context.beginPath();
    context.fillStyle = 'orange'; // Espresso
    context.fillRect(locateExt(minEx), locateTds(minTds),
      locateExt(maxEx) - locateExt(minEx),
      locateTds(maxTds) - locateTds(minTds));
    context.fillStyle = 'black';
    context.closePath();
  }

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
    context.fillText(`EBF ${ebf[i][2]}%`, 515, locateTds(ebf[i][1]) + 3);
    context.stroke();
    context.closePath();
  }

  context.beginPath();
  context.fillStyle = 'blue';
  context.font = '15pt Helvetica';
  context.textAlign = "center";
  let xAvg = locateExt((minEx + maxEx)/2);
  let yAvg = ((minTds + maxTds) / 2)-30;
  context.fillText("boxe", xAvg, yAvg);
  context.stroke();
    context.closePath();
};

drawBoard();

let sliders = document.getElementsByClassName('slider');
for (let x = 0; x < sliders.length; x++) {
  sliders[x].addEventListener('focusout', drawBoard);
}
