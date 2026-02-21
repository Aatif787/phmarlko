# Deploying to Render

This project is optimized for deployment on [Render](https://render.com).

## Prerequisites

1.  Push this code to a GitHub/GitLab repository.
2.  Create a Render account.

## Automatic Deployment (Blueprints)

1.  In the Render Dashboard, go to **Blueprints**.
2.  Click **New Blueprint Instance**.
3.  Connect your repository.
4.  Render will automatically detect `render.yaml` and configure the service.
5.  Click **Apply**.

## Manual Deployment

1.  Create a new **Web Service** on Render.
2.  Connect your repository.
3.  Select **Docker** as the Runtime.
4.  Render will automatically build and deploy using the `Dockerfile`.

## Important: Data Persistence

This application stores data in `data/orders.json`.
**On Render, the file system is ephemeral**, meaning all data will be lost when the app restarts or redeploys.

### To persist data:

1.  **Upgrade to a paid Render plan** to use a **Persistent Disk**.
2.  Mount the disk to `/var/data`.
3.  Add an environment variable in Render:
    *   Key: `DATA_DIR`
    *   Value: `/var/data`

Alternatively, update the application to use a database (e.g., MongoDB, PostgreSQL) instead of a local JSON file.
