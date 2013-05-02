// events.js
// Handlers and helpers for various events (touchmove, mousedown)


function inRadius (x, cx, y, cy, radius) {
  if ((Math.abs(x-cx) <= 2*radius) && (Math.abs(y-cy) <= 2*radius))
    return true;

  else 
    return false;
}

function onTouchStart(event)  {
  event.preventDefault();
  if (window.inQuestion === true)  {
    var touchBox=0, touchBoxX, touchBoxY;
      var len = event.touches.length;
      for (var t = 0; t < len; t++)  {
        var cx = event.touches[t].pageX - canvas.offsetLeft;
        var cy = event.touches[t].pageY - canvas.offsetTop;
        // Just leave question mode if tap is in the right half, for now
        if (cx>bx1 && cx<(bx1+289) && cy>by1 && cy<(by1+123)) {
          touchBox=1;
        }
        
        if (cx>bx2 && cx<(bx2+289) && cy>by1 && cy<(by1+123)) {
          touchBox=2;
        }
        
        if (cx>bx1 && cx<(bx1+289) && cy>by2 && cy<(by2+123)) {
           touchBox=3;
        }
        
        if (cx>bx2 && cx<(bx2+289) && cy>by2 && cy<(by2+123)) {
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
        ctx.fillRect(touchBoxX, touchBoxY, 270, 100);
        setTimeout(leaveQuestionMode, 1200);
        
      }
  }
  if (window.isGameOver === true)  {
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
    }
}



/* function onTouchStart(event)  {
  event.preventDefault();
  var t;
  var l = event.touches.length;
  if (window.verbose === true) console.log(event.touches);
  for (t = 0; t < l; t++)  {   
    var cx = event.touches[t].pageX - canvas.offsetLeft;
    var cy = event.touches[t].pageY - canvas.offsetTop;
    var wasQuestionPopped = false;


    if (window.verbose === true)  {
      console.log (cx + ", " + cy);
    }

    if (window.inQuestion === false)  {
      var i;

      
      for (i = 0; i < balloons.length; i++) {
        curBalloon = balloons[i];
        x = curBalloon.x;
        y = curBalloon.y;
        if ((isQuestionBalloon(curBalloon) === true) &&
            (inRadius(x, cx, y, cy, qRadius) === true) &&
            (curBalloon.popped === false)) {
          balloons[i].popped = true;
          points += qPointsIncr;
          wasQuestionPopped = true;
        }

        else if ((inRadius(x, cx, y, cy, radius) === true) &&
                 curBalloon.popped === false) {
          balloons[i].popped = true;
          points += pointsIncr;
        }
      }
        
      if (wasQuestionPopped === true) {
        enterQuestionMode(); 
      }  
    }

    else if (window.inQuestion === true)  {
      // Just leave question mode if tap is in the right half, for now
      if (cx >= canvas.width/2)  {
        leaveQuestionMode();
      }
    }
  }
} */

/* function onMouseDown(event) {
  var cx = event.pageX - canvas.offsetLeft;
  var cy = event.pageY - canvas.offsetTop;
  var wasQuestionPopped = false;

  if (window.verbose === true)  {
    console.log (cx + ", " + cy);
  }

  if (window.inQuestion === false)  {
    var i;

    
    for (i = 0; i < balloons.length; i++) {
      curBalloon = balloons[i];
      x = curBalloon.x;
      y = curBalloon.y;
      if ((isQuestionBalloon(curBalloon) === true) &&
          (inRadius(x, cx, y, cy, qRadius) === true) &&
          (curBalloon.popped === false)) {
        balloons[i].popped = true;
        points += qPointsIncr;
        wasQuestionPopped = true;
      }

      else if ((inRadius(x, cx, y, cy, radius) === true) &&
               curBalloon.popped === false) {
        balloons[i].popped = true;
        points += pointsIncr;
      }
    }
      
    if (wasQuestionPopped === true) {
      enterQuestionMode(); 
    }  
  }

  else if (window.inQuestion === true)  {
    // Just leave question mode if tap is in the right half, for now
    if (cx >= canvas.width/2)  {
      leaveQuestionMode();
    }
  }

}*/

function onTouchMove(event) {
  event.preventDefault();
  window.touches = event.touches;
  //console.log(window.touches);
  return;
}

function onTouchEnd(event)  {
  window.touches = [];
  event.preventDefault();
  return;
}


// Tap -- from es92's GitHub
function addTappableJQPlugin(){

    $.fn.onButtonTap = function(tapCB, longCB){
        var down = function (){
            this.addClass('buttonDown');
        };
        var up = function (){
            this.removeClass('buttonDown');
        };
        this.ontap(down, up, tapCB, longCB);
    }

    $.fn.ontap = function(downCB, upCB, tapCB, longCB){
        new TapManager(this, downCB, upCB, tapCB, longCB)
    }

    function TapManager(dom, onDown, onUp, onTap, onLong){
        this.dom = dom;
        this.onDown = onDown || function(){ };
        this.onUp = onUp || function(){ };
        this.onTap = onTap || function(){ };
        this.onLong = onLong || function(){ };
        this.bindFnsToDom();

        this.state = {
            startX: 0,
            startY: 0,
            potentialTap: false,
        };

        this.registerEvents();
    }

    TapManager.prototype = {
        //========================
        //  STATE
        //========================
        down: function(x, y){
            this.state.startX = x;
            this.state.startY = y;
            this.state.potentialTap = true;
            this.onDown()
            setTimeout(this.checkLong.bind(this), 500);
        },
        move: function(x, y){
            if (this.state.potentialTap && this.movedTooMuch(x, y)){
                this.state.potentialTap = false;
                this.onUp();
            }
        },
        movedTooMuch: function(x, y){
            return (window.Math.abs(x - this.state.startX) > 10 || 
                    window.Math.abs(y - this.state.startY) > 10);
        },
        up: function(){
            if (this.state.potentialTap){
                this.onUp();
                this.onTap();
                this.state.potentialTap = false;
            }
        },
        exit: function(){
            if (this.state.potentialTap){
                this.state.potentialTap = false;
                this.onUp();
            }
        },
        checkLong: function(){
            if (this.state.potentialTap){
                this.state.potentialTap = false;
                this.onLong();
                this.onUp();
            }
        },

        //========================
        //  INIT
        //========================

        //default jq behavior
        bindFnsToDom: function(){
            this.onDown = this.onDown.bind(this.dom);
            this.onUp = this.onUp.bind(this.dom);
            this.onTap = this.onTap.bind(this.dom);
            this.onLong = this.onLong.bind(this.dom);
        },
        registerEvents: function(){
            if ('ontouchstart' in document.documentElement)
                this.registerTouchEvents();
            else 
                this.registerMouseEvents();
        },
        registerTouchEvents: function(){
            this.dom.on('touchstart', function(event){
                var x = event.originalEvent.touches[0].clientX;
                var y = event.originalEvent.touches[0].clientY;
                this.down(x, y);
            }.bind(this));
            this.dom.on('touchend', function(event){
                this.up();
            }.bind(this));
            this.dom.on('touchleave', function(event){
                this.exit();
            }.bind(this));
            this.dom.on('touchmove', function(event){
                var x = event.originalEvent.touches[0].clientX;
                var y = event.originalEvent.touches[0].clientY;
                this.move(x, y);
            }.bind(this));
        },
        registerMouseEvents: function(){
            this.dom.on('mousedown', function(event){
                this.down(event.clientX, event.clientY);
            }.bind(this));
            this.dom.on('mouseout', function(event){
                this.exit();
            }.bind(this));
            this.dom.on('mouseup', function(event){
                this.up();
            }.bind(this));
        }
    }
}


window.addEventListener('load', function(){
    addTappableJQPlugin();
});

