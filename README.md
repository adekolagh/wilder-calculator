# 📊 Wilder 5M Scalping Calculator — PWA

A Progressive Web App (PWA) based on **Welles Wilder's original trading system** (New Concepts in Technical Trading Systems, 1978).

Supports: Forex Majors, Minors, Exotics, Metals, Crypto, Commodities, and Indices.  
Works fully **offline** on Android after installation.

---

## ✅ Features

- All Wilder rules: ADX, +DI/-DI, Parabolic SAR, RSI, ATR
- Correct JPY pip handling (2nd decimal, not 4th)
- SL calculated using the wider of SAR or 1×ATR
- TP1 = 2×ATR, TP2 = 3×ATR
- Risk %, margin, free margin, margin call warning
- Installable on Android as a home screen app (PWA)
- Works fully offline after first load

---

## 🚀 Deploy to Netlify (Step by Step)

### Option A — Netlify + GitHub (Recommended)

1. **Push this project to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Wilder Calculator PWA"
   git remote add origin https://github.com/YOUR_USERNAME/wilder-calculator.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up / log in
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub** and select your repo
   - Build settings will auto-detect from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click **"Deploy site"**

3. **Your app is live!** Netlify gives you a URL like `https://wilder-calc.netlify.app`

---

### Option B — Netlify CLI (Direct Deploy)

```bash
npm install -g netlify-cli
npm install
npm run build
netlify deploy --prod --dir=dist
```

---

## 📱 Install on Android (PWA)

1. Open your Netlify URL in **Chrome** on Android
2. A banner will appear: **"Add to Home Screen"** or **"Install App"**
3. Tap **Install**
4. The app appears on your home screen like a native app
5. Works **offline** — no internet needed after first load

> If the banner doesn't appear automatically:
> Chrome menu (3 dots) → **"Add to Home Screen"** or **"Install App"**

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
wilder-calculator/
├── public/
│   └── icons/
│       ├── icon-192.png      ← PWA icon
│       └── icon-512.png      ← PWA icon
├── src/
│   ├── App.jsx               ← Main calculator component
│   ├── main.jsx              ← React entry point
│   └── index.css             ← Global styles
├── index.html                ← HTML entry point
├── vite.config.js            ← Vite + PWA config
├── netlify.toml              ← Netlify deploy config
└── package.json
```

---

## 📚 Wilder Indicator Settings (Original)

| Indicator | Setting |
|-----------|---------|
| ADX | 14 period |
| +DI / -DI | 14 period |
| Parabolic SAR | Step 0.02, Max 0.20 |
| ATR | 14 period |
| RSI | 14 period |

---

## ⚡ JPY Pairs — Important Note

JPY pairs (USDJPY, EURJPY, GBPJPY, etc.) use **2 decimal places** for pips.  
- Normal pairs: 1 pip = 0.0001 (4th decimal)  
- JPY pairs: 1 pip = 0.01 (2nd decimal)  

The calculator handles this automatically.

---

*Based on: Welles Wilder — "New Concepts in Technical Trading Systems" (1978)*
