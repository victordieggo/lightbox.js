/* =====================================================================
 * LIGHTBOX
 * ===================================================================*/
/*global window, document, console*/

(function () {

    'use strict';

    var btnLightbox    = document.querySelectorAll('.btn-lightbox'),
        closeBtn       = document.createElement('button'),
        btnNext        = document.createElement('button'),
        btnPrev        = document.createElement('button'),
        container      = document.createElement('div'),
        galleryWrapper = document.createElement('div'),
        screenCover    = document.createElement('div'),
        body           = document.body,
        content;

    galleryWrapper.setAttribute('class', 'gallery-wrapper');

    function lockScreen() {
        body.classList.toggle('hide-overflow');
        if (document.querySelector('.screen-cover')) {
            body.removeChild(screenCover);
        } else {
            screenCover.setAttribute('class', 'screen-cover fixed full-size');
            body.appendChild(screenCover);
        }
    }

    function galleryNavigation(item) {
        var currentItem = document.querySelector('.current-gallery-item'),
            findItem,
            Item1;
        if (item === 'next') {
            findItem = currentItem.parentElement.nextElementSibling;
        } else if (item === 'previous') {
            findItem = currentItem.parentElement.previousElementSibling;
        }
        if (findItem !== null) {
            Item1 = findItem.querySelector('.lightbox-gallery');
            currentItem.classList.remove('current-gallery-item');
            Item1.classList.add('current-gallery-item');
            galleryWrapper.innerHTML = btnPrev.outerHTML + Item1.nextElementSibling.innerHTML + btnNext.outerHTML;
            container.innerHTML = galleryWrapper.outerHTML;
        }
    }

    Array.prototype.forEach.call(btnLightbox, function (element) {
        element.addEventListener('click', function lightBox() {
            lockScreen();
            content = this.nextElementSibling.innerHTML;
            closeBtn.setAttribute('class', 'lightbox-btn lightbox-btn-close');
            container.setAttribute('class', 'lightbox-container');
            if (this.classList.contains('lightbox-gallery') && btnLightbox.length > 1) {
                this.classList.add('current-gallery-item');
                btnNext.setAttribute('class', 'lightbox-btn lightbox-btn-next');
                btnPrev.setAttribute('class', 'lightbox-btn lightbox-btn-prev');
                galleryWrapper.innerHTML = btnPrev.outerHTML + content + btnNext.outerHTML;
                container.innerHTML = galleryWrapper.outerHTML;
            } else {
                container.innerHTML = content;
            }
            body.appendChild(container);
            body.appendChild(closeBtn);
        });
    });

    function closeLightbox() {
        if (document.querySelector('.lightbox-container')) {
            lockScreen();
            body.removeChild(closeBtn);
            body.removeChild(container);
            if (document.querySelector('.current-gallery-item')) {
                document.querySelector('.current-gallery-item').classList.remove('current-gallery-item');
            }
        }
    }

    document.addEventListener('click', function (event) {
        if (document.querySelector('.lightbox-container')) {
            var target = event.target;
            if (target === container || target === closeBtn || target === screenCover) {
                closeLightbox();
            } else if (target === document.querySelector('.lightbox-btn lightbox-btn-next')) {
                galleryNavigation('next');
            } else if (target === document.querySelector('.lightbox-btn lightbox-btn-prev')) {
                galleryNavigation('previous');
            }
        }
    });

    document.addEventListener('keyup', function (event) {
        if (document.querySelector('.lightbox-container')) {
            var key = event.keyCode;
            if (key === 27) {
                closeLightbox();
            } else if (key === 39) {
                galleryNavigation('next');
            } else if (key === 37) {
                galleryNavigation('previous');
            }
        }
    });

}());
