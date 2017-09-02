# Lightbox.js #

Lightbox.js is a simple, lightweight (about 2kB minified and gzipped) and easily customizable lightbox plugin built with Javascript and CSS which suports images, videos (Vimeo/Youtube) and inline content.

### Get Started ###

Everything you'll need is located under the [`lightbox/`](lightbox/) directory. Include the javascript and css files in your HTML document and you're all set up:

```html
<link href="lightbox/lightbox.min.css" rel="stylesheet">
<script src="lightbox/lightbox.min.js"></script>
```

### Usage ###

Add the `data-lightbox` attribute to an `<a>` tag and set its `href` to the content you want to be opened in the lightbox. When opening an image, you can send its alt text using the `data-image-alt` attribute:

```html
<a href="assets/dist/img/image-1.png" data-lightbox data-image-alt="Image 1">
  Image
</a>
<a href="#modal" data-lightbox>
  Modal
</a>
<a href="https://vimeo.com/83897470" data-lightbox>
  Vimeo
</a>
<a href="https://www.youtube.com/watch?v=Xyu_MdKBXic" data-lightbox>
  Youtube
</a>
<div id="modal" class="lightbox-hide">
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

### Gallery ###

Set the `data-lightbox` attribute to `"gallery"` on all `<a>` tags under the same parent element and any previous or next items will be found automatically:

```html
<div class="gallery">
  <div class="gallery-item">
    <a href="assets/dist/img/image-1.png" data-lightbox="gallery" data-image-alt="Image 1">
      <img src="assets/dist/img/thumbnail-gallery.png" alt="Thumbnail 1">
    </a>
  </div>
  <div class="gallery-item">
    <a href="assets/dist/img/image-2.png" data-lightbox="gallery" data-image-alt="Image 2">
      <img src="assets/dist/img/thumbnail-gallery.png" alt="Thumbnail 2">
    </a>
  </div>
</div>
```

### Browser Support ###

Chrome 29+, IE 10+, Firefox 22+, Safari 6.1+, Opera 12+

### License ###

[MIT License](https://victordieggo.mit-license.org/) © Victor Diego Villar Guimarães
