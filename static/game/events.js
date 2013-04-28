// events.js
// Has code for handling various events
// Srinivasan Vijayaraghavan (srinivav)


/* TODO: Implement touch */
// For when multiTouch is implemented
var touches = [];


function inRadius (x, cx, y, cy, radius) {
  if ((Math.abs(x-cx) <= 2*radius) && (Math.abs(y-cy) <= 2*radius))
    return true;

  else 
    return false;
}



function onMouseDown(event) {
  var cx = event.pageX - canvas.offsetLeft;
  var cy = event.pageY - canvas.offsetTop;
  var wasQuestionPopped = false;

  if (window.verbose === true)  {
    console.log (cx + ", " + cy);
  }

  if (window.inQuestion === false)  {
    var i, j;

    
    // Check qRadius?
    for (i = 0; i < balloons.length; i++) {
      curBalloon = balloons[i];
      x = curBalloon.x;
      y = curBalloon.y;
      if ((isQuestionBalloon(curBalloon) === true) &&
          (inRadius(x, cx, y, cy, qRadius) === true) &&
          (curBalloon.popped === false)) {
        balloons[i].popped = true;
        points += qPointsIncr;
        wasQuestionPopped = true;
      }

      else if ((inRadius(x, cx, y, cy, radius) === true) &&
               curBalloon.popped === false) {
        balloons[i].popped = true;
        points += pointsIncr;
      }
    }
      
    if (wasQuestionPopped === true) {
      enterQuestionMode(); 
    }  
  }

  else if (window.inQuestion === true)  {
    // Just leave question mode if tap is in the right half, for now
    if (cx >= canvas.width/2)  {
      leaveQuestionMode();
    }
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


