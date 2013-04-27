// canvas.js
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

function drawBalloons() {
  var len = balloons.length;
  var i;

  for (i = 0; i < len; i++) {
    balloons[i].draw();
  }
}

function drawQuestionScreen() {
  return;
}


function render()  {
  // Background being drawn whether or not in question mode
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBalloons();
  if (inQuestion === true)  {
    drawQuestionScreen();
  }
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
  maxVy = _findMaxVy();  // No point doing this calculation everytime; store it
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


run();
