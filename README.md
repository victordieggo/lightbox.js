# Lightbox.js #

Lightbox.js is a simple and easily customizable lightbox plugin built with javascript and CSS. Minified and gzipped, it weights about 3kB.

### Get Started ###

Everything you'll need is located under the [`lightbox/`](lightbox/) directory. Include the javascript and css files in your HTML document and you're all set up:

```html
<link href="lightbox.min.css" rel="stylesheet">
<script src="lightbox.min.js"></script>
```

### Image Gallery ###

```html
<div class="gallery-item">
  <a class="lightbox lightbox-gallery" data-content="lb-content" href="#">
    <img src="https://via.placeholder.com/300x300" alt="Alt Text" />
  </a>
  <span id="lb-content" class="lightbox-content">
    <img src="https://via.placeholder.com/730x460" alt="Alt Text">
  </span>
</div>
```

### Modal/Inline Content ###

```html
<button class="btn lightbox" data-content="modal-content">
  Click Me
</button>
<div id="modal-content" class="lightbox-content">
  <div class="modal-content">
    <h3 class="title-5 text-uppercase">Welcome!
    <p>Sign in to your account.
    <input type="email" name="email" placeholder="e-mail account">
    <input type="password" name="password" placeholder="password">
    <input class="btn full-width" type="submit" name="submit" value="Sign In">
  </div>
</div>
```

### Browser Support ###

Chrome 29+, IE 10+, Firefox 22+, Safari 6.1+, Opera 12+

### License ###

[MIT License](https://victordiego.mit-license.org/) © Victor Diego Villar Guimarães
