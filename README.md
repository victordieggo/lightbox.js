# Lightbox.js #

Lightbox.js is a simple and easily customizable lightbox plugin built with javascript and CSS. Minified and gzipped, it weights about 3kB.

### Get Started ###

Everything you'll need is located under the [`lightbox/`](lightbox/) directory. Include the javascript and css files in your HTML document and you're all set up:

```html
<link href="lightbox/lightbox.min.css" rel="stylesheet">
<script src="lightbox/lightbox.min.js"></script>
```

### Image Gallery ###

```html
<div class="gallery-item">
  <a href="assets\dist\img\image-1.png" data-lightbox="gallery">
    <img src="assets\dist\img\thumbnail-gallery.png" alt="Thumbnail">
  </a>
</div>
```

### Modal/Inline Content ###

```html
<a class="btn" href="#modal-content" data-lightbox>
  Click Me
</a>
<div id="modal-content" class="lightbox-content">
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

### Browser Support ###

Chrome 29+, IE 10+, Firefox 22+, Safari 6.1+, Opera 12+

### License ###

[MIT License](https://victordiego.mit-license.org/) © Victor Diego Villar Guimarães
