# FoodHub Frontend

FoodHub is a role-based food delivery platform built with Next.js, TypeScript, Tailwind CSS, and Better Auth.

## Features

- Customer, provider, and admin dashboards
- Role-aware navbar, sidebar, and route protection
- Homepage with featured meals, providers, FAQs, and newsletter section
- AI chat assistant on the homepage
- Personalized meal recommendations for customers
- Provider meal description generator
- Responsive UI for mobile, tablet, and desktop

## Prerequisites

- Node.js 20+
- npm
- A running FoodHub backend

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AUTH_URL=http://localhost:5000/api/auth
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
```

3. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` - start the Next.js dev server
- `npm run build` - build for production
- `npm run start` - run the production build
- `npm run lint` - run ESLint

## Key Routes

- `/` - homepage
- `/dashboard` - customer dashboard
- `/provider/dashboard` - provider dashboard
- `/provider/menu` - provider menu management
- `/admin` - admin dashboard
- `/profile` - editable profile page

## Notes

- The frontend proxies API requests through `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_AUTH_URL`.
- AI chat and recommendation features require the backend to be running with `OPENROUTER_API_KEY` configured.

