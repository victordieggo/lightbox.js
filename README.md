# Lightbox.js #

Lightbox.js is a simple and easily customizable lightbox plugin built with javascript and CSS. Minified and gzipped, it weights about 3kB.

### Get Started ###

Everything you'll need is located under the [`lightbox/`](lightbox/) directory. Include the javascript and css files in your HTML document and you're all set up:

```html
<link href="lightbox/lightbox.min.css" rel="stylesheet">
<script src="lightbox/lightbox.min.js"></script>
```

### Usage ###

This lightbox was designed to be as simple as possible while supporting images, videos (youtube only, vimeo comes next) and inline content out of the box. It is triggered by adding the `data-lightbox` attribute on any `<a>` tag and its content is defined by the `href` attribute:

```html
<a class="btn" href="#modal" data-lightbox>
  Modal
</a>
<a class="btn" href="assets\dist\img\image-1.png" data-lightbox>
  Image
</a>
<a class="btn" href="https://www.youtube.com/watch?v=PQVD-pMlKqA" data-lightbox>
  Youtube
</a>
<div id="modal" class="lightbox-content">
  <div class="modal-content">
    <h3>Welcome!</h3>
    <p>Sign in to your account.</p>
    <form>
      <input type="email" name="email" placeholder="e-mail account">
      <input type="password" name="password" placeholder="password">
      <input class="btn" type="submit" name="submit" value="Sign In">
    </form>
  </div>
</div>
```

### Image Gallery ###

The gallery is triggered whenever the `data-lightbox` attribute is set to `gallery`. If there are any previous or next items, they will be found automatically as long as their parents are siblings*. The navigation triggers on `click` and `keyup` events.

```html
<div class="gallery-item">
  <a href="assets\dist\img\image-1.png" data-lightbox="gallery">
    <img src="assets\dist\img\thumbnail-gallery.png" alt="Thumbnail">
  </a>
</div>
```

### Browser Support ###

Chrome 29+, IE 10+, Firefox 22+, Safari 6.1+, Opera 12+

### License ###

[MIT License](https://victordiego.mit-license.org/) © Victor Diego Villar Guimarães
