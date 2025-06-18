# codestats-badge

📊 A dynamic SVG badge generator for [Code::Stats](https://codestats.net) profiles, perfect for embedding your XP and top languages in your GitHub README.

---

## 🚀 Features

- Displays **total XP** from your Code::Stats profile
- Shows your **top 5 languages** by XP
- Returns a **custom SVG** you can embed anywhere
- Easy to deploy on [Vercel](https://vercel.com), Render, or your own server

---

## 🔧 Usage

### Endpoint:

```
/api/code-stats?user=<your_codestats_username>
```

### Example:

```markdown
![Code::Stats](https://your-domain.com/api/code-stats?user=yourusername)
```

---

## 💻 Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Run the server

```bash
node index.js
```

Then open:

```
http://localhost:3000/api/code-stats?user=yourusername
```

---

## 🚀 Deployment

This project works great on:

- [Vercel](https://vercel.com)
- [Render](https://render.com)
- [Heroku](https://heroku.com)
- Any Node.js-capable host

---

## 🧠 Customization Ideas

- Theme support (light/dark)
- Font choices
- Limit number of languages shown (`?limit=3`)
- Add GitHub Action to regenerate daily static SVG

---

## 📄 License

MIT

---

## 🙌 Credits

Inspired by [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

Made with ❤️ to level up your README.
