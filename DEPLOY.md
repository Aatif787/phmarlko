# Deploying to Render & Vercel

This project is optimized for deployment on [Render](https://render.com) and [Vercel](https://vercel.com).

## Deploying to Vercel (Zero Config)

Vercel is the easiest way to deploy Next.js applications.

1.  Push this code to GitHub/GitLab.
2.  Log in to [Vercel](https://vercel.com).
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your repository.
5.  Vercel will auto-detect Next.js.
6.  Click **Deploy**.

### ⚠️ Critical: Vercel Data Persistence
**Vercel is serverless.** You **cannot** save data to the file system (like `data/orders.json`).
-   Any orders submitted will **fail** or be lost immediately.
-   The current file-based storage implementation is **read-only** in production on Vercel.

**Solution for Vercel:**
You **must** switch to a cloud database. Recommended free options:
-   **Vercel KV** (Redis)
-   **Vercel Postgres**
-   **MongoDB Atlas** (Free Tier)
-   **Supabase**

---

## Deploying to Render

### Prerequisites
1.  Push this code to a GitHub/GitLab repository.
2.  Create a Render account.

### Automatic Deployment (Blueprints)
1.  In the Render Dashboard, go to **Blueprints**.
2.  Click **New Blueprint Instance**.
3.  Connect your repository.
4.  Render will automatically detect `render.yaml` and configure the service.
5.  Click **Apply**.

### Manual Deployment
1.  Create a new **Web Service** on Render.
2.  Connect your repository.
3.  Select **Docker** as the Runtime.
4.  Render will automatically build and deploy using the `Dockerfile`.

### ⚠️ Critical: Render Data Persistence
This application stores data in `data/orders.json`.
**On Render, the file system is ephemeral**, meaning all data will be lost when the app restarts or redeploys.

**To persist data on Render:**
1.  **Upgrade to a paid Render plan** to use a **Persistent Disk**.
2.  Mount the disk to `/var/data`.
3.  Add an environment variable in Render:
    *   Key: `DATA_DIR`
    *   Value: `/var/data`

Alternatively, update the application to use a database (e.g., MongoDB, PostgreSQL) instead of a local JSON file.
