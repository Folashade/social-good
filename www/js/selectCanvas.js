var canvas = document.getElementById("selectCanvas");
var ctx = canvas.getContext("2d");

var jCanvas = $('#selectCanvas');
jCanvas.prop('width', jCanvas.width());
jCanvas.prop('height', jCanvas.height());
var teachers=[];

window.htmlWidth = 780;
window.htmlHeight = 540;
window.wr = canvas.width/window.htmlWidth;
window.hr = canvas.height/window.htmlHeight;
var contentList=[];

function selectTeacherScreen(){
  // Variables 
  var verticalOffset = 10;

  // background
  var woodBG = new Image();
  woodBG.src="assets/bg_wood.png";
  ctx.drawImage(woodBG,0,0, woodBG.width*wr, woodBG.height*hr);	

  // Selection Buttons
  var button = new Image();
  button.src="assets/button.png";

  ctx.textAlign="center";
  ctx.font="1.2em Maven Pro";
  ctx.fillStyle="a77c50";
  ctx.textBaseline="middle";

  var rowY=100*hr;
  var x=0;
  for (var i=0; i<3; i++)
  {
       var columnX=80*wr; 
    for(var columns=0; columns<2; columns++)
    {
       if(teachers[x]!=null)
    {
ctx.drawImage(button, columnX, rowY, button.width*wr, button.height*hr);

ctx.fillText(teachers[x], columnX+(145*wr), rowY+(61*hr));
columnX+=(270*wr);
x++;
    }
  }
    rowY+=(110*hr);
  
  }

  // ctx.shadowColor = rgb(1,1,1,0);
  // Back Button
	ctx.font="2em Rumpelstiltskin";
ctx.fillStyle="black";
ctx.shadowColor = 'yellow';
      ctx.shadowBlur = 20;
  ctx.fillText("Menu", 690*wr, 60*hr);
ctx.shadowColor = 'rgba(0,0,0,0)';


}



function selectContentScreen(){
  // Variables 
  var verticalOffset = 10;

  // background
  var woodBG = new Image();
  woodBG.src="assets/bg_wood.png";
  ctx.drawImage(woodBG,0,0, woodBG.width*wr, woodBG.height*hr);	

  // Selection Buttons
  var button = new Image();
  button.src="assets/button.png";

  ctx.textAlign="center";
  ctx.font="1em Maven Pro";
  ctx.fillStyle="#a77c50";


var rowY=100*hr;
  var x=0;
  for (var i=0; i<3; i++)
  {
       var columnX=80*wr; 
    for(var columns=0; columns<2; columns++)
    {
       if(contentList[x]!=null)
    {
ctx.drawImage(button, columnX, rowY, button.width*wr, button.height*hr);

ctx.fillText(contentList[x], columnX+(145*wr), rowY+(61*hr));
columnX+=(270*wr);
x++;
    }
  }
    rowY+=(110*hr);
  
  }
  // Back Button
	ctx.font="2em Rumpelstiltskin";
  ctx.shadowColor = 'yellow';
      ctx.shadowBlur = 20;
ctx.fillStyle="black";


  // Menu Button

  ctx.fillText("Back", 360*wr , 500*hr);
ctx.shadowColor = 'rgba(0,0,0,0)';

}


function render()  {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (screen == 1)
		selectTeacherScreen();
	else if (screen === 2)
		selectContentScreen();
		
}


window.requestAnimFrame = (function(){
  return (window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          }
        );
})();



function onTouchStart(event)  {
  event.preventDefault();
    var touchBox=-1;
      var len = event.touches.length;
      for (var t = 0; t < len; t++)  {
        var cx = event.touches[t].pageX - canvas.offsetLeft;
        var cy = event.touches[t].pageY - canvas.offsetTop;
		    var x=0;
        if (screen == 1) {

if (cx>670*wr && cx<(670+150)*wr && cy>(30*hr) && cy<(30+70)*hr) {

  window.location.href="index.html";

}


               

          var rowY=100*hr;

          for (var i=0; i<3; i++)
          {
           var columnX=80*wr; 
           for(var columns=0; columns<2; columns++)
           {
             if(x<teachers.length)
             {
              
               if (cx>(columnX) && cx<columnX+(289*wr) && cy>(rowY) && cy<rowY+(123*hr)) {
                touchBox=x;
              }
              columnX+=(270*wr);
              x++;
              }
          }
          rowY+=(110*hr);

        }

        
    if(touchBox!==-1)
    {
      fetchByTeacher(teachers[touchBox], loadContent);
			screen = 2;
    }
    }
			
		else if (screen == 2)  {


if (cx>670*wr && cx<(670+150)*wr && cy>(30*hr) && cy<(30+70)*hr) {

  window.location.href="index.html";

}
if (cx>(340*wr) && cx<(340+100)*wr && cy>400*hr && cy<(400+200)*hr) {
screen=1;


}
      x=0;
      touchBox=-1;
      var rowY=100*hr;
      for (var i=0; i<3; i++)
          {
           var columnX=80*wr; 
           for(var columns=0; columns<2; columns++)
           {
             if(x<contentList.length)
             {
 
               if (cx>(columnX) && cx<columnX+(289*wr) && cy>(rowY) && cy<rowY+(123*hr)) {
                touchBox=x;
              }
              columnX+=(270*wr);
              x++;
              }
          }
          rowY+=(110*hr);
        }


	  if(touchBox!==-1)
    {
      window.location.href = "gameplay.html";
      localStorage["setNumber"] = touchBox;
    }
	
    
    }
		
        // Just leave question mode if tap is in the right half, for now
       
        }
        
   
}


function onTouchMove(event) {
  event.preventDefault();
  return;
}

function onTouchEnd(event)  {
  window.touches = [];
  event.preventDefault();
  return;
}



function run()  {
  screen = 1;
  fetchTeachers(loadTeachers);  
  

  canvas.addEventListener('touchstart', onTouchStart, false);
  canvas.addEventListener('touchend', onTouchEnd, false);
  canvas.addEventListener('touchmove', onTouchMove, false);
  canvas.setAttribute('tabindex', '0');
  canvas.focus();
  
  (function animloop()  {
    requestAnimFrame(animloop);
    render();
  })();
}

run();
