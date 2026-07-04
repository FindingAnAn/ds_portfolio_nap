# Nguyen Anh Phuong - Data Science Portfolio

A static portfolio website presenting my work in data science, machine learning, and applied research.

## Featured Projects

- **B2B Churn Warning System** - Production-oriented ML pipeline for Vietnam Post.
- **Gold Open Forecasting** - Leakage-aware 10-session forecasting with hybrid sequence and direct models.
- **Respiratory Disease Classification** - FPGA-based research published in IEEE Access.

## Run Locally

```bash
node serve-static.js
```

Open `http://127.0.0.1:4173`.

## Profile Photo

Keep exactly one image inside `assets/profile-photo/`. The filename may change.
The local preview and Vercel build automatically update the image path in
`index.html`.

To update the path without starting the preview server:

```bash
node scripts/sync-profile-photo.js
```

The site is built with HTML, CSS, and vanilla JavaScript. Vercel runs the
profile-photo sync step before serving the static files.
