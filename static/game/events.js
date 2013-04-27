// events.js
// Has code for handling various events
// Srinivasan Vijayaraghavan (srinivav)


var verbose = false;

/* TODO: Implement touch */
// For when multiTouch is implemented
var touches = [];

/*
function onMouseDown (event)  {
  
  var opt = Math.floor(1 + 2*Math.random());
  createNewBalloon(opt, true);
}
*/


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

  if (verbose === true)  {
    console.log (cx + ", " + cy);
  }

  if (inQuestion === false)  {
    var i, j;

    
    // Check qRadius?
    for (i=0; i < balloons.length; i++) {
      curBalloon = balloons[i];
      x = curBalloon.x;
      y = curBalloon.y;
      if (isQuestionBalloon(curBalloon) === true &&
          inRadius(x, cx, y, cy, qRadius) === true) {
        //Question balloon has been popped!
        removeBalloon(i);
        i -= 1;
        wasQuestionPopped = true;
        console.log("QPOP");
      }

      else if (inRadius(x, cx, y, cy, radius) === true) {
        removeBalloon(i);
        i -= 1;
      }
    }
      
    if (wasQuestionPopped === true) {
      console.log("YOLO");
      enterQuestionMode(); 
    }  
  }

  else if (inQuestion === true)  {
    // Just leave question mode if tap is in the right half, for now
    if (cx >= canvas.height/2)  {
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


