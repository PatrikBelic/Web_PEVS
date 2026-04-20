# My Portfolio Website

A personal portfolio website created as a school project.

## Pages

- **Main.html** – Home page
- **about.html** – About me (skills, experience)
- **blog.html** – Blog posts
- **gallery.html** – Image gallery with filtering
- **contact.html** – Contact form with validation
- **data.html** – Project table loaded from JSON via AJAX

## How to run

> **Important:** The project must be opened using a local web server.
> Opening `Main.html` directly in a browser (via `file://`) will cause the AJAX call to fail due to browser security restrictions.

### Option 1 – VS Code Live Server (recommended)

1. Install the **Live Server** extension in VS Code
2. Right-click `Main.html` → **Open with Live Server**

### Option 2 – Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/Main.html` in your browser.

### Option 3 – Node.js

```bash
npx serve .
```

## File structure

```
/
├── Main.html
├── about.html
├── blog.html
├── gallery.html
├── contact.html
├── data.html
├── style.css
├── script.js
├── data.json
├── design.pdf
└── README.md
```

## Libraries used

- [GLightbox](https://github.com/biati-digital/glightbox) – image lightbox (loaded via CDN)

## Notes

- All pages share one CSS file (`style.css`)
- Form validation is done in JavaScript without any libraries
- AJAX uses the native `fetch()` API to load `data.json`