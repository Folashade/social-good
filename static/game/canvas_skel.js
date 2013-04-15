// Skeleton for canvas
// Srinivasan Vijayaraghavan (srinivav)

/* TODO:
 * touchStart, touchMove, touchEnd functions
 * updateAllPositions function
 */

var canvas = $("#myCanvas");
var ctx = canvas.getContext("2d");


// Patch Bind -- from course notes
// iOS5 or less does not have .bind so add it if needed (iOS6 has it!)
function patchBind(){
   if (Function.prototype.bind === undefined){
      Function.prototype.bind = function (bind) {
           var self = this;
           return function () {
               var args = Array.prototype.slice.call(arguments);
               return self.apply(bind || null, args);
           };
       };
   }
}


function onTouchStart(event)  {
  event.preventDefault();
  return;
}

function onTouchMove(event) {
  event.preventDefault();
  return;
}

function onTouchEnd(event)  {
  event.preventDefault();
  return;
}


function onTimer()  {
  //updateAllPositions();
  return;
}



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


function run()  {
  canvas.addEventListener('touchstart', onTouchStart, false);
  canvas.addEventListener('touchend', onTouchEnd, false);
  canvas.addEventListener('touchmove', onTouchMove, false);
  canvas.setAttribute('tabindex', '0');
  canvas.focus();
  intervalId = setInterval(onTimer, timerDelay);
  animloop();
}
