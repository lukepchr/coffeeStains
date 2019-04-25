var w = 11; // plotting
var h = 18; // plotting
var p = 45; // padding
var size = 40;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvas.width;

canvas.height = h * size + 2 * p;
canvas.width = w * size + 2 * p;
canvas.textAlign = 'left';
context.lineWidth = 0.3;


let locateExt = (pp) => {return (pp - 14) * size + p;};

let locateTds = (pp) => {return (20 - pp) * size + p;};

function drawBoard() {
  let espressobox = document.getElementById('espressobox').checked;
  let minEx = document.getElementsByName('minextraction')[0].value;
  let maxEx = document.getElementsByName('maxextraction')[0].value;
  let minTds = document.getElementsByName('mintds')[0].value;
  let maxTds = document.getElementsByName('maxtds')[0].value;


  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '10pt Helvetica';
  context.beginPath();
  context.fillText('[%TDS]', 0, p - 22);
  context.fillText('extraction [%]', size * w / 2, (h + 1) * size + p);
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
  for (let y = 0; y <= h; y++) {
    context.beginPath();
    context.moveTo(p - 10, y * size + p);
    context.font = '12pt Helvetica';
    context.fillText(20 - y, p - 30, p + y * size + 6);
    context.lineTo(w * size + p, y * size + p);
    context.stroke();
    context.closePath();
  }
}

drawBoard();

let sliders = document.getElementsByClassName('slider');
for (let x = 0; x < sliders.length; x++) {
  sliders[x].addEventListener('input', drawBoard);
}
