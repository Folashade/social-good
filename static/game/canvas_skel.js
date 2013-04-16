// Skeleton for canvas
// Srinivasan Vijayaraghavan (srinivav)

/* TODO:
 * touchStart, touchMove, touchEnd functions
 * updateAllPositions function
 * remove drawCircle and onclick
 */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var timerDelay = 30;

var cx, cy;


function drawCircle(ctx) {
    ctx.arc(cx, cy, 10, 0, 2*Math.PI, true);
}

function onMouseDown (event)  {
  console.log("Hi!");
  cx = event.pageX - canvas.offsetLeft;
  cy = event.pageY - canvas.offsetTop;
}


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
  return (window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          }
        );
})();


function animloop() {
  requestAnimFrame(animloop);
  drawCircle(ctx);
};


function run()  {
  // Delete the first line
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('touchstart', onTouchStart, false);
  canvas.addEventListener('touchend', onTouchEnd, false);
  canvas.addEventListener('touchmove', onTouchMove, false);
  canvas.setAttribute('tabindex', '0');
  canvas.focus();
  intervalId = setInterval(onTimer, timerDelay);
  animloop();
}

run()
