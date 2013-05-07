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

        if (touchBox !== 0)  {
          if (currentSet.questions[questionNumber].answers[touchBox-1].correct===true)
          {
            if (wasTouched === false)  {
              points+=qPointsIncr;
              correctNumberofqs++;
              for (var c = 0; c < 3; c++) {
                // Increase water levels in CSS
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
      }
      window.feedbackFill = true;
      window.feedbackFillStyle = ctx.fillStyle;
      window.touchBoxX = touchBoxX;
      window.touchBoxY = touchBoxY;
      leaveQ_wrapper();
  }
}


function onTouchMove(event) {
  event.preventDefault();
  if (window.isGameOver === false)
    window.touches = event.touches;
  
  else {
    //Menu has priority over replay
    for (var i = 0; i < event.touches.length; i++)  {
      var cx = event.touches[i].pageX - canvas.offsetLeft;
      var cy = event.touches[i].pageY - canvas.offsetTop;

      if ((300*wr < cx && cx < (300+181)*wr) &&
          (330*hr < cy && cy < (330+193)*hr))  {
        window.location.href = "index.html";
      }

      if ((525*wr < cx && cx < (525+304)*wr) &&
          (100*hr < cy && cy < (100+344)*hr))     {
        startGame();
      }
    }
  }
  
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

