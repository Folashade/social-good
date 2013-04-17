// Skeleton for canvas
// Srinivasan Vijayaraghavan (srinivav)

/* requestAnimFrame is used to implement requestAnimationFrame with a fallback
 * to setTimeout. Inspired from paulirish.com
 * 
 * gameStep() is used to update game logic, such as posiiton of objects,
 * at the end of every time quantum, and render() is used to draw the objects 
 * on the screen.
 * This usage inspired from chandlerprall.com
 */


/* TODO:
 * touchStart, touchMove, touchEnd functions
 * updateAllPositions function
 * remove drawCircle and onclick
 */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var timerDelay = 30;

var cx, cy;


function drawBalloons() {
  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, 2*Math.PI, true);
  ctx.fill();
}

function onMouseDown (event)  {
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


function gameStep() {
  cy = cy + 5;
  setTimeout(gameStep, timerDelay);
}



function render()  {
  ctx.clearRect(0, 0, 400, 400);
  drawBalloons();
  return;
}


// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return (window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          }
        );
})();


function run()  {
  // Delete the first line
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('touchstart', onTouchStart, false);
  canvas.addEventListener('touchend', onTouchEnd, false);
  canvas.addEventListener('touchmove', onTouchMove, false);
  canvas.setAttribute('tabindex', '0');
  canvas.focus();

  gameStep();
  
  //instead of intervalId = setInterval(onTimer, timerDelay);
  (function animloop()  {
    requestAnimFrame(animloop);
    render();
  })();
}


run()
