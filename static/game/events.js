// events.js
// Has code for handling various events
// Srinivasan Vijayaraghavan (srinivav)


/* TODO: Implement touch */

// For when multiTouch is implemented
var touches = [];

function onMouseDown (event)  {
//  var cx = event.pageX - canvas.offsetLeft;
//  var cy = event.pageY - canvas.offsetTop;
  
  var opt = Math.floor(1 + 2*Math.random());
  createNewBalloon(opt);
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


