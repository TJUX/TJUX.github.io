var navPosTarget;
var mobileMinWidth = 600;
var frame = document.getElementById("id-frame").contentWindow;
document.getElementById("id-screen-toggle").addEventListener("click",toggleMobile);
document.getElementById("global-nav-menu-button").addEventListener("click",toggleGlobalMenu);
var zoomButtons = document.getElementsByClassName("zoom-button");
zoomButtons[0].addEventListener("click",function(){zoomInOut(this);});
zoomButtons[1].addEventListener("click",function(){zoomInOut(this);});
var zoomLevel = 8;//default

function getParams() {
  var queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("mobile")) {
    toggleMobile();
    var paramZoom = urlParams.get("mobile");
    zoomOnLoad(paramZoom);
  }
  if (urlParams.get("navopen")) {
    clickNavButton();
  }

  var pathArray = window.location.pathname.split('/');
  if (pathArray[1] != "home" && pathArray[1] != "about") {
    if ((urlParams.get("hidenav")=="true") || (!urlParams.has("hidenav"))) {
      hideNav();
    }
  }
}

function hideNav() {
  document.getElementById("id-frame").style.padding = "0px";
  document.getElementById("id-global-nav").style.display = "none";
}

function getMobileEnabled() {

  if (document.getElementById("id-content").classList.contains("mobile-emulation")) {
    return true;
  }
  else {
    return false;
  }
}

function windowWiderThanMobileMin() {
  var isBigEnough;
  if (window.innerWidth <= mobileMinWidth) {
    isBigEnough = false;
  }
  else {
    isBigEnough = true;
  }
  return isBigEnough;
}

function screenButtonsAjd() {

  if (!windowWiderThanMobileMin())  {
  }
  else {
    var ele;
    if (getMobileEnabled()) {
      ele = document.getElementById("id-nav-mobile");
      ele.style.backgroundImage = "url('/images/sidebar-mobile.png')";
      ele.classList.add("selected");
      ele = document.getElementById("id-nav-desktop");
      ele.style.backgroundImage = "url('/images/sidebar-desktop-noselect.png')";
      ele.classList.remove("selected");
    }
    else {
      ele = document.getElementById("id-nav-desktop");
      ele.style.backgroundImage = "url('/images/sidebar-desktop.png')";
      ele.classList .add("selected");
      ele = document.getElementById("id-nav-mobile");
      ele.style.backgroundImage = "url('/images/sidebar-mobile-noselect.png')";
      ele.classList.remove("selected");
    }
  }
}



function toggleMobile() {
  if ((windowWiderThanMobileMin()) || ((!windowWiderThanMobileMin())  && getMobileEnabled()))  {
    var ele = document.getElementById("id-content");
    ele.classList.toggle("mobile-emulation");
    ele.classList.remove("mobile-zoom-5");
    ele.classList.remove("mobile-zoom-6");
    ele.classList.remove("mobile-zoom-7");
    ele.classList.remove("mobile-zoom-8");
    ele.classList.remove("mobile-zoom-9");
    ele.classList.remove("mobile-zoom-10");
    if (getMobileEnabled()) {
      setZoomLevelToScreenSize();
      ele.classList.add("mobile-zoom-"+zoomLevel);
      document.getElementById("id-zoom").style.display =  null;
      document.getElementById("id-page-container").style.overflowY =  "scroll";
    }
    else {
      document.getElementById("id-zoom").style.display = "none";
      document.getElementById("id-page-container").style.overflowY =  null;
      
    }
    navPos();
    screenButtonsAjd();
  }
}
function setZoomLevelToScreenSize() {
  if (window.innerHeight < 600) {
    zoomLevel = 6;
  }
  if (window.innerHeight < 500) {
    zoomLevel = 5;
  }
}
function zoomInOut(u,r) {
  var list = document.getElementById("id-content").classList;
  list.remove("mobile-zoom-"+zoomLevel);
  if (u.classList.contains("zoom-plus")) {
    if (zoomLevel < 10) {
      zoomLevel ++;
    }
  }
  else {
    if (zoomLevel > 5) {
      zoomLevel --;
    }
  }

  list.add("mobile-zoom-"+String(zoomLevel));
  navPos();
}

function zoomOnLoad(u) {
  var list = document.getElementById("id-content").classList;
  list.remove("mobile-zoom-"+zoomLevel);
  zoomLevel = u;
  list.add("mobile-zoom-"+zoomLevel);
}


window.addEventListener("resize", navPos);

function navPos() {

  if (!windowWiderThanMobileMin()) {
    toggleMobile();

    if (document.getElementById("id-global-nav").classList.contains("global-nav-menu-open")) {
      toggleGlobalMenu();
    }
  }
  screenButtonsAjd();
  hideNavOnScroll("up");


}



function pageGoTo(u) {
  var loc = window.location.pathname;
  var dir = loc.substring(1, loc.lastIndexOf('/'));
  
  var page = u;

  const parList = [];
  if (getMobileEnabled()) {
    var mob = ("mobile"+"="+zoomLevel);
    parList.push(mob);
  }
  
  parList.push("hidenav=false");
  if (parList.length != 0) {
    var pre = "?";
    for (i=0; i < parList.length; i++) {
      page = page.concat(pre+parList[i]);
      if (pre == "?") {
        pre = "&";
      }
    }
  }
  window.location.href = page;

}

function toggleGlobalMenu() {
  var nav = document.getElementById("id-global-nav");
  var navButton = document.getElementById("global-nav-menu-button");
  var navLogo = document.getElementById("global-nav-logo");
  if (!nav.classList.contains("global-nav-menu-open")) {
    nav.classList.add("global-nav-menu-open");
    navLogo.classList.add("global-nav-menu-open");
    navButton.style.backgroundImage = "url('/images/menu-close.png')";
  }
  else {
    nav.classList.remove("global-nav-menu-open");
    navLogo.classList.remove("global-nav-menu-open");
    navButton.style.backgroundImage = null;
  }
}


function hideNavOnScroll(u) {
  if (u == "down" && !windowWiderThanMobileMin()) {
    document.getElementById("id-global-nav").classList.add("global-nav-menu-scrollhidden");
    document.getElementById("id-frame").classList.add("global-nav-menu-scrollhidden");
  }
  else {
    document.getElementById("id-global-nav").classList.remove("global-nav-menu-scrollhidden");
    document.getElementById("id-frame").classList.remove("global-nav-menu-scrollhidden");
  }
}






getParams();