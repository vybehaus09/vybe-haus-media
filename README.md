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

The selected logo is kept as `public/vybe.png` and referenced directly as `/vybe.png`; it is not recreated in CSS or SVG.

## Contact form

The form is accessible and front-end ready. For real submissions, set `VITE_FORM_ENDPOINT` in `.env` to your production form/API endpoint and wire the POST request in `src/main.jsx`.
