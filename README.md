# Hamza Munir — Portfolio

Full-stack personal portfolio: a React/TypeScript frontend and a FastAPI
backend that serves the Projects and Experience data and handles the
Contact form.

**Live:** https://myportfolio-dzljcj79l-hm-40e7.vercel.app/

## Structure

```
├── src/                  # React + TypeScript frontend (Vite)
├── content/              # Shared starter data (JSON) — used as the
│                         #   frontend's offline fallback AND to seed the
│                         #   backend database
├── backend/              # FastAPI + SQLite backend (see backend/README.md)
├── public/                # Static assets (CV PDF, project images)
```

## How the frontend & backend fit together

- The **Projects** and **Experience** sections fetch live data from the
  backend (`VITE_API_URL`). If the backend is unreachable (not deployed
  yet, cold start, etc.), they silently fall back to the bundled JSON in
  `/content` — the site never shows an error or breaks.
- The **Contact form** posts to the backend, which saves the message and
  emails it to me.
- Adding a new project or job going forward is a backend API call (see
  `backend/README.md`) — no frontend code changes needed.

## Run the frontend locally

```bash
npm install
cp .env.example .env      # set VITE_API_URL if running the backend too
npm run dev
```

## Run the backend locally

See [`backend/README.md`](./backend/README.md) — covers local setup, how to
add projects/experience via the API, enabling real contact-form emails, and
deploying to Render/Railway.

## Build for production

```bash
npm run build      # outputs to /dist, ready for Vercel/Netlify/GitHub Pages
```

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons
**Backend:** FastAPI, SQLModel (SQLite), Uvicorn
