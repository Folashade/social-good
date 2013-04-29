es = [];


function inRadius (x, cx, y, cy, radius) {
  if ((Math.abs(x-cx) <= 2*radius) && (Math.abs(y-cy) <= 2*radius))
    return true;

  else 
    return false;
}


function onTouchStart(event)  {
  event.preventDefault();
  var t;
  var l = event.touches.length;
  console.log(event.touches);
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
}

function onMouseDown(event) {
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

}

function onTouchMove(event) {
  event.preventDefault();
  return;
}

function onTouchEnd(event)  {
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
