/* =====================================================================
 * LIGHTBOX.JS
 * ===================================================================*/
/*global window, document, setTimeout, console*/

(function () {

    'use strict';

    var btnLightbox     = document.querySelectorAll('[data-lightbox]'),
        btnClose        = document.createElement('button'),
        btnNext         = document.createElement('button'),
        btnPrev         = document.createElement('button'),
        container       = document.createElement('div'),
        lightboxWrapper = document.createElement('div'),
        screenCover     = document.createElement('div'),
        body            = document.body;

    function lockScreen() {
        if (document.querySelector('.screen-cover')) {
            body.removeChild(screenCover);
            body.removeAttribute('style');
        } else {
            screenCover.setAttribute('class', 'screen-cover');
            screenCover.style.animation = 'fadeIn 0.30s';
            body.style.overflow = 'hidden';
            body.appendChild(screenCover);
        }
    }

    function buildLightbox(lightboxContent) {
        btnClose.setAttribute('class', 'lightbox-btn lightbox-btn-close');
        lightboxWrapper.innerHTML = lightboxContent + btnClose.outerHTML;
        lightboxWrapper.setAttribute('class', 'lightbox-item-wrapper');
        container.innerHTML = lightboxWrapper.outerHTML;
        container.classList.add('lightbox-container');
        body.appendChild(container);
    }

    Array.prototype.forEach.call(btnLightbox, function (element) {
        element.addEventListener('click', function lightBox(event) {
            this.blur();
            lockScreen();
            event.preventDefault();
            this.classList.add('current-lightbox-item');
            lightboxWrapper.style.animation = 'createBox 0.30s, fadeIn 0.30s';
            var dataType = this.getAttribute('data-lightbox'),
                dataContent = this.getAttribute('href'),
                lightboxContent = document.querySelector(dataContent).innerHTML;
            if (dataType === 'gallery') {
                container.classList.add('lightbox-gallery');
                btnNext.setAttribute('class', 'lightbox-btn lightbox-btn-next');
                btnPrev.setAttribute('class', 'lightbox-btn lightbox-btn-prev');
                lightboxContent += btnPrev.outerHTML + btnNext.outerHTML;
            }
            buildLightbox(lightboxContent);
        });
    });

    function galleryNavigation(position) {
        lightboxWrapper.removeAttribute('style');
        var currentItem = document.querySelector('.current-lightbox-item'),
            siblingItem = {
                next: currentItem.parentElement.nextElementSibling,
                previous: currentItem.parentElement.previousElementSibling
            },
            content,
            item;
        if (siblingItem[position] !== null) {
            item = siblingItem[position].querySelector('[data-lightbox]');
            content = document.querySelector(item.getAttribute('href'));
            buildLightbox(btnPrev.outerHTML + content.innerHTML + btnNext.outerHTML);
            currentItem.classList.remove('current-lightbox-item');
            item.classList.add('current-lightbox-item');
        }
    }

    function closeLightbox() {
        screenCover.style.animation = 'fadeOut 0.30s';
        document.querySelector('.lightbox-item-wrapper').style.animation = 'deleteBox 0.30s, fadeOut 0.30s';
        setTimeout(function () {
            lockScreen();
            body.removeChild(container);
            container.setAttribute('class', '');
            var currentItem = document.querySelector('.current-lightbox-item');
            if (currentItem !== null) {
                currentItem.focus();
                currentItem.classList.remove('current-lightbox-item');
            }
        }, 200);
    }

    document.addEventListener('click', function (event) {
        if (document.querySelector('.lightbox-container')) {
            var target = event.target;
            if (target === container || target === screenCover || target === document.querySelector('.lightbox-btn-close')) {
                closeLightbox();
            } else if (target === document.querySelector('.lightbox-btn-next')) {
                galleryNavigation('next');
            } else if (target === document.querySelector('.lightbox-btn-prev')) {
                galleryNavigation('previous');
            }
        }
    });

    document.addEventListener('keyup', function (event) {
        if (document.querySelector('.lightbox-container')) {
            var key = event.keyCode;
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
