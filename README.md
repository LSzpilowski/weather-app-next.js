# Cloudly — Weather App

A responsive weather app built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Search any city, use IP-based geolocation, pin up to 6 favourite cities, and browse a 5-day forecast — all within a single, fully client-side UI.

**Live demo:** [cloudly-weather-app.vercel.app](https://cloudly-weather-app.vercel.app)

---

## Features

- City search with instant weather data
- IP-based geolocation ("My location") — no GPS or browser permissions required
- Pin up to 6 cities, persisted in `localStorage`
- 5-day forecast with clickable day cards
- Humidity, wind speed, min/max temperature detail cards
- Fully responsive — mobile-first layout, full-viewport on desktop
- Accessible — ARIA labels, keyboard navigation, focus management
- In-memory API response cache (10-minute TTL)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript (strict) |
| Package manager | pnpm |
| Testing | Jest + React Testing Library |
| Deployment | Vercel |

---

## Getting started

### 1. Clone and install

\`\`\`bash
git clone https://github.com/LSzpilowski/weather-app-next.js.git
cd weather-app-next.js
pnpm install
\`\`\`

### 2. Set up environment variables

\`\`\`bash
cp .env.example .env.local
\`\`\`

Open `.env.local` and fill in your API keys (see [Environment variables](#environment-variables) below).

### 3. Run the dev server

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

The app uses two external APIs, both with **free tiers** that are sufficient for personal/demo use.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WEATHER_API_KEY` | ✅ | SheCodes Weather API key |
| `NEXT_PUBLIC_GEOCODING_API_KEY` | ✅ | OpenWeatherMap Geocoding API key |
| `NEXT_PUBLIC_DEFAULT_CITY` | optional | City shown on first load (default: `Wrocław`) |
| `NEXT_PUBLIC_APP_URL` | optional | Production URL used for Open Graph metadata |

### Getting API keys

**SheCodes Weather API** (main weather data)
1. Sign up for free at [shecodes.io](https://www.shecodes.io/weather)
2. Copy your API key from the dashboard
3. Paste it as `NEXT_PUBLIC_WEATHER_API_KEY`

**OpenWeatherMap Geocoding API** (reverse geocoding for "My location")
1. Sign up for free at [openweathermap.org](https://openweathermap.org/api)
2. Go to *API keys* in your account and copy the default key
3. Paste it as `NEXT_PUBLIC_GEOCODING_API_KEY`

> **Note on `NEXT_PUBLIC_` prefix:** These keys are exposed to the browser (required for client-side API calls). This is intentional — both APIs are free and rate-limited by key, not by account credit. If you're concerned about key abuse, restrict them in the respective dashboards by HTTP referrer / domain.

---

## Project structure

\`\`\`
src/
├── app/
│   ├── components/
│   │   ├── Weather.tsx           # Root stateful component, custom hooks
│   │   ├── DisplayWeather.tsx    # Main layout, composes all sub-components
│   │   ├── SearchForm.tsx        # Search input, location button, pin toggle
│   │   ├── CurrentWeather.tsx    # City name, temperature, live clock
│   │   ├── WeatherDetailCard.tsx # Humidity / wind / min / max cards
│   │   ├── ForecastCard.tsx      # Single day forecast card
│   │   ├── PinnedCityCard.tsx    # Pinned city card (fetches its own weather)
│   │   ├── FormattedDate.tsx     # Date/time formatter
│   │   └── ErrorMessage.tsx      # Error banner
│   ├── hooks/
│   │   ├── useWeather.ts         # Weather fetching, state, caching
│   │   └── usePinnedCities.ts    # Pin/unpin, localStorage persistence
│   ├── animations/
│   │   └── loading_paperplane.json  # Lottie loading animation
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── __tests__/                    # Jest + RTL unit tests (44 tests)
\`\`\`

---

## Running tests

\`\`\`bash
pnpm test
\`\`\`

44 unit tests covering all UI components and utility functions.

---

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. In the Vercel project, go to **Settings → Environment Variables** and add:
   - `NEXT_PUBLIC_WEATHER_API_KEY`
   - `NEXT_PUBLIC_GEOCODING_API_KEY`
   - `NEXT_PUBLIC_DEFAULT_CITY` *(optional)*
   - `NEXT_PUBLIC_APP_URL` *(set to your `*.vercel.app` or custom domain)*
4. Deploy — Vercel auto-detects Next.js and configures everything

> `.env.local` is gitignored and will never be pushed to GitHub. Vercel reads the environment variables you add through its dashboard, not from the repository.
