# Deckflow — AI Presentation Generator

> Turn your ideas into beautifully structured slides in seconds.

## Overview

Deckflow is a SaaS landing page for an AI-powered presentation generator targeting students, professionals, and founders.

## Stack

- **HTML5** — semantic structure
- **CSS3** — vanilla CSS with custom properties, glassmorphism, animations
- **Google Fonts** — Manrope + Space Grotesk
- **Vercel** — zero-config static deployment

## Local Development

```bash
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
# Install Vercel CLI (once)
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments on every push.

## Project Structure

```
deckflow/
├── index.html      # Main page
├── styles.css      # Design system + all styles
├── vercel.json     # Deployment + security headers config
├── robots.txt      # SEO crawler rules
├── sitemap.xml     # XML sitemap
├── package.json    # Project metadata + dev scripts
└── README.md       # This file
```

## Sections

- **Navigation** — sticky glassmorphism header
- **Hero** — headline, subheadline, CTA, proof cards, animated slide carousel
- **Problem/Solution** — side-by-side comparison with animated list items
