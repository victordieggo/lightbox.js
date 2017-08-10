/* =====================================================================
 * LIGHTBOX
 * ===================================================================*/
/*global window, document, console*/

(function () {

    'use strict';

    var btnLightbox = document.querySelectorAll('.btn-lightbox'),
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

    function closeLightbox() {
        var lightBox = document.querySelector('.lightbox-container'),
            closeBtn = document.querySelector('.lightbox-close');
        if (document.querySelector('.screen-cover')) {
            lockScreen();
            body.removeChild(lightBox);
            body.removeChild(closeBtn);
        }
    }

    Array.prototype.forEach.call(btnLightbox, function (element) {

        element.addEventListener('click', function lightBox() {

            var content         = this.nextElementSibling.innerHTML,
                closeBtn        = document.createElement('button'),
                container       = document.createElement('div');

            lockScreen();

            closeBtn.setAttribute('class', 'lightbox-close');
            container.setAttribute('class', 'lightbox-container');

            container.innerHTML = content;
            body.appendChild(container);
            body.appendChild(closeBtn);

            closeBtn.addEventListener('click', closeLightbox);
            screenCover.addEventListener('click', closeLightbox);
            container.addEventListener('click', function (event) {
                var senderElement = event.target;
                if (senderElement === this) {
                    closeLightbox();
                }
            });
            document.onkeydown = function (event) {
                if (event.keyCode === 27) {
                    closeLightbox();
                }
            };

        });

    });

}());
