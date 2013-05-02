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

function selectTeacherScreen(){
  // Variables 
  // window.teachers = [];
  // window.contentList = [];
  // teachers = window.teachers;
  var verticalOffset = 10;

  // background
  var woodBG = new Image();
  woodBG.src="assets/bg_wood.png";
  ctx.drawImage(woodBG,0,0, woodBG.width*wr, woodBG.height*hr);	

  // Selection Buttons
  var button = new Image();
  button.src="assets/button.png";

  // teachers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  // console.log(teachers)

  ctx.textAlign="center";
  ctx.font="1em Maven Pro";
  ctx.fillStyle="#a77c50";

  for (var row = 1; row < 1+Math.floor((teachers.length)/2) ; row++) {
  	  ctx.drawImage(button, 80*wr, 100*hr*row + (verticalOffset*row), button.width*wr, button.height*hr);
  	  ctx.drawImage(button, 350*wr, 100*hr*row + (verticalOffset*row), button.width*wr, button.height*hr);
  	  ctx.fillText(teachers[row-1], 80*wr+ button.width/4 , 100*hr*row + (verticalOffset*row) + button.height/3);
	  ctx.fillText(teachers[row-1 + 3], 350*wr+ button.width/4 , 100*hr*row + (verticalOffset*row) + button.height/3); 
  }

  // ctx.shadowColor = rgb(1,1,1,0);
  // Back Button
	ctx.font="3em Maven Pro";
  var backButton = new Image();
  backButton.src="assets/balloon_pink.png";
  // ctx.drawImage(backButton, 690*wr, 20*hr, backButton.width*wr, backButton.height*hr);
  ctx.fillText("Back", 690*wr, 60*hr);


  // Menu Button
  var menuButton = new Image();
  menuButton.src="assets/balloon_blue.png";
  // ctx.drawImage(menuButton, 325*wr , 430*hr , menuButton.width*wr, menuButton.height*hr);
  ctx.fillText("Menu", 360*wr , 500*hr);


}

// selectTeacherScreen()


function selectContentScreen(){
  // Variables 
  // window.teachers = [];
  // window.contentList = [];
  // teachers = window.teachers;
  var verticalOffset = 10;

  // background
  var woodBG = new Image();
  woodBG.src="assets/bg_wood.png";
  ctx.drawImage(woodBG,0,0, woodBG.width*wr, woodBG.height*hr);	

  // Selection Buttons
  var button = new Image();
  button.src="assets/button.png";

  // teachers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  // console.log(teachers)

  ctx.textAlign="center";
  ctx.font="1em Maven Pro";
  ctx.fillStyle="#a77c50";

  for (var row = 1; row < 4 ; row++) {
  	  ctx.drawImage(button, 80*wr, 100*hr*row + (verticalOffset*row), button.width*wr, button.height*hr);
  	  ctx.drawImage(button, 350*wr, 100*hr*row + (verticalOffset*row), button.width*wr, button.height*hr);
  	  ctx.fillText(contentList[row-1], 80*wr+ button.width/4 , 100*hr*row + (verticalOffset*row) + button.height/3);
	  ctx.fillText(contentList[row-1 + 3], 350*wr+ button.width/4 , 100*hr*row + (verticalOffset*row) + button.height/3); 
  }

  // ctx.shadowColor = rgb(1,1,1,0);
  // Back Button
	ctx.font="3em Maven Pro";
  var backButton = new Image();
  backButton.src="assets/balloon_pink.png";
  // ctx.drawImage(backButton, 690*wr, 20*hr, backButton.width*wr, backButton.height*hr);
  ctx.fillText("Back", 690*wr, 60*hr);


  // Menu Button
  var menuButton = new Image();
  menuButton.src="assets/balloon_blue.png";
  // ctx.drawImage(menuButton, 325*wr , 430*hr , menuButton.width*wr, menuButton.height*hr);
  ctx.fillText("Menu", 360*wr , 500*hr);


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
    var touchBox=0, touchBoxX, touchBoxY;
      var len = event.touches.length;
      for (var t = 0; t < len; t++)  {
        var cx = event.touches[t].pageX - canvas.offsetLeft;
        var cy = event.touches[t].pageY - canvas.offsetTop;
		if (screen == 1) 
			screen = 2;
			
		else if (screen == 2) 
			window.location.href = "gameplay.html"
		
        // Just leave question mode if tap is in the right half, for now
        if (cx>bx1*wr && cx<(bx1+289)*wr && cy>by1*hr && cy<(by1+123)*hr) {
          touchBox=1;
        }
        
        if (cx>bx2*wr && cx<(bx2+289)*wr && cy>by1*hr && cy<(by1+123)*hr) {
          touchBox=2;
        }
        
        if (cx>bx1*wr && cx<(bx1+289)*wr && cy>by2*hr && cy<(by2+123)*hr) {
           touchBox=3;
        }
        
        if (cx>bx2*wr && cx<(bx2+289)*wr && cy>by2*hr && cy<(by2+123)*hr) {
          touchBox=4;
        }
        
        if(touchBox===1 || touchBox===3)
          touchBoxX=bx1;
        else
          touchBoxX=bx2;

        if(touchBox===1 || touchBox===2)
          touchBoxY=by1;
        else
          touchBoxY=by2;

        //TODO: Make sure that touchBox actually exists!
        
        if (touchBox !== 0)  {
          if (currentSet.questions[questionNumber].answers[touchBox-1].correct===true)
          {
            if (wasTouched === false)  {
              points+=qPointsIncr;
              correctNumberofqs++;
              for (var c = 0; c < 3; c++) {
                $("#"+colors[c]).height(""+waterLevels[c]*100+"%");
              }
             

              waterLevels = map(qIncreaseLevel, waterLevels);
              ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
              wasTouched = true;
            }
          }
          else
          {
            if (wasTouched === false)  {
              ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
              wasTouched = true;
            }
          }
        }
        ctx.fillRect(touchBoxX*wr, touchBoxY*hr, 270*wr, 100*hr);
        setTimeout(leaveQuestionMode, 1200);
        
      }

  /* if (window.isGameOver === true)  {
      var len = event.touches.length;
      for (var t = 0; t < len; t++)  {
        var cx = event.touches[t].pageX - canvas.offsetLeft;
        var cy = event.touches[t].pageY - canvas.offsetTop;
        // Just leave question mode if tap is in the right half, for now
        if (cx>450 && cx<(754) && cy>100 && cy<(444)) 
        {
          
          startGame();
        }
        console.log(cx);
        if (cx>225 && cx<(320) && cy>262 && cy<(540)) 
        {
          console.log(cx);
          window.open('index.html',"_self");
        }
      }
    } */
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
  fetchByTeacher("epintar", loadContent);

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