# Development

This project supports both a local Express server and Vercel serverless function usage.

## 1. Install dependencies

```bash
npm install
```

## 2. Run the local Express server

```bash
npm run start
```

Then open:

```
http://localhost:3000/api/code-stats?user=yourusername
```

## 3. (Optional) Use Vercel for local development

If you want to test the Vercel serverless function locally:

```bash
vercel dev
```

# Deployment

This project works great on:

- [Vercel](https://vercel.com) (recommended, uses `api/code-stats.js` serverless function)
- [Render](https://render.com) (runs Express server)
- [Heroku](https://heroku.com) (runs Express server)
- Any Node.js-capable host
