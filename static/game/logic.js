// logic.js
// Contains most of the game logic, as well as classes
// Srinivasan Vijayaraghavan (srinivav)


var timerDelay = 30;
var maxVy;
var acceleration = 2;
var balloons = [];

// AP Physics + 'up is down'
// Think before modifying these
function __findMaxVy()  {
  return 39-Math.sqrt(2*acceleration*canvas.height);
}

function getRandomVy()  {
  return -37 + maxVy*Math.random();
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
    ctx.arc(this.x, this.y, 10, 0, 2*Math.PI, true);
    ctx.fill();
  };
}





/* The balloon always appears at the bottom edge of the scree
 * If the option is: 
 * 1, the balloon starts from the left side, moving right
 * 2, it starts on the right side, moving left
 * x, it starts anywhere, and moves purely vertically
 */
function createNewBalloon(option) {

  if (option === 1) {
    
    balloons.push(new balloon(x, y, vx, vy));
  }

  else if (option === 2)  {
    
    balloons.push(new balloon(x, y, vx, vy));
  }

  else  {
    // Pure vertical motion
    var x = canvas.width * Math.random();
    var vx = 0;
    var y = canvas.height;
    var vy = getRandomVy();
    balloons.push(new balloon(x, y, vx, vy));
  }

}


function gameStep() {
  var len = balloons.length;
  var i;
  
  //TODO: Map or something more efficient
  for (i = 0; i < len; i++) {
    balloons[i].x += balloons[i].vx;
    balloons[i].y += balloons[i].vy;
    balloons[i].vy += window.acceleration;
  }
    
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

