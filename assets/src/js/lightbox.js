/* =====================================================================
 * LIGHTBOX
 * ===================================================================*/
/*global window, document, console*/

(function () {

    'use strict';

    var btnLightbox     = document.querySelectorAll('.lightbox'),
        btnGallery      = document.querySelectorAll('.lightbox-gallery'),
        closeBtn        = document.createElement('button'),
        btnNext         = document.createElement('button'),
        btnPrev         = document.createElement('button'),
        container       = document.createElement('div'),
        lightboxWrapper = document.createElement('div'),
        screenCover     = document.createElement('div'),
        body            = document.body,
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

    function buildLightbox(lightboxContent) {
        lockScreen();
        closeBtn.setAttribute('class', 'lightbox-btn lightbox-btn-close');
        lightboxWrapper.setAttribute('class', 'lightbox-item-wrapper');
        container.classList.add('lightbox-container');
        lightboxWrapper.innerHTML = lightboxContent + closeBtn.outerHTML;
        container.innerHTML = lightboxWrapper.outerHTML;
        body.appendChild(container);
    }

    Array.prototype.forEach.call(btnLightbox, function (element) {
        element.addEventListener('click', function lightBox() {
            var dataContent = element.getAttribute('data-content');
            buildLightbox(document.getElementById(dataContent).innerHTML);
        });
    });

    Array.prototype.forEach.call(btnGallery, function (element) {
        element.addEventListener('click', function lightBox() {
            var dataContent = element.getAttribute('data-content'),
                galleryContent = document.getElementById(dataContent).innerHTML;
            this.classList.add('current-gallery-item');
            container.classList.add('lightbox-gallery');
            btnNext.setAttribute('class', 'lightbox-btn lightbox-btn-next');
            btnPrev.setAttribute('class', 'lightbox-btn lightbox-btn-prev');
            content = btnPrev.outerHTML + galleryContent + btnNext.outerHTML;
            buildLightbox(content);
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
            if (findItem.querySelector('.lightbox-gallery') !== null) {
                currentItem.classList.remove('current-gallery-item');
                item.classList.add('current-gallery-item');
                content = document.getElementById(item.getAttribute('data-content')).innerHTML;
                lightboxWrapper.innerHTML = btnPrev.outerHTML + content + btnNext.outerHTML + closeBtn.outerHTML;
                container.innerHTML = lightboxWrapper.outerHTML;
            }
        }
    }

    function closeLightbox() {
        if (document.querySelector('.lightbox-container')) {
            lockScreen();
            body.removeChild(container);
            container.setAttribute('class', '');
            var currentItem = document.querySelector('.current-gallery-item');
            if (currentItem !== null) {
                currentItem.classList.remove('current-gallery-item');
            }
        }
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
