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
            content = this.nextElementSibling.innerHTML;
            closeBtn.setAttribute('class', 'lightbox-btn lightbox-btn-close');
            container.setAttribute('class', 'lightbox-container');
            if (this.classList.contains('lightbox-gallery') && btnLightbox.length > 1) {
                this.classList.add('current-gallery-item');
                container.classList.add('lightbox-gallery');
                galleryWrapper.setAttribute('class', 'gallery-wrapper');
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

    function galleryNavigation(val) {
        var currentItem = document.querySelector('.current-gallery-item'),
            findItem,
            item;
        if (val === 'next') {
            findItem = currentItem.parentElement.nextElementSibling;
        } else if (val === 'previous') {
            findItem = currentItem.parentElement.previousElementSibling;
        }
        if (findItem !== null) {
            item = findItem.querySelector('.lightbox-gallery');
            if (item !== null) {
                currentItem.classList.remove('current-gallery-item');
                item.classList.add('current-gallery-item');
                galleryWrapper.innerHTML = btnPrev.outerHTML + item.nextElementSibling.innerHTML + btnNext.outerHTML;
                container.innerHTML = galleryWrapper.outerHTML;
            }
        }
    }

    function closeLightbox() {
        if (document.querySelector('.lightbox-container')) {
            lockScreen();
            body.removeChild(closeBtn);
            body.removeChild(container);
            var currentItem = document.querySelector('.current-gallery-item');
            if (currentItem !== null) {
                currentItem.classList.remove('current-gallery-item');
            }
        }
    }

    document.addEventListener('click', function (event) {
        if (document.querySelector('.lightbox-container')) {
            var target = event.target;
            if (target === container || target === closeBtn || target === screenCover) {
                closeLightbox();
            } else if (target === document.querySelector('.lightbox-btn-next')) {
                galleryNavigation('next');
            } else if (target === document.querySelector('.lightbox-btn-prev')) {
                galleryNavigation('previous');
            }
        }
    });

    document.addEventListener('keyup', function (event) {
        var key = event.keyCode;
        if (container) {
            if (key === 27) {
                closeLightbox();
            }
            if (container.classList.contains('lightbox-gallery')) {
                if (key === 39) {
                    galleryNavigation('next');
                } else if (key === 37) {
                    galleryNavigation('previous');
                }
            }
        }
    });

}());
