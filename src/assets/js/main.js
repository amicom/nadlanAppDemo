import Slider from "nouislider";
import OverlayScrollbars from "overlayscrollbars";


// sidebar mechanism
function transitionendListener(){
  this.setAttribute('hidden', "");
}
(function() {
    const element = document.getElementById("menubtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.querySelector(".overlay");
  
    element.addEventListener("click",function(){
      if(element.classList.toggle("is-active")){
        sidebar.classList.add('active');
        if(overlay.hasAttribute('hidden')){
          overlay.removeAttribute('hidden');
        }
        requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('active')));
        overlay.removeEventListener('transitionend', transitionendListener);
      }else{
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
  
    overlay.addEventListener('transitionend', transitionendListener);
  
      }
    })
  
  })();
  

// initializing custom scrollbars
document.addEventListener("DOMContentLoaded", function () {
  OverlayScrollbars(document.querySelectorAll(".right-scrolls"), {
    className: "os-theme-thin-light",
  });
});

// initializing range slider
const slider = document.getElementById("range");
const minField = document.getElementById("slider-input-min");
const maxField = document.getElementById("slider-input-max");

Slider.create(slider, {
  start: [8, 16],
  connect: true,
  animate: false,
  step: 0.1,
  margin: 1.3,
  cssPrefix: 'slider-',
  direction: "rtl",
  behaviour: "drag-tap",
  range: {
    min: 0.5,
    max: 25,
  },
});

// listening for text fields 'change' event
slider.noUiSlider.on("update", onUpdate);
minField.addEventListener("change", updateMinValue);
maxField.addEventListener("change", updateMaxValue);

function onUpdate(values, handle) {
  if (handle) {
    maxField.value = values[handle];
  } else {
    minField.value = values[handle];
  }
}

function updateMinValue(e) {
  slider.noUiSlider.set([e.target.value, null]);
}

function updateMaxValue(e) {
  slider.noUiSlider.set([null, e.target.value]);
}
