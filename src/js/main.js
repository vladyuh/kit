//Remove animations on load
window.onload = function () {
    document.querySelector("body").classList.remove("perf-no-animation");
};

//Check webp support
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support === true) {
        document.querySelector("body").classList.add("webp");
    } else {
        document.querySelector("body").classList.add("no-webp");
    }
});

//100vh hack
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
window.addEventListener("resize", function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
});

//Mobile menu init
function mobileMenu() {
    var toggle = document.querySelector(".header-burger .burger");
    var menu = document.querySelector(".mobileMenu");
    var body = document.querySelector("body");

    this.onOpen = function () {
        toggle.classList.add("open");
        menu.classList.add("opened");
        body.classList.add("mobile");
        return true;
    };

    this.onClose = function () {
        toggle.classList.remove("open");
        menu.classList.remove("opened");
        body.classList.remove("mobile");
    };

    this.onToggle = function () {
        toggle.classList.toggle("open");
        menu.classList.toggle("opened");
        body.classList.toggle("mobile");
    };

}

var mobile = new mobileMenu();

document.querySelector(".header-burger .burger").addEventListener("click", function (e) {
    e.preventDefault();
    mobile.onOpen();
});

document.querySelector(".mobileMenu-header__toggle .burger").addEventListener("click", function (e) {
    e.preventDefault();
    mobile.onClose();
});

var navLinks = document.querySelectorAll(".mobileMenu-nav__ul li a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        mobile.onClose();
    });
}

//Browser-level image lazy-loading
if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img[loading=\"lazy\"]");
    for (var i = 0; i < images.length; i++) {
        images[i].src = images[i].dataset.src;
    }
}
else {
    const script = document.createElement("script");
    script.src = "/js/lazysizes.min.js";
    document.body.appendChild(script);
}

//smart neader - hide on scroll down and show on scroll up
let previousScrollPosition = 0;
const isScrollingDown = () => {
    let currentScrolledPosition = window.scrollY || window.pageYOffset;
    let scrollingDown;

    if (currentScrolledPosition > previousScrollPosition) {
        scrollingDown = true;
    } else {
        scrollingDown = false;
    }
    previousScrollPosition = currentScrolledPosition;
    return scrollingDown;
};

const nav = document.querySelector("header");

function handleNavScroll() {
    if (isScrollingDown() && !nav.contains(document.activeElement)) {
        nav.classList.add("scroll-down");
        nav.classList.remove("scroll-up");
    } else {
        nav.classList.add("scroll-up");
        nav.classList.remove("scroll-down");
    }

    if (window.scrollY || window.pageYOffset === 0) {
        nav.classList.remove("scroll-up");
    }

}

function scrollTop() {
    if (window.pageYOffset > 0) {
        this.document.querySelector(".scroll-top").classList.add("is-active");
    }
    else {
        this.document.querySelector(".scroll-top").classList.remove("is-active");
    }
}

window.addEventListener("scroll", () => {

    //Smart header
    handleNavScroll();

    //Scroll to top btn
    scrollTop();

});

//Scroll to top btn
scrollTop();
document.querySelector(".scroll-top").addEventListener("click", function (){
    window.scroll({top: 0, left: 0, behavior: "smooth"});
});

//Check if touch device
function isTouchDevice() {
    return (("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

//Load scripts after page load
window.addEventListener("load", function () {

    var splide = document.createElement("script");
    splide.src = "/js/splide.min.js";
    //splide.onload = initSliders;
    //document.body.appendChild(splide);

    var select = document.createElement("script");
    select.src = "/js/select.min.js";
    select.onload = function () {
        const selectCustom = new customSelect({
            selector: "select"
        });
        selectCustom.init();
    };
    document.body.appendChild(select);

    if(isTouchDevice()){

        document.body.classList.add("touch");

        var hammer = document.createElement("script");
        hammer.src = "/js/hammer.min.js";
        hammer.onload = function () {
            var body = document.body;
            var menu = document.querySelector(".mobileMenu");

            new Hammer(body).on("swiperight", function(ev) {
                mobileMenu.onOpen();
            });

            new Hammer(menu).on("swipeleft", function(ev) {
                mobileMenu.onClose();
            });

        };
        document.body.appendChild(hammer);
    }
});

//more btn for header navbar
window.addEventListener("load", griddynav);
window.addEventListener("resize", griddynav);
function griddynav(){
    var hiddenLi = document.querySelectorAll(".header-nav__ul li");
    var submenu = document.querySelector(".header-nav__more ul.submenu");
    var moreBtn = document.querySelector(".header-nav__moreLi");

    var hidden = [];

    if(submenu.hasChildNodes()){
        submenu.innerHTML = "";
    }

    hiddenLi.forEach(function (element){
        if(!(element.offsetWidth > 0 && element.offsetHeight > 0))
        {
            hidden.push(element);
        }
    });

    if(hidden.length !== 0){
        moreBtn.style.display = "block";
        hidden.forEach(function (element){
            if(!(element.offsetWidth > 0 && element.offsetHeight > 0))
            {
                submenu.appendChild(element.cloneNode(true));
            }
        });
    }
    else{
        moreBtn.style.display = "none";
    }
}

//open popup
var popupLink = document.querySelectorAll("a[data-popup]");
popupLink.forEach(function (element){
    element.addEventListener("click", function (e){
    });
});
//close popups
var popupClose = document.querySelectorAll(".popup__wrp");
popupClose.forEach(function (element){
    element.addEventListener("click", function (e){
        if(e.target !== e.currentTarget)
        {
            console.log("clicked on popup");
        }
        else{
            console.log("clicked on popup wrapper");
            window.location.href="#close";
        }
    });
});
