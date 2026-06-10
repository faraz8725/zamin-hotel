# zamin-hotel2 — MERN Luxury Hotel Booking (Production-ready)

This repo will contain:

- `client/` — React (Vite) + Tailwind + all UI pages (public + auth + dashboard + admin)
- `server/` — Node.js + Express + MongoDB (Mongoose) + JWT auth + REST APIs

## Prerequisites

- Node.js
- MongoDB (local) **or** MongoDB Atlas URL

## Local env

Copy environment templates:

- `server/.env.example` → `server/.env`
- `client/.env.example` → `client/.env`

## Run

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Admin

Admin routes are protected via JWT role (`admin`).
