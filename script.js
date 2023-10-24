var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnimation() {
    var tl = gsap.timeline();
    tl.from("#navbar", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    });
    tl.to(".boundelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2
    });
    tl.from("#footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    });
}

function circleSkewer() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        mouseTracker(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function mouseTracker(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleSkewer();
mouseTracker(1, 1);
firstPageAnimation();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            zIndex: 999,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

function updateTime() {
    const timeElement = document.getElementById("time");

    const currentDate = new Date();
    const utcTime = currentDate.getTime();
    const istOffsetMilliseconds = 5.5 * 60 * 60 * 1000;

    const istTime = new Date(utcTime + istOffsetMilliseconds);
    const hours = String(istTime.getUTCHours()).padStart(2, '0');
    const minutes = String(istTime.getUTCMinutes()).padStart(2, '0');
    const timeZone = "IST";

    const timeString = `${hours}:${minutes} ${timeZone}`;
    timeElement.textContent = timeString;
}

updateTime();
setInterval(updateTime, 60000);