// events.js
// Has code for handling various events
// Srinivasan Vijayaraghavan (srinivav)


/* TODO: Implement touch */

// For when multiTouch is implemented
var touches = [];

/*
function onMouseDown (event)  {
  
  var opt = Math.floor(1 + 2*Math.random());
  createNewBalloon(opt);
}
*/

function onMouseDown(event) {
  var cx = event.pageX - canvas.offsetLeft;
  var cy = event.pageY - canvas.offsetTop;

  var i;

  for (i=0; i < balloons.length; i++) {
    if ((Math.abs(balloons[i].x - cx) <= 4*radius) &&
        (Math.abs(balloons[i].y - cx) <= 4*radius))  {
      // remove this circle from the list
      balloons.splice(i, 1);
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


