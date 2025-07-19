# Decloak UI (Next.js)

This project is a Next.js-based UI for the Decloak platform. Tailwind CSS provides styling and a small collection of Shadcn components.

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

These commands create an optimized build and start the production server.

## Environment variables

Create a `.env` file with the following variables:

```
NEXT_PUBLIC_BACKEND_URL=<backend api url>
NEXT_PUBLIC_ADMIN_PASSWORD=<password for the admin login>
```

## Deploying to Vercel

This project works out-of-the-box with Vercel's Next.js runtime. To deploy:

1. Ensure Node.js 20 is used (see `.nvmrc`).
2. Add the environment variables above in your Vercel project settings.
3. Connect this repository to Vercel; the default build (`yarn build`) will run automatically.

Your application will be available at the generated Vercel URL once the build completes.

