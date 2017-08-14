/* =====================================================================
 * LIGHTBOX.JS
 * ===================================================================*/
/*global window, document, setTimeout, console*/

(function () {

    'use strict';

    var btnLightbox     = document.querySelectorAll('.lightbox'),
        btnClose        = document.createElement('button'),
        btnNext         = document.createElement('button'),
        btnPrev         = document.createElement('button'),
        container       = document.createElement('div'),
        lightboxWrapper = document.createElement('div'),
        screenCover     = document.createElement('div'),
        body            = document.body;

    function lockScreen() {
        body.classList.toggle('hide-overflow');
        if (document.querySelector('.screen-cover')) {
            body.removeChild(screenCover);
        } else {
            screenCover.setAttribute('class', 'screen-cover');
            screenCover.style.animation = 'fadeIn 0.30s';
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
            var dataContent = element.getAttribute('data-content'),
                lightboxContent = document.getElementById(dataContent).innerHTML;
            if (element.classList.contains('lightbox-gallery')) {
                container.classList.add('lightbox-gallery');
                btnNext.setAttribute('class', 'lightbox-btn lightbox-btn-next');
                btnPrev.setAttribute('class', 'lightbox-btn lightbox-btn-prev');
                lightboxContent += btnPrev.outerHTML + btnNext.outerHTML;
            }
            buildLightbox(lightboxContent);
        });
    });

    function galleryNavigation(val) {
        lightboxWrapper.style.animation = 'none';
        var currentItem = document.querySelector('.current-lightbox-item'),
            findItem,
            content,
            item;
        if (val === 'next') {
            findItem = currentItem.parentElement.nextElementSibling;
        } else if (val === 'previous') {
            findItem = currentItem.parentElement.previousElementSibling;
        }
        if (findItem !== null) {
            item = findItem.querySelector('.lightbox-gallery');
            if (item !== null) {
                content = document.getElementById(item.getAttribute('data-content')).innerHTML;
                buildLightbox(btnPrev.outerHTML + content + btnNext.outerHTML);
                currentItem.classList.remove('current-lightbox-item');
                item.classList.add('current-lightbox-item');
            }
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
