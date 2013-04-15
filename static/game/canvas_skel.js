var canvas = $("#myCanvas");
var ctx = canvas.getContext("2d");


// shim layer with setTimeout fallback
// Code from paulirish.com
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


(function animloop() {
  requestAnimFrame(animloop);
  render();
})();

