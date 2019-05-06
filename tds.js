let water;
let brewmass;
let tds;
let dose;
let extraction;
let button = document.getElementById('calculate');

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
      document.getElementById('brewmass').value = water - dose*lrr;
  }

  if (brewmass && tds && dose){
    document.getElementById('extraction').value = ((brewmass * tds) / dose).toFixed(2);
  }



};

button.addEventListener('click', function(event){
  event.preventDefault();
  calculate();
});
