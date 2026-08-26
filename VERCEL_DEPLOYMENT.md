# Vercel deployment

The `main` branch is connected to the Vercel project `kalendly`. The current preview deployment builds successfully, but production booking data requires a hosted MongoDB connection because Vercel instances do not persist a local database directory between requests or deployments.

Set these variables in Vercel Project Settings → Environment Variables for Preview and Production:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Hosted MongoDB connection string for the application database |
| `NEXTAUTH_SECRET` | Long random secret used to sign NextAuth sessions |
| `NEXTAUTH_URL` | The deployed Vercel URL, including `https://` |
| `ADMIN_EMAIL` | Scheduler administrator login email |
| `ADMIN_PASSWORD` | Scheduler administrator login password |
| `APP_URL` | The deployed public application URL |
| `COMPOSIO_API_KEY` | Enables Google Calendar integration and event creation |

After adding the variables, redeploy from the `main` branch. Do not commit `.env.local`, database credentials, administrator passwords, or API keys. The local `npm run dev:local` workflow is intended only for development and uses a local MongoDB data directory; it is not a production persistence layer on Vercel.
