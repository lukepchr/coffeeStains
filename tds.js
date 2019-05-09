let water;
let brewmass;
let tds;
let dose;
let extraction;
let button1 = document.getElementById('calculate');

let readValues = () => {
  water = document.getElementById('water').value;
  brewmass = document.getElementById('brewmass').value;
  tds = document.getElementById('tds').value;
  dose = document.getElementById('dose').value;
  extraction = document.getElementById('extraction').value;
  lrr = document.getElementById('LRR').value;
};

let calculate = (event) => {
  readValues();

  if (water && dose && lrr) {
    document.getElementById('brewmass').value = (water - dose * lrr).toFixed(1);
  }

  if (brewmass && tds && dose) {
    document.getElementById('extraction').value = ((brewmass * tds) / dose).toFixed(2);
  }

  if (extraction && dose && brewmass) {
    document.getElementById('tds').value =
  ((extraction * dose) / brewmass).toFixed(2);
  }

  if (brewmass && tds && extraction) {
    document.getElementById('dose').value = ((brewmass * tds) / extraction).toFixed(2);
  }

  if (brewmass && dose && lrr) {
    document.getElementById('water').value = (brewmass / 1 + (dose * lrr)).toFixed(2);
  }


};

button1.addEventListener('click', function(event) {
  event.preventDefault();
  calculate();
});
