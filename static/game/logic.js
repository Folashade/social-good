// logic.js
// Contains most of the game logic, as well as classes
// Srinivasan Vijayaraghavan (srinivav)


// createNewBalloon(option, isQuestionBalloon) creates a balloon which moves 
// in a direction specified by option. It creates a Question Balloon if and
// only if the second argument is true.
// The balloon always appears at the bottom of the canvas, and its 
// trajectory is guaranteed to stay within the canvas.
// TODO: Make the whole balloon stay within the canvas, not just the center
// If option is 1, the balloon moves on a right trajectory
// If option is 2, the balloon moves on a left trajectory
// If option is anything else, the balloon moves only vertically.

// Think carefully before modifying any function starting with an underscore

var timerDelay = 30;
var radius = 60;
var qRadius = 100;
var maxVy;
var acceleration = 1;
var balloons = [];
var qBalloons = [];
var minVy = -20
var timer = 0;
var isPaused = false;
var inQuestion = false;


// Using both inQuestion and isPaused for extensibility (pause button, etc)
function enterQuestionMode()  {
  inQuestion = true;
  isPaused = true;
}

function leaveQuestionMode()  {
  // Since gameStep uses setTimeout from itself, we'll need to run it again
  inQuestion = false;
  isPaused = false;
  gameStep();
}


// AP Physics + 'up is down'
function _findMaxVy()  {
  return -minVy + 2 - Math.sqrt(2 * acceleration * canvas.height);
}

function _getRandomVy()  {
  return minVy + maxVy * Math.random();
}


// Range of a projectile = 2*vx*vy/acceleration
function _getRandomVxRight(x, vy)  {
  // Moving right, so our range is canvas.width-x
  return (canvas.width - x) *acceleration / (2 * vy) * Math.random();

}

function _getRandomVxLeft(x, vy)  {
  // Moving left, so our range is just x
  return -x * acceleration / (2 * vy) * Math.random();
}

function getRandomColor() {
  return Math.floor(3*Math.random());
}


/* TODO: Add source image and touch info */
var balloon = function(x, y, vx, vy, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;

  this.image = new Image();
  this.image.src = images[color];

  this.draw = function() {
    ctx.drawImage(this.image, this.x-54, this.y-65);
  };
}

/* TODO: Inheritance */
var qBalloon = function(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;

  this.image = new Image();
  this.image.src = questionImage;

  this.draw = function() {
    ctx.drawImage(this.image, this.x-102, this.y-103);
  };
}



/* The balloon always appears at the bottom edge of the screen
 * If the option is: 
 * 1, the balloon moves right
 * 2, the balloon moves left
 * x, it starts anywhere, and moves purely vertically
 */
function createNewBalloon(option, isQuestionBalloon) {

  var x;
  var y;
  var vy;
  var vx;
  
  switch(option)  {
    case 1: {         //right
      var x = canvas.width * Math.random();
      var y = canvas.height;
      var vy = _getRandomVy();
      var vx = _getRandomVxRight(x, Math.abs(vy));   
      break;
    }

    case 2:  {   //left
      var x = canvas.width * Math.random();
      var y = canvas.height;
      var vy = _getRandomVy();
      var vx = _getRandomVxLeft(x, Math.abs(vy));
      break;
    }

    default:  {
      // Pure vertical motion
      var x = canvas.width * Math.random();
      var vx = 0;
      var y = canvas.height;
      var vy = _getRandomVy();
      break;
    }
  }

  if (isQuestionBalloon === true)
    qBalloons.push(new qBalloon(x, y, vx, vy));
  
  else if (isQuestionBalloon === false)  
    balloons.push(new balloon(x, y, vx, vy, getRandomColor()));

}


function gameStep() {
  timer += timerDelay;
  var i;
  
  //TODO: Map or something more efficient?
  // For now, need to recalculate length each time
  for (i = 0; i < balloons.length; i++) {
    balloons[i].x += balloons[i].vx;
    balloons[i].y += balloons[i].vy;
    balloons[i].vy += window.acceleration;

    if (balloons[i].y > (canvas.height + 2*radius)) {
      //Balloon has fallen back. Remove it.
      balloons.splice(i, 1);
    }
  }
    
  for (i = 0; i < qBalloons.length; i++) {
    qBalloons[i].x += qBalloons[i].vx;
    qBalloons[i].y += qBalloons[i].vy;
    qBalloons[i].vy += window.acceleration;

    if (qBalloons[i].y > (canvas.height + 2*radius)) {
      //Balloon has fallen back. Remove it.
      qBalloons.splice(i, 1);
    }
  }

  
  // Every now and then, create a bunch of balloons
  if (timer % 1000 == 0)  {
    var numBalloons = Math.floor(4*Math.random());
  
    for (i = 0; i < numBalloons; i++) {
      var opt = Math.floor(1 + 2*Math.random());
      createNewBalloon(opt, false);
    }
  } 

  // Every now and then, create a questionBalloon
  if (timer % 5000 == 0)  {
  
    var opt = Math.floor(1 + 2*Math.random());
    createNewBalloon(opt, true);
  } 

  if (isPaused === false)
    setTimeout(gameStep, timerDelay);
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

