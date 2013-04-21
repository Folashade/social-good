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

  if (verbose)  {
    console.log (cx + ", " + cy);
  }

  var i;

  for (i=0; i < balloons.length; i++) {
    if ((Math.abs(balloons[i].x - cx) <= 4*radius) &&
        (Math.abs(balloons[i].y - cx) <= 4*radius))  {
      // remove this balloon from the list
      balloons.splice(i, 1);
      i -= 1;
    }
  }

  for (i=0; i < qBalloons.length; i++)  {
    if ((Math.abs(qBalloons[i].x - cx) <= 4*qRadius) &&
        (Math.abs(qBalloons[i].y - cx) <= 4*qRadius))  {
      // remove this balloon from the list
      qBalloons.splice(i, 1);
      i -= 1;
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


