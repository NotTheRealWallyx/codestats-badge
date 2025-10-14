# codestats-badge

[![CodeFactor](https://www.codefactor.io/repository/github/nottherealwallyx/codestats-badge/badge)](https://www.codefactor.io/repository/github/nottherealwallyx/codestats-badge)
[![CI](https://github.com/NotTheRealWallyx/codestats-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/NotTheRealWallyx/codestats-badge/actions/workflows/ci.yml) [![codecov](https://codecov.io/github/NotTheRealWallyx/codestats-badge/graph/badge.svg?token=RW1A4NQTRT)](https://codecov.io/github/NotTheRealWallyx/codestats-badge)

📊 A dynamic SVG badge generator for [Code::Stats](https://codestats.net) profiles, perfect for embedding your XP and top languages in your GitHub README.

---

## 🚀 Features

- Displays **total XP** from your Code::Stats profile
- Shows your **top languages** by XP
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

![Code::Stats](https://codestats-badge.vercel.app/api/code-stats?user=Wallyx)

---

## 🎨 Customization

You can control the appearance of your badge using query parameters:

- **Show/hide progress bar:**  
  Use `showProgressBar=false` to hide the progress bar.  
  Example:

  ```
  /api/code-stats?user=yourusername&showProgressBar=false
  ```

- **Display language XP instead of level:**  
  Use `showLangXP=true` to show XP for each language instead of the level.  
  Example:

  ```
  /api/code-stats?user=yourusername&showLangXP=true
  ```

- **Theme (light or dark):**  
  Use `theme=light` for a light background, or `theme=dark` for a dark background (default is dark).  
  Example:

  ```
  /api/code-stats?user=yourusername&theme=light
  ```

- **Limit number of languages displayed:**  
  Use `limit=` to set how many top languages to show (default is 6, max is 20).  
  Example:

  ```
  /api/code-stats?user=yourusername&limit=10
  ```

- **Compact mode:**  
  Use `compact=true` to display a simplified badge showing only total XP.  
  Example:

  ```
  /api/code-stats?user=yourusername&compact=true
  ```

  ![Compact Code::Stats](https://codestats-badge.vercel.app/api/code-stats?user=Wallyx&compact=true)

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

- Font choices
- Customizable color palette via query parameters

---

## 📄 License

This project is licensed under the GNU GPL v3.

---

## 🙌 Credits

Inspired by [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

Made with ❤️ to level up your README.
