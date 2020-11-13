function navMenuShow() {
document.getElementById("nav-menu-top").classList.toggle("nav-menu-show");
document.getElementById("nav-icon-top").classList.toggle("nav-icon-highlight");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if ((!event.target.matches('.nav-menu-icon')) && (!event.target.matches('.nav-menu-contents'))){
        if (document.getElementById("nav-menu-top").classList.contains('nav-menu-show')) {
        document.getElementById("nav-menu-top").classList.remove('nav-menu-show');
        document.getElementById("nav-icon-top").classList.toggle("nav-icon-highlight");
        document.body.classList.toggle("fixed-position");
        }
    }
}



let currentTrack;
function swapPlayerContent(clicked_id) {
currentTrack = clicked_id;
if (checkPlayerState()) {
    playerUp();
} else {
    playerDown();
}
}

function loadNewContent() {
switch (currentTrack) {
    case "forest_waterfall":
    document.getElementById("audio-title").innerHTML =
        "Forest Waterfall";
    document.getElementById("audio-player-iframe").src =
        "https://bandcamp.com/EmbeddedPlayer/track=1835097131/size=small/bgcol=333333/linkcol=e99708/artwork=none/transparent=true/";
    break;
    case "waves_dusk":
    document.getElementById("audio-title").innerHTML =
        "Ocean Waves at Dusk";
    document.getElementById("audio-player-iframe").src =
        "https://bandcamp.com/EmbeddedPlayer/track=3636598165/size=small/bgcol=333333/linkcol=e99708/artwork=none/transparent=true/";
    break;
    case "bass":
    document.getElementById("audio-title").innerHTML =
        "White Noise with Bass Hum";
    document.getElementById("audio-player-iframe").src =
        "https://bandcamp.com/EmbeddedPlayer/track=138982071/size=small/bgcol=333333/linkcol=e99708/artwork=none/transparent=true/";
    break;
    case "crisp_white_noise":
    document.getElementById("audio-title").innerHTML =
        "Crisp White Noise";
    document.getElementById("audio-player-iframe").src =
        "https://bandcamp.com/EmbeddedPlayer/track=1254914166/size=small/bgcol=333333/linkcol=e99708/artwork=none/transparent=true/";
    break;
    case "roaring-fire":
    document.getElementById("audio-title").innerHTML =
        "Roaring Festive Fire";
    document.getElementById("audio-player-iframe").src =
        "https://bandcamp.com/EmbeddedPlayer/track=4284257001/size=small/bgcol=333333/linkcol=e99708/artwork=none/transparent=true/";
    break;
    case "rainy-sunday":
    document.getElementById("audio-title").innerHTML =
        "Rainy Sunday";
    document.getElementById("audio-player-iframe").src =
        "https://bandcamp.com/EmbeddedPlayer/track=1787039368/size=small/bgcol=333333/linkcol=e99708/artwork=none/transparent=true/";
    break;
}
}

function checkPlayerState() {
let isUp = document
    .getElementById("audio-player")
    .classList.contains("audio-player-hide");
return isUp;
}

function playerDown() {
    document
    .getElementById("audio-player")
    .classList.add("audio-player-hide");
    setTimeout(playerUp, 200);
}
function playerUp() {
    loadNewContent();
    document
    .getElementById("audio-player")
    .classList.remove("audio-player-hide");
}

function collapseContent(clicked, clicked_id) {
var x = document.getElementsByClassName("collapsible-content");
var i;
for (i = 0; i < x.length; i++) {
    if (x[i].classList.contains(clicked_id)) {
    if (x[i].classList.contains("collapsed")) {
        x[i].classList.remove("collapsed");
    }
    else {
        x[i].classList.add("collapsed");
    }
    }
    else {
    x[i].classList.add("collapsed");
    }
}
moreLessInfo();
}
function autoScrollTo(el) {
    var top = $("#" + el ).offset().top;
    $("html, body").animate({ scrollTop: top }, 1000);
}
function moreLessInfo() {
    c = document.getElementsByClassName("moreinfo");
    for (i = 0; i < c.length; i++) {
        if (c[i].nextElementSibling.classList.contains("collapsed")) {
        c[i].innerHTML = "More info ⯈";
        }
        else {
        c[i].innerHTML = "Less info ⯆";
        }
    }
}

navPosTarget = document.getElementById;
/*expand nav menu sub items*/
var coll = document.getElementsByClassName("nav-menu-item");
var i;
for (i = 0; i < coll.length; i++) {
  
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    if (content) {
      if (content.classList.contains("nav-sub-menu")) {
          var str = this.innerHTML;
          var rep;
        if (content.style.maxHeight) {
          rep = str.replace(/⯆/gi, "⯈");
          this.innerHTML = rep;
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          var rep = str.replace(/⯈/gi, "⯆");
          this.innerHTML = rep;
        }
      }
    }
  });
}