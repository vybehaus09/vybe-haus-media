# VYBE HAUS MEDIA

Premium React + Vite marketing site for VYBE HAUS MEDIA.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Logo

<<<<<<< HEAD
The selected logo is kept as `public/vybe.png` and referenced directly as `/vybe.png`; it is not recreated in CSS or SVG.

## Contact form

The form is accessible and front-end ready. For real submissions, set `VITE_FORM_ENDPOINT` in `.env` to your production form/API endpoint and wire the POST request in `src/main.jsx`.
=======
The selected logo is kept as `public/Vybe HaÜS M E D I A.1.png` and referenced directly; it is not recreated in CSS or SVG.

## Contact form

The Brand and Creator forms submit to a Google Apps Script Web App. Copy `.env.example` to `.env` and set the deployed Web App URL:

```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
```

The `.env` file is ignored by Git. Restart the Vite dev server after changing it.
>>>>>>> 2081a3a (Initial Vybe Haus website)
