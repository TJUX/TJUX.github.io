var navPosTarget;
var mobileMinWidth = 420;
var frame = document.getElementById("id-frame").contentWindow;
document.getElementById("id-nav-main-button").addEventListener("click",clickNavButton);
document.getElementById("id-screen-toggle").addEventListener("click",toggleMobile);
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
  if ((urlParams.get("hidenav")=="true") || (!urlParams.has("hidenav")))  {
    hideNav();
  }
}

function hideNav() {
  document.getElementById("id-global-nav").style.visibility = "hidden";
}

function getMobileEnabled() {

  if (document.getElementById("id-content").classList.contains("mobile-emulation")) {
    return true;
  }
  else {
    return false;
  }
}

function screenButtonsAjd() {

  if (window.innerWidth <= mobileMinWidth)  {
    document.getElementById("id-nav-desktop").style.backgroundImage = "url('/images/sidebar-desktop-noselect.png')";
    document.getElementById("id-nav-mobile").style.backgroundImage = "url('/images/sidebar-mobile-selected.png')";
  }
  else {
    if (getMobileEnabled()) {
      document.getElementById("id-nav-mobile").style.backgroundImage = "url('/images/sidebar-mobile-selected.png')";
      document.getElementById("id-nav-desktop").style.backgroundImage = "url('/images/sidebar-desktop.png')";
    }
    else {
      document.getElementById("id-nav-desktop").style.backgroundImage = "url('/images/sidebar-desktop-selected.png')";
      document.getElementById("id-nav-mobile").style.backgroundImage = "url('/images/sidebar-mobile.png')";
    }
  }
}

function clickNavButton() {
  document.getElementById("id-nav-main-button").classList.toggle("global-nav-main-selected");
  document.getElementsByClassName("global-nav-top")[0].classList.toggle("global-nav-menu-open");
  document.getElementsByClassName("global-nav-top")[1].classList.toggle("global-nav-menu-open");
}

function toggleMobile() {
  if ((window.innerWidth > mobileMinWidth) || ((window.innerWidth <= mobileMinWidth)  && getMobileEnabled()))  {
    var ele = document.getElementById("id-content");
    ele.classList.toggle("mobile-emulation");
    ele.classList.toggle("mobile-zoom-"+zoomLevel);
    if (getMobileEnabled()) {
      document.getElementById("id-zoom").style.display =  null;
      document.getElementById("id-page-container").style.overflowY =  "scroll";
    }
    else {
      document.getElementById("id-zoom").style.display = "none";
      //frame.location.reload();

      document.getElementById("id-page-container").style.overflowY =  null;
      
    }
    navPos();
    screenButtonsAjd();
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

  if (document.getElementById("id-content").classList.contains("mobile-emulation")) { 
    navPosTarget = document.getElementById("id-page-container");
  }
  else {
    navPosTarget = frame.document.getElementById("width-calc")
  }
  if (navPosTarget) {
    winWidth = navPosTarget.clientWidth;
    document.getElementById("id-global-nav").style.left = winWidth+"px";
  }
  screenButtonsAjd();
  if (window.innerWidth < mobileMinWidth) {
    toggleMobile();
  }

}

document.getElementById("id-global-nav-next").addEventListener("click",function(){pageGoTo(this.id)});
document.getElementById("id-global-nav-prev").addEventListener("click",function(){pageGoTo(this.id)});

function pageGoTo(u) {
  var loc = window.location.pathname;
  var dir = loc.substring(1, loc.lastIndexOf('/'));
  
  if (u == "id-global-nav-next") {
    var page;
    switch(dir) {
      case("guided-breathing") : page = "/portfolio/"; break;
      case("portfolio") : page = "/hush-the-world/"; break;
      case("hush-the-world") : page = "/guided-breathing/"; break;
    }
  }
  else {
    switch(dir) {
      case("guided-breathing") : page = "/hush-the-world/"; break;
      case("portfolio") : page = "/guided-breathing/"; break;
      case("hush-the-world") : page = "/portfolio/"; break;
    }
  }
  

  const parList = [];
  if (getMobileEnabled()) {
    var mob = ("mobile"+"="+zoomLevel);
    parList.push(mob);
  }
  if (document.getElementById("id-nav-main-button").classList.contains("global-nav-main-selected")) {
    var navOpen = ("navopen=true");
    parList.push(navOpen);
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


window.onclick = function(event) {
  if ((!event.target.classList.contains('nav-identify')) ){
    closeNav();
  }
}

function closeNav() {
  if (document.getElementById("id-nav-main-button").classList.contains("global-nav-main-selected")) {
    document.getElementById("id-nav-main-button").classList.toggle("global-nav-main-selected");
    document.getElementsByClassName("global-nav-top")[0].classList.toggle("global-nav-menu-open");
    document.getElementsByClassName("global-nav-top")[1].classList.toggle("global-nav-menu-open");
  }
}



getParams();