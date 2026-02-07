# 🌊 Guide Touristique Nador

> Discover Nador, the Pearl of the Mediterranean — a modern, responsive tourism web application.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4-teal)

## 📋 Description

A visitor-facing tourism platform for Nador, Morocco. Browse places by category, search and filter, view detailed information with photo galleries, and subscribe to a newsletter. Built as Part 1 (visitor experience); an admin panel can be integrated separately.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19 + TypeScript** | UI framework |
| **Vite 7** | Build tool & dev server |
| **Redux Toolkit** | State management |
| **React Router v6** | Client-side routing |
| **React Hook Form + Yup** | Form handling & validation |
| **Axios** | HTTP client |
| **React Toastify** | Toast notifications |
| **Tailwind CSS 4** | Utility-first styling |
| **Lucide React** | Icons |
| **JSON Server** | Mock REST API |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone <repo-url>
cd nador-travel-app
npm install
```

### Environment Variables

Copy the example file and configure:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | JSON Server URL | `http://localhost:3001` |
| `VITE_NEWSLETTER_WEBHOOK_URL` | n8n webhook URL (optional) | _(mock mode if empty)_ |

### Running the Application

**Start both dev server and mock API:**

```bash
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 — Mock API
npm run server

# Terminal 2 — Vite dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── pages/visitor/          # Visitor pages (Home, List, Detail, 404)
├── components/
│   ├── common/             # Navbar, Footer, LoadingSpinner, ErrorMessage
│   └── visitor/            # PlaceCard, SearchBar, CategoryFilter, etc.
├── store/                  # Redux store & slices (places, newsletter)
├── services/               # Axios instance & API calls
├── types/                  # TypeScript interfaces & enums
├── utils/                  # Constants, helpers, useDebounce hook
├── routes/                 # AppRoutes with lazy loading
├── App.tsx                 # Root layout with scroll-to-top
├── main.tsx                # Entry point with providers
└── index.css               # Tailwind imports & custom theme
```

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Hero, category grid, about section, newsletter |
| `/places` | PlacesListPage | Search, filter, paginated grid of places |
| `/places/:id` | PlaceDetailPage | Photo gallery, schedule, prices, transport |
| `*` | NotFoundPage | 404 error page |

## 🔌 Integration Notes (for Admin Developer)

### Shared Resources
- **Types:** `src/types/index.ts` — all interfaces and enums
- **API config:** `src/services/api.ts` — Axios instance with base URL
- **Redux store:** `src/store/index.ts` — add admin slices here
- **Constants:** `src/utils/constants.ts` — category metadata, day names

### What to Add for Admin
- Authentication system (login/logout/JWT)
- Protected routes (`/admin/*`)
- Admin dashboard & CRUD pages
- New Redux slices (`authSlice`, `adminSlice`)
- Admin layout component

### Integration Steps
1. Add admin pages under `src/pages/admin/`
2. Add admin components under `src/components/admin/`
3. Create `authSlice.ts` in `src/store/slices/`
4. Add admin routes in `src/routes/AppRoutes.tsx`
5. Replace JSON Server with your real backend

## 📦 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run server` | Start JSON Server on port 3001 |
| `npm run dev:all` | Run both concurrently |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📝 License

© 2025 Guide Touristique Nador. All rights reserved.
