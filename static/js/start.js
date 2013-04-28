window.onload=function()
{
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
                  var screen3buttons = document.getElementsByClassName("s3");
                for (var i = 0; i < screen3buttons.length; i++){
                    screen3buttons[i].onclick=function()
                    {
                      window.open('gameplay.html',"_self");
                      }
                    }

}