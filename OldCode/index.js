
// Component to change to a sequential color on click.
AFRAME.registerComponent('cursor-listener', {
    init: function () {
      var lastIndex = -1;
      var COLORS = ['red', 'green', 'blue'];
      this.el.addEventListener('click', function (evt) {
        lastIndex = (lastIndex + 1) % COLORS.length;
        this.setAttribute('material', 'color', COLORS[lastIndex]);
        console.log('I was clicked at: ', evt.detail);
      });
    }
  });

  document.addEventListener("DOMContentLoaded",init)

function init () {
      scene = document.querySelector("#stage-bg");
      scene.addEventListener(onmousemove,followMouse)
  }

  function followMouse(e) {
    let x = e.clientX;
    let y = e.clientY;
    console.log(`#{x} + {y}`);
  }

  