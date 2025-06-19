# codestats-badge

📊 A dynamic SVG badge generator for [Code::Stats](https://codestats.net) profiles, perfect for embedding your XP and top languages in your GitHub README.

---

## 🚀 Features

- Displays **total XP** from your Code::Stats profile
- Shows your **top languages** by XP (customizable with `?limit=`)
- Returns a **custom SVG** you can embed anywhere
- Easy to deploy on [Vercel](https://vercel.com), Render, or your own server

---

## 🔧 Usage

### Endpoint:

```
/api/code-stats?user=<your_codestats_username>&limit=6
```

### Example:

```markdown
![Code::Stats](https://your-domain.com/api/code-stats?user=yourusername)
```

---

## 💻 Local Development

This project supports both local Express server and Vercel serverless function usage.

### 1. Install dependencies

```bash
npm install
```

### 2. Run the local Express server

```bash
npm run start
```

Then open:

```
http://localhost:3000/api/code-stats?user=yourusername
```

### 3. (Optional) Use Vercel for local development

If you want to test the Vercel serverless function locally:

```bash
vercel dev
```

---

## 🚀 Deployment

This project works great on:

- [Vercel](https://vercel.com) (recommended, uses `api/code-stats.js` serverless function)
- [Render](https://render.com) (runs Express server)
- [Heroku](https://heroku.com) (runs Express server)
- Any Node.js-capable host

---

## 🧠 Next additions

- Light/dark theme toggle via query parameter
- Font choices
- Customizable color palette via query parameters
- Option to hide/show progress bar
- Option to display language XP instead of level
- Support for compact/minimal badge layout
- Add last updated timestamp

---

## 📄 License

MIT

---

## 🙌 Credits

Inspired by [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

Made with ❤️ to level up your README.
