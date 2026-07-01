# Development

This is a [Next.js](https://nextjs.org) app. The badge endpoints live under `app/api/`, the website (examples/homepage) lives in `app/components/` and `app/page.tsx`, and shared logic lives in `app/lib/`.

## Requirements

- Node.js 20 (matches the version used in CI)

## 1. Install dependencies

```bash
npm install
```

## 2. Run the dev server

```bash
npm run dev
```

Then open:

```
http://localhost:3000/api/code-stats?user=yourusername
```

This uses Next.js's dev server with hot reload, including the API routes.

## 3. Build and run a production build locally

```bash
npm run build
npm run start
```

`npm run start` serves the production build (`next start`) — run `npm run build` first, or it will fail.

## Linting and formatting

This project uses [Biome](https://biomejs.dev) (not ESLint/Prettier).

```bash
npm run lint    # check for lint errors
npm run format  # format and fix in place
npm run ci      # the check biome runs in CI (no writes)
```

## Testing

Tests run on [Vitest](https://vitest.dev).

```bash
npm run test           # run the test suite
npm run test:coverage  # run with coverage
```

## Before opening a PR

CI (`.github/workflows/ci.yml`) runs `npm run ci` (Biome) and `npm run test:coverage`. Run both locally before pushing to avoid surprises:

```bash
npm run ci
npm run test:coverage
```

# Deployment

This project is a standard Next.js app, so it works on any Next.js-compatible host:

- [Vercel](https://vercel.com) (recommended)
- Any Node.js host that can run `next build` + `next start`
