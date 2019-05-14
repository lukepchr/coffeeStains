// that's the little slider instead of a checkbox.

let slider = document.getElementById("slider");
let ball = document.getElementById("ball");
slider.addEventListener("click", toggle);

let isOn = true;

function toggle() {

  if (isOn) {
    // slider.style.backgroundColor = "yellowgreen";
    ball.style.animationName = "slideOff";
 ball.style.animationPlayState = "initial";
    ball.style.animationPlayState = "running";
    slider.style.backgroundColor = "#FE5F55";
    isOn = false;


  } else {

    ball.style.animationName = "slideOn";
 ball.style.animationPlayState = "initial";
    ball.style.animationPlayState = "running";
    slider.style.backgroundColor = "#92D1C3";
    isOn = true;
  }
console.log(isOn);
}
