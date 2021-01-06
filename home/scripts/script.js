const navMobileWidth = 600;
const mobileLayoutWidth = 750;




window.addEventListener('resize', resizeHandler);

var isScrolling;
function resizeHandler() {
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(scrollHandleAfterResize , 66);
}

function scrollHandleAfterResize() {
    fadeContent();
}

window.addEventListener("scroll", fadeContent);


function fadeContent() {  
    const divs = document.getElementsByClassName("box-container");
    const images = document.getElementsByClassName("bg-image");
    for (i=0; i < images.length; i++) {
        if (!images[i].classList.contains("image-no-scroll")) {
            var disDivBottomToWinTop = divs[i].getBoundingClientRect().bottom;
            var disDivTopToWinBottom = window.innerHeight - divs[i].getBoundingClientRect().top;
            var winMiddle = window.innerHeight / 2;
            var edge = Math.min(disDivBottomToWinTop, disDivTopToWinBottom)-winMiddle;
            var imgTop;
            var scrollAmnt;
            if (window.innerWidth > mobileLayoutWidth) {
                imgTop = 220;
                scrollAmnt = 0.3;
            }
            else {
                imgTop = -200;
                scrollAmnt = 0.5;
            }
            var imageY = -(winMiddle+((edge*scrollAmnt))-imgTop);
            images[i].style.backgroundPosition = "center " + imageY + "px";
            //images[i].style.backgroundPosition = "center "+((images[i].getBoundingClientRect().height*imgTop)-(disDivTopToWinBottom*scrollAmnt))+"px";
            divs[i].style.opacity = 1.3+(edge/200);
        }
    }
} 

function portfolioLinkGoTo(u) {
    var link = "/"+u+"/";
    window.parent.pageGoTo(link);
}

function revealInformation() {
    document.getElementById("reveal-info-box").style.display = "none";
    document.getElementById("info").style.display = null;
    fadeContent();
}



fadeContent();