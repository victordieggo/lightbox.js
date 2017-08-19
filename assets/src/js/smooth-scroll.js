/* =====================================================================
 * SMOOTHSCROLL
 * ===================================================================*/
/*global window, document, clearInterval, setInterval*/

(function () {
    'use strict';
    function smoothScroll(anchor, duration) {
        var startLocation = window.pageYOffset,
            endLocation = anchor.offsetTop,
            distance = endLocation - startLocation,
            increments = distance / (duration / 16),
            stopAnimation,
            runAnimation,
            animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };
        if (increments >= 0) {
            stopAnimation = function () {
                var travelled = window.pageYOffset;
                if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
                    clearInterval(runAnimation);
                }
            };
        } else {
            stopAnimation = function () {
                var travelled = window.pageYOffset;
                if (travelled <= (endLocation || 0)) {
                    clearInterval(runAnimation);
                }
            };
        }
        runAnimation = setInterval(animateScroll, 16);
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-scroll]'), function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            var dataID = toggle.getAttribute('href'),
                dataTarget = document.querySelector(dataID),
                dataSpeed = toggle.getAttribute('data-speed');
            if (dataTarget) {
                smoothScroll(dataTarget, dataSpeed || 500);
            }
        }, false);
    });
}());
