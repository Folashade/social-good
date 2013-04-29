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

function resetVariables() {
  window.points = 0;
  window.pointsIncr = 20;
  window.qPointsIncr = 100;
  window.balloonsPopped = 0;
  window.timerDelay = 30;
  window.qTimeout = 25000;
  window.radius = 60;
  window.qRadius = 100;
  window.maxVy;
  window.acceleration = 1;
  window.balloons = [];
  window.minVy = -20
  window.timer = 0;
  window.questionTimer = 0;
  window.isPaused = false;
  window.inQuestion = false;
  window.verbose = false;
}


// Using both inQuestion and isPaused for extensibility (pause button, etc)
function enterQuestionMode()  {
  // If we're already in question mode, do nothing
  if (!(window.inQuestion === true))  {
    window.questionTimer = 0;
    window.inQuestion = true;
  }
}

function leaveQuestionMode()  {
  // Since gameStep uses setTimeout from itself, we'll need to run it again
  if (!(window.inQuestion === false)) {
    window.inQuestion = false;
    window.isPaused = false;
  }
}

function isQuestionBalloon(balloon) {
  if (balloon.color === 3)
    return true;
  else
    return false;
}

function removeBalloon(i) {
  // Add animations
  //balloons[i].popped = true;
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
  this.color = color;
  this.popped = false;
  this.frame = 0.0;

  this.image = new Image();
  this.image.src = window.images[this.color];

  this.draw = function() {
    if (this.popped === false || this.frame < 3) {
      if (this.color == 3)  {   // If question balloon
        ctx.drawImage(this.image, this.x-102, this.y-103);
      }
        
      else  {  
        ctx.drawImage(this.image, this.x-54, this.y-65);
      }
    }

    if (this.popped === true) {
      ctx.drawImage(spriteSheet, 
                    Math.floor(Math.floor(this.frame)%5)*194, 
                    Math.floor(Math.floor(this.frame)/5)*216, 
                    194, 216, 
                    this.x-97, this.y-108, 194, 216);
      
      if (this.frame < 9 && window.inQuestion === false) {
        this.frame += 0.2;
      }   
    }


  };
};


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
    balloons.push(new balloon(x, y, vx, vy, 3));
  
  else if (isQuestionBalloon === false)  
    balloons.push(new balloon(x, y, vx, vy, getRandomColor()));

}


function gameStep() {
  if (window.inQuestion === true)  {
    window.questionTimer += window.timerDelay;
    if (window.questionTimer > window.qTimeout) {
      leaveQuestionMode();
    }
  }
  
  else  {
    window.timer += window.timerDelay;
  
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
  }

  if (window.isPaused === false)
    setTimeout(gameStep, window.timerDelay);

  return;
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


