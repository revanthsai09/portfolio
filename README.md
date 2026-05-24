# 🚀 Portfolio — Alex Mercer

A dark-themed, fully responsive portfolio website.
Built with **pure HTML, CSS, and JavaScript** — no frameworks needed.

---

## 📁 Folder Structure

```
portfolio3/
│
├── index.html          ← All page content (edit your details here)
│
├── css/
│   └── style.css       ← All styling — colors, layout, animations
│
├── js/
│   └── main.js         ← All interactions — canvas, tabs, form, etc.
│
├── assets/
│   ├── profile.jpg     ← ⭐ YOUR PHOTO — replace this file!
│   └── resume.pdf      ← Your resume — replace this file!
│
└── README.md           ← This guide
```

---

## ✏️ HOW TO EDIT YOUR DETAILS

Open `index.html` in VS Code or Notepad. Find and change:

### Your Name
Search: `Alex Mercer`
Replace with your actual name everywhere it appears.

### Your Initials
Search: `AM`
Replace with your initials (used in logo and photo fallback).

### Your Job Title
Search: `Full Stack Developer`
Replace with your actual role.

### Your Bio (hero description)
Find this line:
```
I build scalable, high-performance web applications...
```
Replace with your own description.

### Your Location
Search: `Hyderabad, India`
Replace with your city.

### Your Email
Search: `alex@example.com`
Replace with your email address.

### Your Phone
Search: `+91 98765 43210`
Replace with your number.

### Your Social Links
Find these 3 lines and paste your real URLs:
```html
href="https://github.com"
href="https://linkedin.com"
href="https://twitter.com"
```

### Stats (Years, Projects, Clients)
Search for `data-target=` and change the numbers:
```html
data-target="3"   ← years of experience
data-target="30"  ← projects built
data-target="15"  ← happy clients
data-target="99"  ← on-time delivery %
```

---

## 🖼️ HOW TO ADD YOUR PHOTO

1. Take any photo of yourself (JPG, PNG — square crop works best)
2. Rename it to: `profile.jpg`
3. Drop it inside the `assets/` folder (replace the existing file)
4. Done! Your photo will show:
   - **Big and circular** on the hero section
   - **Small in the top-right corner** when you scroll down

---

## 📄 HOW TO ADD YOUR RESUME

1. Export your resume as a PDF
2. Rename it to: `resume.pdf`
3. Drop it inside the `assets/` folder

---

## 🎨 HOW TO CHANGE COLORS

Open `css/style.css` and look for the `:root` block at the top.

Change these two lines to any color you want:
```css
--accent: #c9ff47;    /* neon lime green — change this */
--bg:     #0b0b0b;    /* dark background — change this */
```

---

## 🛠️ HOW TO EDIT PROJECTS

In `index.html`, find each `<article class="project-card">` block.

Change:
- The emoji icon
- The `<h3>` title
- The `<p>` description
- The `<span>` tech stack tags
- The `href="#"` links (live demo + GitHub)
- `data-cat="fullstack"` → change to `frontend` or `backend` for filtering

---

## 🚀 HOW TO RUN THE WEBSITE

### Option A — Just open it (simplest):
Double-click `index.html` — opens in your browser instantly.

### Option B — VS Code Live Server (recommended):
1. Open VS Code
2. File → Open Folder → select `portfolio3`
3. Install "Live Server" extension
4. Right-click `index.html` → Open with Live Server
5. Opens at `http://localhost:5500` with auto-refresh on save

---

## 🌐 HOW TO PUT IT ON GITHUB

```bash
cd portfolio3
git init
git add .
git commit -m "🚀 launch my portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Then: GitHub repo → Settings → Pages → Source: main → Save
Your site goes live at: `https://YOUR_USERNAME.github.io/portfolio`

---

## ⭐ Key Features

- Big circular profile photo in hero → shrinks to top-right corner on scroll
- Animated dot particle canvas background
- Skills tab switcher with animated progress bars
- Project filter (All / Full Stack / Frontend / Backend)
- 3D card tilt effect on hover
- Count-up number animation in stats
- Responsive mobile menu
- Dark theme with neon accent color
- Contact form with success message
