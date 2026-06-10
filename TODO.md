# TODO - zamin-hotel2 (MERN Luxury Hotel Booking)

## Step 1: Initialize monorepo structure

- [ ] Create `/client` (Vite + React + Tailwind) and `/server` (Express + Mongoose)
- [ ] Add base scripts + environment templates

## Step 2: Backend (production-ready)

- [x] Implement Express app with CORS, JSON parsing, error handling, logging
- [x] Add Mongo connection + Mongoose models: User, Room, Booking, Review
- [x] Implement JWT auth middleware + role checks (admin)
- [x] Implement REST APIs:
  - [x] Auth: register/login/me
  - [x] Rooms: list/detail/search (public) + CRUD (admin)
  - [x] Bookings: create/list (user) + list all + analytics helpers (admin)
  - [x] Reviews: add/list by room
- [x] Seed script for rooms (optional) (GET /api/seed)

## Step 3: Frontend (all required pages)

- [ ] React Router setup
- [ ] Implement pages: Home, Rooms, Room Details, Booking, About, Contact, Gallery, Login, Register, Dashboard
- [ ] Implement responsive luxury UI with Tailwind + smooth animations
- [ ] Implement booking form with date picker
- [ ] Implement auth UI + protected routes
- [ ] Implement room cards + room details views

## Step 4: Admin panel

- [ ] Dashboard admin UI
- [ ] Room management (CRUD)
- [ ] Booking management (view)
- [ ] Analytics view (from admin endpoints)

## Step 5: QA / Run instructions

- [ ] Provide `.env` examples
- [ ] Add root README with setup steps
- [ ] Run build + start (client + server)
