// TYPED JS
var typed = new Typed(".typedjs-sub", {
    strings: [
        "Front-End Developer", "Web Designer", "Creative Problem-Solver"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    startDelay: 200,
    backDelay: 1200,
    loop: true,
    showCursor: true,
    fadeOut: false,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 700,
    smartBackspace: true,
});




// SMOOTH SCROLL
var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
if (!isMobile) {
    luxy.init({
        wrapper: '#smooth-wrapper',
        wrapperSpeed: 0.075,

    });
}