<p align="center">
  <img src="public/logos/badge-logo.svg" width="120" height="120" alt="Code::Stats Badge logo" />
</p>

# codestats-badge

[![CodeFactor](https://www.codefactor.io/repository/github/nottherealwallyx/codestats-badge/badge)](https://www.codefactor.io/repository/github/nottherealwallyx/codestats-badge)
[![CI](https://github.com/NotTheRealWallyx/codestats-badge/actions/workflows/ci.yml/badge.svg)](https://github.com/NotTheRealWallyx/codestats-badge/actions/workflows/ci.yml) [![codecov](https://codecov.io/github/NotTheRealWallyx/codestats-badge/graph/badge.svg?token=RW1A4NQTRT)](https://codecov.io/github/NotTheRealWallyx/codestats-badge)

📊 A dynamic SVG badge generator for [Code::Stats](https://codestats.net) profiles, perfect for embedding your XP and top languages in your GitHub README.

👉 Want to see what the badges look like before adding one? Check out **[codestats-badge.vercel.app](https://codestats-badge.vercel.app/)** for live examples and an interactive way to build your own.

## 🚀 Features

### XP Badge

- Displays **total XP** from your Code::Stats profile
- Shows your **top languages** by XP
- Returns a **custom SVG** you can embed anywhere

### Activity Badge

- Displays **activity squares** for daily XP contributions
- Returns a **custom SVG** you can embed anywhere

## 📦 Usage

Add a badge to your README (or anywhere that renders images) by pointing an `<img>` or Markdown image tag at the API, replacing `yourusername` with your Code::Stats username:

```md
![Code::Stats](https://codestats-badge.vercel.app/api/code-stats?user=yourusername)
```

For the activity badge:

```md
![Code::Stats Activity](https://codestats-badge.vercel.app/api/code-stats/activity?user=yourusername)
```

## 🎨 Customization

You can control the appearance of your badges using query parameters.

### XP Badge

- **Show/hide progress bar:**  
  Use `showProgressBar=false` to hide the progress bar.

  ```
  /api/code-stats?user=yourusername&showProgressBar=false
  ```

- **Display language XP instead of level:**  
  Use `showLangXP=true` to show XP for each language instead of the level.

  ```
  /api/code-stats?user=yourusername&showLangXP=true
  ```

- **Theme (light or dark):**  
  Use `theme=light` for a light background, or `theme=dark` for a dark background (default is dark).

  ```
  /api/code-stats?user=yourusername&theme=light
  ```

- **Limit number of languages displayed:**  
  Use `limit=` to set how many top languages to show (default is 6, max is 20).

  ```
  /api/code-stats?user=yourusername&limit=10
  ```

- **Compact mode:**  
  Use `compact=true` to display a simplified badge showing only total XP.

  ```
  /api/code-stats?user=yourusername&compact=true
  ```

- **Borderless mode:**  
  Use `borderless=true` to remove the badge's outer border for a cleaner look.

  ```
  /api/code-stats?user=yourusername&borderless=true
  ```

### Activity Badge

- **Theme (light or dark):**  
  Use `theme=light` for a light background, or `theme=dark` for a dark background (default is dark).

  ```
  /api/code-stats/activity?user=yourusername&theme=light
  ```

- **Borderless mode:**  
  Use `borderless=true` to remove the badge's outer border for a cleaner look.

  ```
  /api/code-stats/activity?user=yourusername&borderless=true
  ```

All of these options can be mixed and matched, and previewed live on the [examples site](https://codestats-badge.vercel.app/).

## 📄 License

This project is licensed under the GNU GPL v3. See [LICENSE](LICENSE) for details.

## 🛠️ Contributing

Looking to run this project locally or deploy your own instance? See [DEVELOPMENT.md](DEVELOPMENT.md).
