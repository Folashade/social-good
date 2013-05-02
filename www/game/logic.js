// logic.js
// Contains most of the game logic, as well as classes
// Srinivasan Vijayaraghavan (srinivav)


// createNewBalloon(option, isQuestionBalloon) creates a balloon which moves 
// in a direction specified by option. It creates a Question Balloon if and
// only if the second argument is true.
// The balloon always appears at the bottom of the canvas, and its 
// trajectory is guaranteed to stay within the canvas.
// If option is 1, the balloon moves on a right trajectory
// If option is 2, the balloon moves on a left trajectory
// If option is anything else, the balloon moves only vertically.

// Think carefully before modifying any function starting with an underscore

function resetVariables() {
  window.points = 0;
  window.pointsIncr = 10;
  window.qPointsIncr = 100;
  window.correctNumberofqs=0;
  window.balloonsPopped = 0;
  window.timerDelay = 30;
  window.qTimeout = 25000;
  window.radius = 60;
  window.qRadius = 70;
  window.maxVy;
  window.acceleration = 1;
  window.balloons = [];
  window.minVy = -20
  window.timer = 0;
  window.questionTimer = 0;
  window.isPaused = false;
  window.inQuestion = false;
  window.verbose = false;
  window.teachers = [];
  window.contentList = [];
  window.content = [];
  window.waterLevels = [0.6, 0.6, 0.6];
  window.touches = [];
  window.isGameOver = false;
  window.questionNumber = 0;
  window.htmlWidth = 780;
  window.htmlHeight = 540;
  window.levelIncr = 0.15;
  window.qLevelIncr = 0.6;
  window.wr = canvas.width/window.htmlWidth;
  window.hr = canvas.height/window.htmlHeight;
  window.feedbackFill = false;
  window.feedbackFillStyle = "";
  window.touchBoxX = 0;
  window.touchBoxY = 0;
}

var colors = ["orange", "pink", "green"];


// map -- from lecture notes
function map(fn, list) {
    var result = [ ]
    for (var i=0; i<list.length; i++)
        result[i] = fn(list[i])
    return result;
}

function increaseLevel(curLevel)  {
  return Math.min(1.0, curLevel+levelIncr);
}

function qIncreaseLevel(curLevel)  {
  return Math.min(1.0, curLevel+qLevelIncr);
}


// Using both inQuestion and isPaused for extensibility (pause button, etc)
function enterQuestionMode()  {
  // If we're already in question mode, do nothing
  if (!(window.inQuestion === true))  {
    window.questionTimer = window.qTimeout;
    window.inQuestion = true;
    window.wasTouched = false;
  }
}


function leaveQuestionMode()  {
  if (!(window.inQuestion === false)) {
    window.inQuestion = false;
    window.isPaused = false;
    window.feedbackFill = false;
    window.questionNumber += 1;
  }
}

function leaveQ_wrapper() {
  setTimeout(leaveQuestionMode, 1200);
}

function endGame()  {
  resetVariables();
  window.isGameOver = true;
  window.isPaused = true;
  gameOverScreen();
}


function startGame()  {
  resetVariables();
  window.isGameOver = false;
  window.isPaused = false;
  gameStep();
}


function isQuestionBalloon(balloon) {
  if (balloon.color === 3)
    return true;
  else
    return false;
}


/* AP Physics + 'up is down'
 * Think before modifying
 */
function _findMaxVy()  {
  return -minVy + 2 - Math.sqrt(2 * acceleration * canvas.height);
}

function _getRandomVy()  {
  return minVy + maxVy * Math.random();
}


// Range of a projectile = 2*vx*vy/acceleration
function _getRandomVxRight(x, vy)  {
  // Moving right, so our range is canvas.width-x-100
  return (canvas.width - x - 100*wr) *acceleration / (2 * vy) * Math.random();
}

function _getRandomVxLeft(x, vy)  {
  // Moving left, so our range is just -x+100
  return (-x+100*wr) * acceleration / (2 * vy) * Math.random();
}

function getRandomColor() {
  return Math.floor(3*Math.random());
}


