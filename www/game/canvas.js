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


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.prop('width', canvas.width());
canvas.prop('height', canvas.height());


// Declare globals
var points;
var pointsIncr;
var qPointsIncr;
var balloonsPopped;
var waterLevels = [];

var timer;
var questionTimer;
var timerDelay;
var qTimeout;
var wasTouched;

var radius;
var qRadius;
var maxVy;
var acceleration;
var minVy;

var balloons;
var isPaused;
var inQuestion;
var verbose;
var touches;
var isGameOver;

// Spritesheet
var spriteSheet = new Image();
spriteSheet.src = "assets/sprite_sheet_canvas.png";
var button=new Image();
button.src="assets/button.png";
var questionNumber;
 var bx1=100,by1=170, bx2= 390, by2=320;

//from http://developer.mozilla.org/en-US/docs/Canvas_tutorial/Drawing_shapes
function roundedRect(ctx,x,y,width,height,radius) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    ctx.lineTo(x+width-radius,y+height);
    ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    ctx.lineTo(x+width,y+radius);
    ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
ctx.closePath();
    ctx.strokeStyle= "a77c50";
    ctx.lineWidth=5;

    ctx.fill();
        ctx.stroke();
}




function drawBalloons() {
  var len = window.balloons.length;
  var i;

  for (i = 0; i < len; i++) {
    window.balloons[i].draw();
  }
}

function drawQuestionScreen() {
  roundedRect(ctx, 75, 70, 630, 400, 20);
  var text = String(Math.ceil(window.questionTimer/1000));
  ctx.textAlign = "right";
  ctx.fillStyle="14e2e2";
  ctx.font='5em Rumpelstiltskin';
  ctx.fillText(text, 675, 120);

  ctx.font='2em Maven Pro';
  ctx.fillStyle="fcfc63";
  // var randomquestion= Math.floor(Math.random());
  ctx.textAlign = "left";
  ctx.fillText(currentSet.questions[questionNumber].question, 100, 130);
  ctx.fillStyle="a77c50";
  ctx.textAlign = "center";
  var option1= currentSet.questions[questionNumber].answers[0].answer;
  var option2= currentSet.questions[questionNumber].answers[1].answer;
  var option3= currentSet.questions[questionNumber].answers[2].answer;
  var option4= currentSet.questions[questionNumber].answers[3].answer;
 
  ctx.drawImage(button, bx1, by1);
  ctx.fillText(option1, (bx1+145), (by1+60));
  ctx.drawImage(button, bx2, by1);
  ctx.fillText(option2, (bx2+145), (by1+60));
  ctx.drawImage(button, bx1, by2);
  ctx.fillText(option3, (bx1+145), (by2+60));
  ctx.drawImage(button, bx2, by2);
  ctx.fillText(option4, (bx2+145), (by2+60));
}

function drawPoints() {
  var text = String(window.points);
  ctx.font = "vold 14px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font='4em Rumpelstiltskin';
  ctx.strokeStyle = "black";

  ctx.fillText(text, 20, 20);
}

function render()  {
  // Background being drawn whether or not in question mode
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBalloons();
  drawPoints();
  if (window.inQuestion === true)  {
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
  //canvas.addEventListener('mousedown', onMouseDown, false);
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

resetVariables();
run();

