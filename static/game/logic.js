// logic.js
// Contains most of the game logic, as well as classes
// Srinivasan Vijayaraghavan (srinivav)


// createNewBalloon(option) creates a balloon which moves in a direction
// specified by option. The balloon always appears at the bottom of the
// canvas, and its trajectory is guaranteed to stay within the canvas.
// If option is 1, the balloon moves on a right trajectory
// If option is 2, the balloon moves on a left trajectory
// If option is anything else, the balloon moves only vertically.

// Think carefully before modifying any function starting with an underscore

var timerDelay = 30;
var radius = 20;
var maxVy;
var acceleration = 1;
var balloons = [];
var minVy = -20
var timer = 0;
var isPaused = false;

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



/* TODO: Add source image and touch info */
var balloon = function(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;

  this.draw = function() {
    // Just draws a black circle for now
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2*Math.PI, true);
    ctx.fill();
  };
}


/* The balloon always appears at the bottom edge of the scree
 * If the option is: 
 * 1, the balloon moves right
 * 2, the balloon moves left
 * x, it starts anywhere, and moves purely vertically
 */
function createNewBalloon(option) {

  if (option === 1) {         //right
    var x = canvas.width * Math.random();
    var y = canvas.height;
    var vy = _getRandomVy();
    var vx = _getRandomVxRight(x, Math.abs(vy));   
    
    balloons.push(new balloon(x, y, vx, vy));
  }

  else if (option === 2)  {   //left
    var x = canvas.width * Math.random();
    var y = canvas.height;
    var vy = _getRandomVy();
    var vx = _getRandomVxLeft(x, Math.abs(vy));
  
    
    balloons.push(new balloon(x, y, vx, vy));
  }

  else  {
    // Pure vertical motion
    var x = canvas.width * Math.random();
    var vx = 0;
    var y = canvas.height;
    var vy = _getRandomVy();
    balloons.push(new balloon(x, y, vx, vy));
  }

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

    if (balloons[i].y > (canvas.height + radius)) {
      //Balloon has fallen back. Remove it.
      balloons.splice(i, 1);
    }
  }
    
  // Every now and then, create a bunch of balloons
  if (timer % 1000 == 0)  {
    var numBalloons = Math.floor(4*Math.random());
  
    for (i = 0; i < numBalloons; i++) {
      var opt = Math.floor(1 + 2*Math.random());
      createNewBalloon(opt);
    }
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

