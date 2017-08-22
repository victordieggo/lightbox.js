/* =====================================================================
 * LIGHTBOX.JS
 * ===================================================================*/
/*global window, document, setTimeout, console*/

(function () {

    'use strict';

    var trigger           = document.querySelectorAll('[data-lightbox]'),
        btnClose          = document.createElement('button'),
        btnNext           = document.createElement('button'),
        btnPrev           = document.createElement('button'),
        lightboxContainer = document.createElement('div'),
        lightboxWrapper   = document.createElement('div'),
        screenCover       = document.createElement('div'),
        body              = document.body;

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
        lightboxWrapper.setAttribute('class', 'lightbox-wrapper');
        lightboxContainer.innerHTML = lightboxWrapper.outerHTML;
        lightboxContainer.classList.add('lightbox-container');
        body.appendChild(lightboxContainer);
    }

    function sortContent(item) {
        var href = item.getAttribute('href'),
            imageAlt,
            video = {};

        if (href.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
            imageAlt = item.getAttribute('data-image-alt');
            if (imageAlt !== null) {
                return '<img src="' + href + '" alt="' + imageAlt + '">';
            }
            return '<img src="' + href + '" alt="">';
        }

        if (href.match(/(youtube|vimeo)/)) {
            if (href.match('youtube')) {
                video.id = href.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
                video.url = 'https://www.youtube.com/embed/';
                video.options = '?autoplay=1&rel=0';
            }
            if (href.match('vimeo')) {
                video.id = href.split(/video\/|https:\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
                video.url = 'https://player.vimeo.com/video/';
                video.options = '?autoplay=1title=0&byline=0&portrait=0';
            }
            video.player = document.createElement('iframe');
            video.player.setAttribute('allowfullscreen', '');
            video.player.setAttribute('class', 'lightbox-video-player');
            video.player.setAttribute('src', video.url + video.id + video.options);
            video.wrapper = document.createElement('div');
            video.wrapper.setAttribute('class', 'lightbox-video-wrapper');
            video.wrapper.appendChild(video.player);
            return video.wrapper.outerHTML;
        }

        return document.querySelector(href).innerHTML;
    }

    Array.prototype.forEach.call(trigger, function (element) {
        element.addEventListener('click', function lightBox(event) {
            this.blur();
            lockScreen();
            event.preventDefault();
            this.classList.add('current-lightbox-item');
            lightboxWrapper.style.animation = 'createBox 0.30s, fadeIn 0.30s';
            var dataType = this.getAttribute('data-lightbox'),
                lightboxContent = sortContent(this);
            if (dataType === 'gallery') {
                lightboxContainer.classList.add('lightbox-gallery');
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
            item;
        if (siblingItem[position] !== null) {
            item = siblingItem[position].querySelector('[data-lightbox]');
            buildLightbox(btnPrev.outerHTML + sortContent(item) + btnNext.outerHTML);
            currentItem.classList.remove('current-lightbox-item');
            item.classList.add('current-lightbox-item');
        }
    }

    function closeLightbox() {
        screenCover.style.animation = 'fadeOut 0.30s';
        document.querySelector('.lightbox-wrapper').style.animation = 'deleteBox 0.30s, fadeOut 0.30s';
        setTimeout(function () {
            lockScreen();
            body.removeChild(lightboxContainer);
            lightboxContainer.setAttribute('class', '');
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
            if (target === lightboxContainer || target === screenCover || target === document.querySelector('.lightbox-btn-close')) {
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
            if (lightboxContainer.classList.contains('lightbox-gallery')) {
                if (key === 39) {
                    galleryNavigation('next');
                } else if (key === 37) {
                    galleryNavigation('previous');
                }
            }
        }
    });

}());