var balloon = function(x, y, vx, vy, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.popped = false;
  this.frame = 0.0;

  this.draw = function() {
    if (this.popped === false  || this.frame < 3 ) {
       ctx.drawImage(window.spriteSheet, 
                    Math.floor(Math.floor(this.color + 11)%5)*194, 
                    Math.floor(Math.floor(this.color + 11)/5)*216,
                    194, 216, 
                    Math.floor(this.x-97*wr), Math.floor(this.y-108*hr), 
                    Math.floor(194*wr), Math.floor(216*hr));
    }

    if (this.popped === true && this.frame < 10)  {
      ctx.drawImage(window.spriteSheet, 
                    Math.floor(Math.floor(this.frame)%5)*194, 
                    Math.floor(Math.floor(this.frame)/5)*216, 
                    194, 216, 
                    Math.floor(this.x-97*wr), Math.floor(this.y-108*hr), 
                    Math.floor(194*wr), Math.floor(216*hr));
      
      if (window.inQuestion === false) {
        this.frame += 0.3;
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
      var x = 100 + (canvas.width - 200) * Math.random();
      var y = canvas.height;
      var vy = _getRandomVy();
      var vx = _getRandomVxRight(x, Math.abs(vy));   
      break;
    }

    case 2:  {   //left
      var x = 100 + (canvas.width - 200) * Math.random();
      var y = canvas.height;
      var vy = _getRandomVy();
      var vx = _getRandomVxLeft(x, Math.abs(vy));
      break;
    }

    default:  {
      // Pure vertical motion
      var x = 100 + (canvas.width - 200) * Math.random();
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


function decreaseLevel(level) {
  return Math.max(0, level - 0.001);
}


function gameStep() {
  if (window.inQuestion === true)  {
    window.questionTimer -= window.timerDelay;
    if (window.questionTimer < 0.0) {
      leaveQuestionMode();
    }
  }
  
  else  {
    window.timer += window.timerDelay;
    
    waterLevels = map(decreaseLevel, waterLevels);
    
    if (window.timer % 1000 === 0)  {   
      for (var c = 0; c < 3; c++) {
        $("#"+colors[c]).height(""+waterLevels[c]*100+"%");
       }
    }

    // Before moving balloon positions, check touches
    var i, cx, cy, x, y, j, curBalloon;
    for (i = 0; i < window.touches.length; i++) {
      cx = touches[i].pageX - canvas.offsetLeft;
      cy = touches[i].pageY - canvas.offsetTop;
      var wasQuestionPopped = false;
    
      for (j = 0; j < balloons.length; j++) {
        curBalloon = balloons[j];
        x = curBalloon.x;
        y = curBalloon.y;

        // Check if there is a touch on a question balloon
        if ((isQuestionBalloon(curBalloon) === true) &&
            (inRadius(x, cx, y, cy, qRadius*wr) === true) &&
            (curBalloon.popped === false))  {
          balloons[j].popped = true;       
          wasQuestionPopped = true;
        }

        // Check if there is a touch on a regular balloon
        else if ((inRadius(x, cx, y, cy, radius*wr) === true) &&
                 (curBalloon.popped === false))  {
          balloons[j].popped = true;
          waterLevels[curBalloon.color] =
              increaseLevel(waterLevels[curBalloon.color]);
          points += pointsIncr;
          
          for (var c = 0; c < 3; c++) {
            $("#"+colors[c]).height(""+waterLevels[c]*100+"%");
          }
        }
      }
    }

    if (wasQuestionPopped === true) {
      enterQuestionMode();
    }

    // Since balloons.length might change while in loop - not anymore!
    for (i = 0; i < balloons.length; i++) {
      balloons[i].x += balloons[i].vx*wr;
      balloons[i].y += balloons[i].vy*hr;
      balloons[i].vy += window.acceleration*hr;

      if (balloons[i].y > (canvas.height + 2*radius)) {
        //Balloon has fallen back. Remove it.
        balloons.splice(i, 1);
      }
    }


    // Create some or no balloons
    if (timer % 1000 == 0 && timer % 3000 !== 0 && timer !== 0)  {
      var numBalloons = Math.floor(4*Math.random());

      for (i = 0; i < numBalloons; i++) {
        var opt = Math.floor(1 + 2*Math.random());
        createNewBalloon(opt, false);
      }
    } 

    // Guaranteed balloons every 3 seconds
    if (timer % 3000 == 0)  {
      var numBalloons = Math.floor(1+3*Math.random());

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

    // Check game-over conditions
    var isLost = false;

    if (window.questionNumber >= window.currentSet.questions.length)
      isLost = true;

    for (var j = 0; j < 3; j++) {
      if (waterLevels[j] <= 0)
        isLost = true;
    }

    if (isLost === true)  {
      for (var c = 0; c < 3; c++) {
        $("#"+colors[c]).height(""+waterLevels[c]*100+"%");
      }
      endGame();
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


