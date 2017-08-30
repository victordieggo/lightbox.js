/* =====================================================================
 * Lightbox.js
 * Version: 0.0.3
 * Author: Victor Diego <victordieggo@gmail.com>
 * License: MIT
 * ================================================================== */
/*global document, setTimeout*/

(function () {

    'use strict';

    var animation, btnClose, btnNext, btnPrev, container, wrapper, content, screenCover, body;

    body = document.body;

    animation = {
        fadeIn: 'fadeIn .3s',
        fadeOut: 'fadeOut .3s',
        scaleIn: 'createBox .3s',
        scaleOut: 'deleteBox .3s'
    };

    function lockScreen() {
        if (body.querySelector('.screen-cover')) {
            body.removeChild(screenCover);
            body.removeAttribute('style');
        } else {
            screenCover = document.createElement('div');
            screenCover.className = 'screen-cover';
            screenCover.style.animation = animation.fadeIn;
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
            video.wrapper.innerHTML = video.player.outerHTML;
            return video.wrapper.outerHTML;
        }

        return body.querySelector(href).innerHTML;
    }

    function galleryItens(element) {
        var itens = {
                next: element.parentElement.nextElementSibling,
                previous: element.parentElement.previousElementSibling
            },
            key;
        for (key in itens) {
            if (itens[key] !== null) {
                itens[key] = itens[key].querySelector('[data-lightbox]');
            }
        }
        return itens;
    }

    function buildLightbox(element) {
        lockScreen();
        element.blur();
        element.classList.add('current-lightbox-item');

        btnClose = document.createElement('button');
        btnClose.className = 'lightbox-btn lightbox-btn-close';

        content = document.createElement('div');
        content.className = 'lightbox-content';
        content.innerHTML = sortContent(element);

        wrapper = content.cloneNode(false);
        wrapper.className = 'lightbox-wrapper';
        wrapper.style.animation = [animation.scaleIn, animation.fadeIn];
        wrapper.innerHTML = content.outerHTML + btnClose.outerHTML;

        container = content.cloneNode(false);
        container.className = 'lightbox-container';

        if (element.getAttribute('data-lightbox') === 'gallery') {
            container.classList.add('lightbox-gallery');
            var btn = {next: btnNext, previous: btnPrev}, key;
            for (key in btn) {
                if (btn.hasOwnProperty(key)) {
                    btn[key] = btnClose.cloneNode(false);
                    btn[key].className = 'lightbox-btn lightbox-btn-' + key;
                    btn[key].disabled = galleryItens(element)[key] === null ? true : false;
                    wrapper.innerHTML += btn[key].outerHTML;
                }
            }
        }

        container.innerHTML = wrapper.outerHTML;
        body.appendChild(container);

        btnClose = body.querySelector('.lightbox-btn-close');
        btnNext = body.querySelector('.lightbox-btn-next');
        btnPrev = body.querySelector('.lightbox-btn-previous');
        content = body.querySelector('.lightbox-content');
        wrapper = body.querySelector('.lightbox-wrapper');
        container = body.querySelector('.lightbox-container');
    }

    function galleryNavigation(position) {
        wrapper.removeAttribute('style');
        var currentItem = body.querySelector('.current-lightbox-item'),
            item = galleryItens(currentItem)[position],
            btn = {next: btnNext, previous: btnPrev},
            key;
        if (item !== null) {
            content.style.animation = animation.fadeOut;
            setTimeout(function () {
                content.style.animation = animation.fadeIn;
                content.innerHTML = sortContent(item);
            }, 200);
            currentItem.classList.remove('current-lightbox-item');
            item.classList.add('current-lightbox-item');
            for (key in btn) {
                if (btn.hasOwnProperty(key)) {
                    btn[key].disabled = galleryItens(item)[key] === null ? true : false;
                }
            }
        }
    }

    function closeLightbox() {
        screenCover.style.animation = animation.fadeOut;
        wrapper.style.animation = [animation.scaleOut, animation.fadeOut];
        setTimeout(function () {
            lockScreen();
            body.removeChild(container);
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
        if (body.contains(container)) {
            var target = event.target;
            if (target === container || target === screenCover || target === btnClose) {
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
        if (body.contains(container)) {
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
