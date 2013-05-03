
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
  console.log("Play: " + playPosition.x + " " + playPosition.y);

  var inst = document.querySelector("#instructions");
  var instPosition = getPosition(inst);
  console.log("Inst: " + instPosition.x + " " + instPosition.y)

  // Check of any of the touchmoves are over these elements.
  // Inst takes priority over play if both are touched

  for (var i = 0; i < event.touches.length; i++)  {
    var cx = event.touches[i].pageX;
    var cy = event.touches[i].pageY;
    console.log("C: " + cx + " " + cy);

    if ((instPosition.x < cx && cx < instPosition.x+50) &&
        (instPosition.y < cy && cy < instPosition.y+50))  {
      instructions.onclick();
    }

    if ((playPosition.x < cx && cx < playPosition.x+100) &&
        (playPosition.y < cy && cy < playPosition.y+100))     {
      window.location.href = "init.html";
    }
  }


}

function onTouchEnd(event) {
  event.preventDefault();
}

window.onload=function()
{
	//window.addEventListener('mousedown', onMouseDown, false);
 	window.addEventListener('touchstart', onTouchStart, false);
 	window.addEventListener('touchmove', onTouchMove, false);
  window.addEventListener('touchend', onTouchEnd, false);
  var screen1div = document.getElementById("screen1");
	var screen2div = document.getElementById("screen2");
	var screen3div = document.getElementById("screen3");
  var menu = document.getElementsByClassName("menu");
  var back = document.getElementsByClassName("back");
  var playbutton = document.getElementById("play");
  var instructions = document.getElementById("instructions");
  var screeninstructions = document.getElementById("screeninstructions");
  screen2div.style.display="none";
  screen3div.style.display="none";
  screeninstructions.style.display="none";

  window.addEventListener('mousedown', onMouseDown, false); 
  
  
  instructions.onclick=function()
  {
    screen1div.style.visibility="hidden";
                      screen1div.style.display="none";
                      screeninstructions.style.visibility="visible";
                      screeninstructions.style.display="";
                      screen2div.style.display="none";
                      screen3div.style.display="none";
  }
                    menu[0].onclick=function()
                    {

                      screen1div.style.visibility="visible";
                      screen1div.style.display="";
                      screen2div.style.visibility="hidden";
                      screen2div.style.display="none";
                    }
               
  menu[1].onclick=function()
                    {

                      screen1div.style.visibility="visible";
                      screen1div.style.display="";
                      screen3div.style.visibility="hidden";
                      screen3div.style.display="none";
                    }

          

                    back[0].onclick=function()
                    {
                      
                      screen1div.style.visibility="visible";
                      screen1div.style.display="";
                      screen2div.style.visibility="hidden";
                      screen2div.style.display="none";
                    }

                     back[1].onclick=function()
                    {
                      
                      screen2div.style.visibility="visible";
                      screen2div.style.display="";
                      screen3div.style.visibility="hidden";
                      screen3div.style.display="none";
                    }
                
                    back[2].onclick=function()
                    {

                      screen1div.style.visibility="visible";
                      screen1div.style.display="";
                      screeninstructions.style.visibility="hidden";
                      screeninstructions.style.display="none";
                    }

	
	playbutton.onclick=function()
  {
    window.location.href = "init.html";
    /* fetchTeachers(loadTeachers);   
    screen1div.style.visibility="hidden";
    screen1div.style.display="none";
    screen2div.style.visibility="visible";
    screen2div.style.display="";
    */
  };

	var screen2buttons = document.getElementsByClassName("s2");
                for (var i = 0; i < screen2buttons.length; i++){
                    screen2buttons[i].onclick=function()
                    {
                    	
                   		screen2div.style.visibility="hidden";
                      screen2div.style.display="none";
                   		screen3div.style.visibility="visible";
                      screen3div.style.display="";
                    }
                }
                  var screen3buttons = document.getElementsByClassName("s3");
                for (var i = 0; i < screen3buttons.length; i++){
                    screen3buttons[i].onclick=function()
                    {
                      window.open('gameplay.html',"_self");
                      }
                    }

}
