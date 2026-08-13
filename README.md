# Gajra Gears frontend

React/Vite frontend for the Gajra Gears product catalogue and customer locator.
The backend remains hosted by FieldKonnect; Railway only hosts this frontend.

## Requirements

- Node.js 20.19 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The application has safe production URL defaults, so a `.env` file is not
required to use the existing backend. To customize the endpoints:

```bash
cp .env.example .env
npm run dev
```

Restart the development server after changing `.env`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Main product/customer API |
| `VITE_DISTRIBUTOR_API_BASE_URL` | Distributor, state, city and pincode API |
| `VITE_ASSET_BASE_URL` | Product image base URL |

Vite embeds `VITE_*` values into the browser bundle at build time. They must
not contain secrets.

## Build locally

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Deploy to Railway

1. Push this project to a GitHub repository.
2. In Railway, choose **New Project > Deploy from GitHub repo**.
3. Select the repository and set the service root directory to this project if
   it is located inside a larger repository.
4. Railway reads `railway.json`, runs `npm run build`, and starts the frontend
   on Railway's assigned `PORT`.
5. Open **Settings > Networking > Generate Domain**.

No Railway environment variables are required while using the current
FieldKonnect backend. If an endpoint changes, add the relevant `VITE_*`
variables in Railway and redeploy. Because these values are build-time values,
a new deployment is required after changing them.

## Available commands

```bash
npm run dev      # local development server
npm run build    # production build
npm run start    # Railway/production static server
npm run lint     # ESLint checks
npm run preview  # local production preview
```
