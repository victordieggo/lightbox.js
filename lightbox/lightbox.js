/* =====================================================================
 * Lightbox.js
 * Version: 0.0.6
 * Author: Victor Diego <victordieggo@gmail.com>
 * License: MIT
 * ================================================================== */

const lightbox = (element) => {
  'use strict';

  let btnClose;
  let btnNav;
  let currentItem;
  let container;
  let content;
  let wrapper;

  const doc = document;
  const body = doc.body;

  const animation = {
    fadeIn: 'fadeIn .3s',
    fadeOut: 'fadeOut .3s',
    scaleIn: 'scaleIn .3s',
    scaleOut: 'scaleOut .3s'
  };

  const classes = {
    btn: 'lightbox-btn',
    gallery: 'lightbox-gallery',
    firstTriggered: 'lightbox-trigger',
    currentElement: 'lightbox-active-item'
  };

  const toggleScroll = () => body.classList.toggle('remove-scroll');

  const sortContent = (content) => {

    if (element.tagName === 'A') {
      content = content.getAttribute('href');
    }

    if (content.match(/\.(jpeg|jpg|gif|png)/)) {
      const image = doc.createElement('img');
      image.className = 'lightbox-image';
      image.src = content;
      if (element.tagName === 'A') {
        image.alt = element.getAttribute('data-image-alt');
      }
      return image;
    }

    if (content.match(/(youtube|vimeo)/)) {
      const video = [];

      if (content.match('youtube')) {
        video.id = content.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
        video.url = 'youtube.com/embed/';
        video.options = '?autoplay=1&rel=0';
      }

      if (content.match('vimeo')) {
        video.id = content.split(/video\/|https:\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
        video.url = 'player.vimeo.com/video/';
        video.options = '?autoplay=1title=0&byline=0&portrait=0';
      }

      video.player = doc.createElement('iframe');
      video.player.setAttribute('allowfullscreen', '');
      video.player.className = 'lightbox-video-player';
      video.player.src = 'https://' + video.url + video.id + video.options;

      video.wrapper = doc.createElement('div');
      video.wrapper.className = 'lightbox-video-wrapper';
      video.wrapper.appendChild(video.player);

      return video.wrapper;
    }

    return doc.querySelector(content).children[0].cloneNode(true);
  };

  const galleryItens = (element) => {
    const itens = {
      next: element.parentElement.nextElementSibling,
      previous: element.parentElement.previousElementSibling
    };
    for (let key in itens) {
      if (itens[key] !== null) {
        itens[key] = itens[key].querySelector('[data-lightbox]');
      }
    }
    return itens;
  };

  const build = () => {
    btnClose = doc.createElement('button');
    btnClose.setAttribute('aria-label', 'Close');
    btnClose.className = classes.btn + ' ' + classes.btn + '-close';

    content = doc.createElement('div');
    content.className = 'lightbox-content';
    content.appendChild(sortContent(element));

    wrapper = content.cloneNode(false);
    wrapper.className = 'lightbox-wrapper';
    wrapper.style.animation = [animation.scaleIn, animation.fadeIn];
    wrapper.appendChild(btnClose);
    wrapper.appendChild(content);

    container = content.cloneNode(false);
    container.className = 'lightbox-container';
    container.style.animation = animation.fadeIn;
    container.onclick = () => {};
    container.appendChild(wrapper);

    if (element.tagName === 'A' && element.getAttribute('data-lightbox') === 'gallery') {
      container.classList.add(classes.gallery);
      btnNav = {previous: '', next: ''};
      for (let key in btnNav) {
        if (btnNav.hasOwnProperty(key)) {
          btnNav[key] = btnClose.cloneNode(false);
          btnNav[key].setAttribute('aria-label', key);
          btnNav[key].className = classes.btn + ' ' + classes.btn + '-' + key;
          btnNav[key].disabled = !galleryItens(element)[key] ? true : false;
          wrapper.appendChild(btnNav[key]);
        }
      }
    }

    if (element.tagName === 'A') {
      element.blur();
      currentItem = element;
      element.classList.add(classes.currentElement);
      element.classList.add(classes.firstTriggered);
    }

    element.parentNode.insertBefore(container, element.nextSibling);
    toggleScroll();
  };

  const navigate = (position) => {
    wrapper.removeAttribute('style');
    const item = galleryItens(currentItem)[position];
    if (item !== null) {
      content.style.animation = animation.fadeOut;
      setTimeout(() => {
        content.replaceChild(sortContent(item), content.children[0]);
        content.style.animation = animation.fadeIn;
      }, 200);
      currentItem.classList.remove(classes.currentElement);
      item.classList.add(classes.currentElement);
      currentItem = item;
      for (let key in btnNav) {
        if (btnNav.hasOwnProperty(key)) {
          btnNav[key].disabled = !galleryItens(item)[key] ? true : false;
        }
      }
    }
  };

  const close = () => {
    toggleEvents('remove');
    container.style.animation = animation.fadeOut;
    wrapper.style.animation = [animation.scaleOut, animation.fadeOut];
    setTimeout(() => {
      toggleScroll();
      element.parentNode.removeChild(container);
      if (element.tagName === 'A') {
        currentItem.classList.remove(classes.currentElement);
        const trigger = doc.querySelector('.' + classes.firstTriggered);
        trigger.classList.remove(classes.firstTriggered);
        trigger.focus();
      }
    }, 200);
  };

  const controls = (event) => {
    const target = event.target;
    const key = event.keyCode;
    const type = event.type;

    const clickClose = type == 'click' && [container, btnClose].indexOf(target) !== -1;
    const keyupClose = type == 'keyup' && key == 27;
    if (clickClose || keyupClose) {
      if (container.parentElement === element.parentElement) {
        close();
      }
    }

    if (btnNav) {
      const clickNext = type == 'click' && target == btnNav.next;
      const keyupNext = type == 'keyup' && key == 39;
      if (clickNext || keyupNext) {
        navigate('next');
      }

      const clickPrev = type == 'click' && target == btnNav.previous;
      const keyupPrev = type == 'keyup' && key == 37;
      if (clickPrev || keyupPrev) {
        navigate('previous');
      }
    }

    if (type == 'keydown' && key == 9) {
      let focusable = ['[href]', 'button', 'input', 'select', 'textarea'];
      focusable = focusable.map(i => i + ':not([disabled])');
      focusable = container.querySelectorAll(focusable.toString());
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (doc.activeElement == firstFocusable) {
          lastFocusable.focus();
          event.preventDefault();
        }
      } else {
        if (doc.activeElement == lastFocusable) {
          firstFocusable.focus();
          event.preventDefault();
        }
        lastFocusable.addEventListener('blur', () => {
          if (lastFocusable.disabled) {
            firstFocusable.focus();
            event.preventDefault();
          }
        });
      }
    }
  };

  const toggleEvents = (option) => {
    ['click', 'keyup', 'keydown'].forEach((eventType) => {
      if (option === 'remove') {
        doc.removeEventListener(eventType, event => controls(event));
        return;
      }
      doc.addEventListener(eventType, event => controls(event));
    });
  };

  build();
  toggleEvents();
};

Array.prototype.forEach.call(document.querySelectorAll('[data-lightbox]'), (element) => {
  'use strict';
  element.addEventListener('click', (event) => {
    event.preventDefault();
    new lightbox(element);
  });
});
