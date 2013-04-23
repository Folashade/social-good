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

function onMouseDown(event) {
  var cx = event.pageX - canvas.offsetLeft;
  var cy = event.pageY - canvas.offsetTop;

  if (verbose === true)  {
    console.log (cx + ", " + cy);
  }

  if (inQuestion === true)  {
    var i, j;

    for (i=0; i < balloons.length; i++) {
      if ((Math.abs(balloons[i].x - cx) <= 4*radius) &&
          (Math.abs(balloons[i].y - cx) <= 4*radius))  {
        // remove this balloon from the list
        balloons.splice(i, 1);
        i -= 1;
      }
    }

    for (j=0; j < qBalloons.length; j++)  {
      if ((Math.abs(qBalloons[j].x - cx) <= 4*qRadius) &&
          (Math.abs(qBalloons[j].y - cx) <= 4*qRadius))  {
        // remove this qBalloon from the list
        qBalloons.splice(j, 1);
        j -= 1;
        enterQuestionMode();
      }
    }
  }

  else if (inQuestion === false)  {
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


