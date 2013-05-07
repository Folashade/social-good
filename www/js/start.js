
// From kirupa.com
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}




function onMouseDown(event)  {
  event.preventDefault();
}

function onTouchStart(event) {
  event.preventDefault();
}

function onTouchMove(event)  {
  event.preventDefault();
  
  // Get element positions
  var play = document.querySelector("#play");
  var playPosition = getPosition(play);

  var inst = document.querySelector("#instructions");
  var instPosition = getPosition(inst);

  // Check of any of the touchmoves are over these elements.
  // Inst takes priority over play if both are touched

  for (var i = 0; i < event.touches.length; i++)  {
    var cx = event.touches[i].pageX;
    var cy = event.touches[i].pageY;

    if ((instPosition.x < cx && cx < instPosition.x+100) &&
        (instPosition.y < cy && cy < instPosition.y+100))  {
       var screen1div = document.getElementById("screen1");
       var back = document.getElementsByClassName("back");
       var playbutton = document.getElementById("play");
       var instructions = document.getElementById("instructions");
       var screeninstructions = document.getElementById("screeninstructions");
       screen1div.style.visibility="hidden";
       screen1div.style.display="none";
       screeninstructions.style.visibility="visible";
       screeninstructions.style.display="";

    }

    if ((playPosition.x < cx && cx < playPosition.x+200) &&
        (playPosition.y < cy && cy < playPosition.y+200))     {
      window.location.href = "init.html";
    }
  }


}

function onTouchEnd(event) {
  event.preventDefault();
}

window.onload=function()
{
  window.addEventListener('mousedown', onMouseDown, false);
  //window.addEventListener('touchstart', onTouchStart, false);
  window.addEventListener('touchmove', onTouchMove, false);
  window.addEventListener('touchend', onTouchEnd, false);
  var screen1div = document.getElementById("screen1");
  var back = document.getElementsByClassName("back");
  var playbutton = document.getElementById("play");
  var instructions = document.getElementById("instructions");
  var screeninstructions = document.getElementById("screeninstructions");
  
  screeninstructions.style.display="none";

  window.addEventListener('mousedown', onMouseDown, false); 
  
  
  instructions.onclick=function()
  {
    screen1div.style.visibility="hidden";
                      screen1div.style.display="none";
                      screeninstructions.style.visibility="visible";
                      screeninstructions.style.display="";
                      
  }
  
  
          
  back[0].onclick=function()
  {
                      
                      screen1div.style.visibility="visible";
                      screen1div.style.display="";
                      screeninstructions.style.visibility="hidden";
                      screeninstructions.style.display="none";
                   
  }

  
  
  playbutton.onclick=function()
  {
    window.location.href = "init.html";
  };

  

}

