window.onload=function()
{
	var screen1div = document.getElementById("screen1");
	var screen2div = document.getElementById("screen2");
	var screen3div = document.getElementById("screen3");
  var menu = document.getElementsByClassName("menu");
  var back = document.getElementsByClassName("back");
  var screendiv, currentscreen;

for (var i = 0; i < menu.length; i++){
                    menu[i].onclick=function()
                    {
                      if(i==0)
                        screendiv=screen2div;
                      else
                        screendiv=screen3div;

                      screen1div.style.visibility="visible";
                      screen1div.style.display="";
                      screendiv.style.visibility="hidden";
                      screendiv.style.display="none";
                    }
                }


for (var i = 0; i < back.length; i++){
                    back[i].onclick=function()
                    {
                      if(i==0)
                      {
                        screendiv=screen1div;
                        currentscreen=screen2div;
                      }
                      else
                      {
                        screendiv=screen2div;
                        currentscreen=screen3div;
                      }

                      screendiv.style.visibility="visible";
                      screendiv.style.display="";
                      currentscreen.style.visibility="hidden";
                      currentscreen.style.display="none";
                    }
                }

	var playbutton = document.getElementById("play");
	playbutton.onclick=function()
                    {
                    	
                   		screen1div.style.visibility="hidden";
                      screen1div.style.display="none";
                   		screen2div.style.visibility="visible";
                      screen2div.style.display="";
                    }

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

}