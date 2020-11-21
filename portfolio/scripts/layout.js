var myEvent;
var ignoreClicks = false;
var portfolioItems;


window.addEventListener('resize', adjustDisplayOptions);

myEvent = document.getElementById("button-grid");
myEvent.addEventListener("click", toggleGrid);

myEvent = document.getElementById("button-full-width");
myEvent.addEventListener("click", toggleFullWidth);

myEvent = document.getElementById("id-back-to-top");
myEvent.addEventListener("click", scrollToTop);


init();
originalOrder();
createPortfolioItems();
loadAllBgImages();

function init() {
    document.body.onload = closeLoadingScreen;
    document.getElementById("id-loading").style.width= "100%";
}


function scrollToTop() {
    document.getElementById("top").scrollIntoView({behavior: "smooth", block: "start"});
}


function closeLoadingScreen() {
    document.getElementById("id-loading").style.width= "0px";
}


function closeLoadingSmall() {
    document.getElementById("id-loading-small").style.width = null;
}
function openLoadingSmall() {
    document.getElementById("id-loading-small").style.width= "100%";
}

function adjustDisplayOptions() {
    if (window.innerWidth >= 1980) {
        var nav = document.getElementById("id-nav");
        var offset = nav.offsetLeft+nav.offsetWidth;
        document.getElementById("id-display-options").style.left = (offset)+"px";
    }
    else {
        document.getElementById("id-display-options").style.left = null;
    }
}


function originalOrder() {
    portfolioItems = [
        "21270809",
        "21270047",
        "21270088",
        "21270351",
        "21285429",
        "21270630",
        "21270818",
        "21270820",
        "21270712",
        "38502763",
        "21270861",
        "21270916",
        "21617700",
        "30686192",
        "68375932",
        "30686193",
        "30686194",
        "21270031",
        "30686195",
        "41669065",
        "21276934",
        "47360655",
        "53887695",
        "84936230"
    ];
}
function createPortfolioItems() {
    for (i=0; i < portfolioItems.length; i++) {
        var portfolioItem = document.createElement("DIV");
        portfolioItem.classList.add("portfolio-item");
        portfolioItem.classList.add("display-toggle");
        portfolioItem.classList.add("display-grid");
        portfolioItem.id = portfolioItems[i];
        document.getElementById("grid-main").appendChild(portfolioItem);
        var innerImg = document.createElement("IMG");
        portfolioItem.appendChild(innerImg);
        portfolioItem.addEventListener("click", function() {selectItem(this)});
    }
}


function toggleGrid() {
    document.getElementById("button-grid").style.backgroundImage = "url('images/ui/icon-grid-select.png')";
    document.getElementById("button-full-width").style.backgroundImage = "url('images/ui/icon-full-width.png')";
    var b = document.getElementsByClassName("display-toggle");
    for (i=0; i < b.length; i++) {
        if (b[i].classList.contains("display-full-width")) {
            b[i].classList.remove("display-full-width");
        }
        b[i].classList.add("display-grid");
    }
    deselectAll();
    scaleAllImages();
    loadAllBgImages();
    document.getElementById("id-frame-content").scrollTop = 0;
    document.getElementById("top").scrollIntoView({behavior: "auto", block: "start"});
    removeX();
}


function scaleAllImages() {
    var a = document.getElementsByClassName("portfolio-item");
    for (i=0; i < a.length; i++) {
        scaleImage(a[i]);
    }
}


function toggleFullWidth() {
    document.getElementById("button-grid").style.backgroundImage = "url('images/ui/icon-grid.png')";
    document.getElementById("button-full-width").style.backgroundImage = "url('images/ui/icon-full-width-select.png')";
    var b = document.getElementsByClassName("display-toggle");
    for (i=0; i < b.length; i++) {
        if (b[i].classList.contains("display-grid")) {
            b[i].classList.remove("display-grid");
        }
        b[i].classList.add("display-full-width");
    }
    var a = document.getElementsByClassName("portfolio-item");
    for (i=0; i < a.length; i++) {
        scaleImage(a[i]);
    }
    loadAllBgImages();

    originalOrder();
    var main = document.getElementById("grid-main");
    for (i=0; i < portfolioItems.length; i++) {
        main.append(document.getElementById(portfolioItems[i]));
    }
    document.getElementById("id-frame-content").scrollTop = 0;
    document.getElementById("top").scrollIntoView({behavior: "auto", block: "start"});
    removeX();
}


function loadAllBgImages() {
    var a = document.getElementsByClassName("portfolio-item");
    for (i=0; i < a.length; i++) {
        var p;
        if (a[i].classList.contains("display-full-width") || a[i].classList.contains("display-selected")) {
            p = false;
        }
        else {
            p = true;
        }
        loadBgImage(a[i],p);
    }
}


function loadBgImage(u, f) {

    var preview;
    if (f) {
        preview = "-preview";
    }
    else {
        preview = "";
    }
    var fileExtension = ".jpg";
    if (u.id == "38502763") {
        fileExtension = ".gif";
    }
    
    u.style.backgroundImage = "url('images/portfolio/"+u.id+preview+fileExtension+"')";
    
}


function scaleImage(u) {
    if (u.classList.contains("display-full-width") || u.classList.contains("display-selected")) {
        u.style.backgroundSize = "contain";
        u.style.minHeight = "200px";
        u.style.height = "auto";
        var fileExtension = ".jpg";
        if (u.id == "38502763") {
            fileExtension = ".gif";
        }
        addImage(u, u.id+fileExtension);
    }
    else {
        u.style.backgroundSize = null;
        removeImage(u);
        u.style.height = null;
        u.style.minHeight = null;
    }
    
}


function addImage(u, r) { 
    var img = u.firstChild; 
    img.src =  "images/portfolio/"+r;
} 
function removeImage(u) {
    var img = u.firstChild; 
    img.src =  "";
}


function selectItem(p) {
    if (!ignoreClicks) {
        if (!p.classList.contains("display-selected")) {
            if (p.classList.contains("display-grid")) {
                deselectAll();
                p.classList.add("display-selected");
                scaleAllImages();  
                loadBgImage(p,false);

                openLoadingSmall();

                var main = document.getElementById("grid-main");
                if (p.classList.contains("display-grid")) {

                    //find this image's position in the array
                    var startingPoint = portfolioItems.indexOf(p.id);

                    for (i = 0; i < (startingPoint); i++){
                        var removed = portfolioItems.shift();
                        portfolioItems.push(removed);
                        main.append(document.getElementById(portfolioItems[portfolioItems.length-1]));
                    }
                    
                }
                p.scrollIntoView({behavior: "auto", block: "center"});
            }
            else {
                p.scrollIntoView({behavior: "smooth", block: "center"});
            }
            addX(p);
        }
    }
    ignoreClicks = false;
}


function addX(div) {
    removeX();
    if (div.classList.contains("display-grid")) {
        var x = document.createElement("DIV");
        x.classList.add("close");
        x.id = "id-close";
        x.innerHTML = "x";
        x.addEventListener("click",clickX); 
        div.prepend(x);
    }
}


function clickX() {
    ignoreClicks = true;
    deselectAll();
    scaleAllImages();
    removeX();
}

function removeX() {
    a = document.getElementById("id-close");
    if (a) {
        a.remove();
    }
}


function deselectAll() {
    var a = document.getElementsByClassName("display-selected");
    for(i=0; i < a.length; i++) {
        a[i].classList.remove("display-selected");
    }
    loadAllBgImages();
    closeLoadingSmall();
}