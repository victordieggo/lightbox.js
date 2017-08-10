/* =====================================================================
 * LIGHTBOX
 * ===================================================================*/
/*global window, document, console*/

(function () {

    'use strict';

    var btnLightbox = document.querySelectorAll('.btn-lightbox'),
        closeBtn    = document.createElement('button'),
        container   = document.createElement('div'),
        screenCover = document.createElement('div'),
        body        = document.body;

    function lockScreen() {
        body.classList.toggle('hide-overflow');
        if (document.querySelector('.screen-cover')) {
            body.removeChild(screenCover);
        } else {
            screenCover.setAttribute('class', 'screen-cover fixed full-size');
            body.appendChild(screenCover);
        }
    }

    Array.prototype.forEach.call(btnLightbox, function (element) {
        element.addEventListener('click', function lightBox() {
            lockScreen();
            closeBtn.setAttribute('class', 'lightbox-close');
            container.setAttribute('class', 'lightbox-container');
            container.innerHTML = this.nextElementSibling.innerHTML;
            body.appendChild(container);
            body.appendChild(closeBtn);
        });
    });

    function closeLightbox() {
        lockScreen();
        body.removeChild(container);
        body.removeChild(closeBtn);
    }

    document.addEventListener('click', function (event) {
        var target = event.target;
        if (target === container || target === closeBtn || target === screenCover) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
            closeLightbox();
        }
    });

}());
