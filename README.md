# My Portfolio Website

A personal portfolio website created as a school project for the AAIKT course.

## Pages

- **Main.html** - Home page with introduction and latest blog posts
- **About.html** - About me page with experience timeline and skill progress bars
- **blog.html** - Blog page with featured post and smaller post grid
- **Gallery.html** - Image gallery with category filtering using GLightbox library
- **Contact.html** - Contact form with JavaScript validation
- **data.html** - Project table loaded from JSON file using AJAX

## How to run

Open any HTML file in a browser using a local web server.

**WebStorm** - open any HTML file and click the browser icon in the top right corner of the editor.

> Note: Opening files directly via `file://` will cause the AJAX call on data.html to fail. Always use a local server.

## File structure

```
/
├── Main.html
├── About.html
├── blog.html
├── Gallery.html
├── Contact.html
├── data.html
├── style.css
├── script.js
├── data.json
├── design.pdf
└── README.md
```

## Libraries used

- [GLightbox](https://github.com/biati-digital/glightbox) - lightbox for the image gallery, loaded via CDN

## Technologies

- HTML5
- CSS3
- JavaScript
- AJAX (fetch API)