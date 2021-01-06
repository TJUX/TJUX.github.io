//click and drag scrolling

var blockerTimer;
var blocker = document.getElementById("id-blocker");
var curMove = 0;
var touchScroll = false;

var emWidth = 375;

if (touchScroll) {
  (function(){
      var curYPos, curXPos, curMove, curDown;
    
      window.addEventListener('mousemove', function(e){ 
        if (window.innerWidth == emWidth) {
          if(curDown){
            blocker.style.width = "100vw";
            window.scrollBy(curXPos - e.pageX, curYPos - e.pageY);
            curMove += 1;
          }
        }
        }
      );
    
      window.addEventListener('mousedown', function(e){ 
        curYPos = e.pageY; 
        curXPos = e.pageX; 
        curDown = true; 
        curMove = 0;
      });
    
      window.addEventListener('mouseup', function(e){ 
        if (window.innerWidth == emWidth) {
          if (curMove > 10) {
            blockerTimer = window.setTimeout(closeBlocker, 30);
          }
          else {
            blocker.style.width = "0";
          }
          curDown = false; 
        }
      });
  
  })()
}


function closeBlocker() {
  blocker.style.width = "0";
}

var lastScroll = document.body.getBoundingClientRect().y;
window.addEventListener("scroll", function() {
  var currentScroll = document.body.getBoundingClientRect().y;
  //alert(currentScroll);
  var scrollupDown;
  if (currentScroll < lastScroll) {
    scrollupDown = "down";
  }
  else {
    scrollupDown = "up"
  }
  window.top.hideNavOnScroll(scrollupDown);
  lastScroll = currentScroll;
}, false);