# Portfolio Backend (FastAPI)

Powers three things on the live site:
- `GET /api/projects` — the Projects section
- `GET /api/experience` — the Experience section
- `POST /api/contact` — the Contact form (saves the message + emails it to you)

The frontend always has a bundled fallback copy of the projects/experience data
(`/content/*.json`), so **the site never breaks even if this backend is
offline or not yet deployed** — it just silently falls back to the last
known data.

---

## 1. Run it locally

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# open .env and set ADMIN_API_KEY to your own secret, and fill in SMTP_* if
# you want the contact form to email you (see section 3 below)

python -m app.seed              # one-time: creates portfolio.db and loads
                                 # the 6 starter projects + 3 experience entries

uvicorn app.main:app --reload --port 8000
```

Visit **http://localhost:8000/docs** — this is an interactive Swagger UI
where you can try every endpoint directly in the browser.

Point your frontend at it by creating a `.env` file at the repo root (not
inside `backend/`) with:
```
VITE_API_URL=http://localhost:8000
```
Then `npm run dev` as usual — the Projects/Experience sections will show a
small green "Live API" badge once they're pulling from the backend.

---

## 2. Adding / editing a project or experience entry (no frontend code needed)

Go to `http://localhost:8000/docs` (or your deployed backend's `/docs` URL):

1. Click **Authorize** (top right) and paste your `ADMIN_API_KEY`.
2. Open `POST /api/projects` (or `/api/experience`), click **Try it out**,
   fill in the JSON body, and click **Execute**.
3. Refresh your portfolio site — the new project appears automatically.

You can also do this with `curl`:
```bash
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_ADMIN_API_KEY" \
  -d '{
    "id": "my-new-project",
    "title": "My New Project",
    "category": "NLP",
    "shortDescription": "One-line summary.",
    "fullDescription": "Longer description shown in the detail modal.",
    "image": "https://picsum.photos/800/600",
    "techStack": ["Python", "FastAPI"],
    "githubUrl": "https://github.com/hamzamunirml/my-new-project",
    "liveUrl": null,
    "metrics": [{"label": "Accuracy", "value": "95%"}],
    "architectureHighlights": ["Key design point 1", "Key design point 2"],
    "datasetInfo": null
  }'
```
`category` must be one of: `GenAI/RAG`, `Computer Vision`, `NLP`, `MLOps`.

Same pattern for experience via `/api/experience` (fields: `id`, `role`,
`company`, `period`, `location`, `type`, `description`, `achievements[]`,
`techUsed[]`).

`PUT /api/projects/{id}` updates an entry, `DELETE /api/projects/{id}`
removes one — same auth required.

---

## 3. Making the contact form actually email you

The form saves every message to the database regardless, but to also get a
real email:

1. Go to your Google Account → **Security** → **2-Step Verification** → **App
   passwords**. Generate one for "Mail".
2. In `backend/.env`:
   ```
   SMTP_USER=hamza.munir.ml@gmail.com
   SMTP_PASSWORD=<the 16-character app password>
   CONTACT_RECEIVER_EMAIL=hamza.munir.ml@gmail.com
   ```
3. Restart the server. Test with the `/docs` page or the live contact form —
   you should get an email with Reply-To set to the sender's address.

(Prefer a transactional email API like Resend or SendGrid instead of Gmail
SMTP? Swap the implementation in `app/email_utils.py` — the rest of the app
doesn't need to change.)

---

## 4. Deploying — Vercel (both frontend & backend on Vercel)

⚠️ **Important:** Vercel functions are serverless — the filesystem resets on
every request, so **SQLite (`portfolio.db`) will not persist there**. You
need a hosted Postgres database. [Neon](https://neon.tech) has a free tier
that works great for this.

### 4a. Create the database
1. Sign up at neon.tech, create a project → copy the connection string
   (looks like `postgresql://user:pass@ep-xxxx.neon.tech/dbname`).
2. On your own machine, point the backend at it once to seed it:
   ```bash
   cd backend
   # edit .env: set DATABASE_URL to your Neon connection string
   pip install -r requirements.txt
   python -m app.seed
   ```
   This creates the tables and loads the 6 starter projects + 3 experience
   entries into the real Neon database.

### 4b. Deploy the backend as its own Vercel project
1. Push the repo to GitHub (already done for `hamzamunirml/Portfolio`).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the
   same repo **again** (yes, a second Vercel project from the same repo).
3. **Root Directory**: set it to `backend`.
4. Framework Preset: **Other**. Vercel will pick up `backend/vercel.json`
   automatically and deploy `app/main.py` as a Python serverless function.
5. Add environment variables (same as your local `.env`): `ADMIN_API_KEY`,
   `DATABASE_URL` (the Neon string), `SMTP_*`, `CONTACT_RECEIVER_EMAIL`,
   `FRONTEND_ORIGINS` (set to your frontend's Vercel URL).
6. Deploy. You'll get a URL like `https://portfolio-backend.vercel.app`.
   Check `https://portfolio-backend.vercel.app/docs` to confirm it's live.

### 4c. Point the frontend at it
In your **frontend** Vercel project → Settings → Environment Variables, add:
```
VITE_API_URL=https://portfolio-backend.vercel.app
```
Redeploy the frontend. Done — both are now on Vercel, sharing one GitHub repo
as two separate projects with different Root Directories.

---

## 5. Alternative: deploying the backend on Render

If you'd rather not deal with a separate Postgres database, Render lets you
keep using SQLite (it has a persistent disk on paid tiers, and even on the
free tier the SQLite file survives as long as the service doesn't restart):

1. Go to [render.com](https://render.com) → **New** → **Web Service** → connect
   your repo.
2. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m app.seed && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Add environment variables from your `.env` (ADMIN_API_KEY, SMTP_*, FRONTEND_ORIGINS — set this to your Vercel frontend URL).
4. Deploy. You'll get a URL like `https://portfolio-api.onrender.com`.
5. In **Vercel** (frontend project) → Settings → Environment Variables, add
   `VITE_API_URL=https://portfolio-api.onrender.com`, then redeploy.

Note: Render's free tier spins down after inactivity — first request after
idle can take ~30s. The frontend's fallback data covers this gracefully.

---

## 6. Database

SQLite file (`portfolio.db`), created automatically on first run. It's
git-ignored — each environment (local, Render) has its own. To reset it
completely, delete the file and re-run `python -m app.seed`.
