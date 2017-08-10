/* =====================================================================
 * SPACEMAN MOBILE NAVIGATION
 * ===================================================================*/
/*global window, document*/

(function () {

    'use strict';

    var page        = document.documentElement,
        screenCover = document.createElement('div'),
        navBtn      = document.querySelector('.nav-btn'),
        nav         = document.querySelector('.main-nav'),
        parentItem  = document.querySelectorAll('.menu-item-has-children');

    function mobileNavigation() {
        nav.classList.toggle('main-nav-is-active');
        page.classList.toggle('hide-overflow');
        if (document.querySelector('.screen-cover')) {
            page.removeChild(screenCover);
        } else {
            screenCover.setAttribute('class', 'screen-cover fixed full-size');
            page.appendChild(screenCover);
        }
    }

    Array.prototype.forEach.call(parentItem, function (element) {
        element.querySelector('a').addEventListener('click', function (event) {
            event.preventDefault();
        });
        element.addEventListener('click', function () {
            if (window.innerWidth <= 992) {
                this.classList.toggle('menu-item-is-active');
                this.querySelector('ul').addEventListener('click', function (event) {
                    event.stopPropagation();
                });
            }
        });
    });

    function resizeFallback() {
        if (nav.classList.contains('main-nav-is-active')) {
            if (window.innerWidth <= 992) {
                page.appendChild(screenCover);
                page.classList.add('hide-overflow');
            } else {
                page.removeChild(screenCover);
                page.classList.remove('hide-overflow');
            }
        }
    }

    navBtn.addEventListener('click', mobileNavigation);
    screenCover.addEventListener('click', mobileNavigation);
    window.addEventListener('resize', resizeFallback);

}());
