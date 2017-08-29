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

    function buildLightbox(element) {
        lockScreen();
        element.blur();
        element.classList.add('current-lightbox-item');

        btnClose = document.createElement('button');
        btnClose.className = 'lightbox-btn lightbox-btn-close';

        lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        lightboxContent.innerHTML = sortContent(element);

        lightboxWrapper = lightboxContent.cloneNode(false);
        lightboxWrapper.className = 'lightbox-wrapper';
        lightboxWrapper.style.animation = 'createBox 0.30s, fadeIn 0.30s';
        lightboxWrapper.innerHTML = lightboxContent.outerHTML + btnClose.outerHTML;

        lightboxContainer = lightboxContent.cloneNode(false);
        lightboxContainer.className = 'lightbox-container';

        if (element.getAttribute('data-lightbox') === 'gallery') {
            lightboxContainer.classList.add('lightbox-gallery');
            Array.prototype.forEach.call([[btnNext, 'next'], [btnPrev, 'previous']], function (btn) {
                btn[0] = btnClose.cloneNode(false);
                btn[0].className = 'lightbox-btn lightbox-btn-' + btn[1];
                btn[0].disabled = galleryItens(element)[btn[1]] === null ? true : false;
                lightboxWrapper.innerHTML += btn[0].outerHTML;
            });
        }

        lightboxContainer.innerHTML = lightboxWrapper.outerHTML;
        body.appendChild(lightboxContainer);

        lightboxContent = body.querySelector('.lightbox-content');
        lightboxWrapper = body.querySelector('.lightbox-wrapper');
        lightboxContainer = body.querySelector('.lightbox-container');
        btnClose = body.querySelector('.lightbox-btn-close');
        btnNext = body.querySelector('.lightbox-btn-next');
        btnPrev = body.querySelector('.lightbox-btn-previous');
    }

    function galleryNavigation(position) {
        lightboxWrapper.removeAttribute('style');
        var currentItem = body.querySelector('.current-lightbox-item'),
            item;
        if (galleryItens(currentItem)[position] !== null) {
            item = galleryItens(currentItem)[position].querySelector('[data-lightbox]');
            if (item !== null) {
                lightboxContent.innerHTML = sortContent(item);
                currentItem.classList.remove('current-lightbox-item');
                item.classList.add('current-lightbox-item');
                Array.prototype.forEach.call([[btnNext, 'next'], [btnPrev, 'previous']], function (btn) {
                    btn[0].disabled = galleryItens(item)[btn[1]] === null ? true : false;
                });
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

    Array.prototype.forEach.call(body.querySelectorAll('[data-lightbox]'), function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            buildLightbox(element);
        });
    });

    body.addEventListener('click', function (event) {
        if (body.contains(lightboxContainer)) {
            var target = event.target;
            if (target === lightboxContainer || target === screenCover || target === btnClose) {
                closeLightbox();
            }
            if (target === btnNext) {
                galleryNavigation('next');
            }
            if (target === btnPrev) {
                galleryNavigation('previous');
            }
        }
    });

    body.addEventListener('keyup', function (event) {
        if (body.contains(lightboxContainer)) {
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
