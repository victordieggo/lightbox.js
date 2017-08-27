/* =====================================================================
 * Lightbox.js
 * Version: 0.0.2
 * Author: Victor Diego <victordieggo@gmail.com>
 * License: MIT
 * ================================================================== */
/*global document, setTimeout*/

(function () {

    'use strict';

    var btnClose, btnNext, btnPrev, lightboxContainer, lightboxWrapper, lightboxContent, screenCover, body = document.body;

    function lockScreen() {
        if (body.querySelector('.screen-cover')) {
            body.removeChild(screenCover);
            body.removeAttribute('style');
        } else {
            screenCover = document.createElement('div');
            screenCover.className = 'screen-cover';
            screenCover.style.animation = 'fadeIn 0.30s';
            body.style.overflow = 'hidden';
            body.appendChild(screenCover);
        }
    }

    function sortContent(content) {
        var image, video, href = content.getAttribute('href');

        if (href.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
            image = document.createElement('img');
            image.src = href;
            if (content.getAttribute('data-image-alt') !== null) {
                image.alt = content.getAttribute('data-image-alt');
            }
            return image.outerHTML;
        }

        if (href.match(/(youtube|vimeo)/)) {
            video = [];
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
            video.player.className = 'lightbox-video-player';
            video.player.src = video.url + video.id + video.options;
            video.wrapper = document.createElement('div');
            video.wrapper.className = 'lightbox-video-wrapper';
            video.wrapper.appendChild(video.player);
            return video.wrapper.outerHTML;
        }

        return body.querySelector(href).innerHTML;
    }

    function galleryItens(currentItem) {
        return {
            next: currentItem.parentElement.nextElementSibling,
            previous: currentItem.parentElement.previousElementSibling
        };
    }

    Array.prototype.forEach.call(body.querySelectorAll('[data-lightbox]'), function (element) {
        element.addEventListener('click', function (event) {

            this.blur();
            lockScreen();
            event.preventDefault();
            this.classList.add('current-lightbox-item');

            btnClose = document.createElement('button');
            btnClose.className = 'lightbox-btn lightbox-btn-close';

            lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            lightboxContent.innerHTML = sortContent(this);

            lightboxWrapper = lightboxContent.cloneNode(false);
            lightboxWrapper.className = 'lightbox-wrapper';
            lightboxWrapper.style.animation = 'createBox 0.30s, fadeIn 0.30s';
            lightboxWrapper.innerHTML = lightboxContent.outerHTML + btnClose.outerHTML;

            lightboxContainer = lightboxContent.cloneNode(false);
            lightboxContainer.className = 'lightbox-container';

            if (this.getAttribute('data-lightbox') === 'gallery') {
                lightboxContainer.classList.add('lightbox-gallery');
                btnNext = btnClose.cloneNode(false);
                btnPrev = btnClose.cloneNode(false);
                btnNext.className = 'lightbox-btn lightbox-btn-next';
                btnPrev.className = 'lightbox-btn lightbox-btn-previous';
                if (galleryItens(this).next === null) {
                    btnNext.disabled = true;
                }
                if (galleryItens(this).previous === null) {
                    btnPrev.disabled = true;
                }
                lightboxWrapper.innerHTML += btnNext.outerHTML + btnPrev.outerHTML;
            }

            lightboxContainer.innerHTML = lightboxWrapper.outerHTML;
            body.appendChild(lightboxContainer);

        });
    });

    function galleryNavigation(position) {
        lightboxWrapper.removeAttribute('style');
        var currentItem = body.querySelector('.current-lightbox-item'),
            item;
        if (galleryItens(currentItem)[position] !== null) {
            item = galleryItens(currentItem)[position].querySelector('[data-lightbox]');
            body.querySelector('.lightbox-content').innerHTML = sortContent(item);
            currentItem.classList.remove('current-lightbox-item');
            item.classList.add('current-lightbox-item');
            if (galleryItens(item).next === null) {
                body.querySelector('.lightbox-btn-next').disabled = true;
            } else {
                body.querySelector('.lightbox-btn-next').disabled = false;
            }
            if (galleryItens(item).previous === null) {
                body.querySelector('.lightbox-btn-previous').disabled = true;
            } else {
                body.querySelector('.lightbox-btn-previous').disabled = false;
            }
        }
    }

    function closeLightbox() {
        screenCover.style.animation = 'fadeOut 0.30s';
        body.querySelector('.lightbox-wrapper').style.animation = 'deleteBox 0.30s, fadeOut 0.30s';
        setTimeout(function () {
            lockScreen();
            body.removeChild(lightboxContainer);
            var currentItem = body.querySelector('.current-lightbox-item');
            if (currentItem !== null) {
                currentItem.focus();
                currentItem.classList.remove('current-lightbox-item');
            }
        }, 200);
    }

    document.addEventListener('click', function (event) {
        if (body.querySelector('.lightbox-container')) {
            var target = event.target;
            if (target === lightboxContainer || target === screenCover || target === body.querySelector('.lightbox-btn-close')) {
                closeLightbox();
            } else if (target === body.querySelector('.lightbox-btn-next')) {
                galleryNavigation('next');
            } else if (target === body.querySelector('.lightbox-btn-previous')) {
                galleryNavigation('previous');
            }
        }
    });

    document.addEventListener('keyup', function (event) {
        if (body.querySelector('.lightbox-container')) {
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
