# VYBE HAUS MEDIA

Premium React + Vite marketing site for VYBE HAUS MEDIA.

## Stack and structure

The project uses the existing React + Vite stack. The page is implemented in `src/App.jsx`, with its active global design tokens and site-wide styles in `src/design.css`; `src/main.jsx` mounts the app. `index.html` contains the document metadata and shared font loading.

The design system uses Plus Jakarta Sans, a white/black/orange palette, and shared spacing, radius, and shadow scales in `src/design.css`. The site uses plain CSS rather than Tailwind.

The standalone style guide is available at `/style-guide.html` and shares the global stylesheet. Heading highlights use the reusable `.heading-highlight` class; visible keyboard focus and reduced-motion behavior are also defined globally.
Use `Button` with `variant="primary"` for orange actions and its default secondary variant for outlined actions. `Card` supplies the shared border, radius, shadow, and hover treatment.

```text
public/       Brand logo and static assets served as-is
src/
  App.jsx     Page sections, navigation, and contact form behavior
  main.jsx    Vite entry point; mounts the React app
  design.css      Global design tokens, responsive layout, and component styles
  components/
    Button.jsx    Reusable primary and secondary button component
    Card.jsx      Reusable bordered card component
  style-guide.jsx Standalone typography, link, button, and card examples
index.html    Document metadata, title, and font connections
style-guide.html  Standalone style-guide page
```

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

The selected logo is kept as `public/Vybe HaÜS M E D I A.1.png` and referenced directly; it is not recreated in CSS or SVG.

## Contact form

The Brand and Creator forms submit to a Google Apps Script Web App. Copy `.env.example` to `.env` and set the deployed Web App URL:

```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
```

The `.env` file is ignored by Git. Restart the Vite dev server after changing it.
