# TODO

- [x] Fix 1: Authentication UI Fix (SiteHeader)
  - [x] Detect logged-in user by calling `GET /api/auth/me`
  - [x] If logged in: hide Login/Register and show profile avatar/button
  - [x] If not logged in: keep Login/Register buttons exactly as-is

- [x] Fix 2: Room Creation Bug
  - [ ] Verify admin auth middleware and token flow for `POST /api/rooms`
  - [ ] Fix backend or client request/body issues so admin can create rooms and data saves
  - [ ] Ensure any errors aren’t silently swallowed

- [ ] Fix 3: ImageKit Integration
  - [ ] Add backend endpoint for ImageKit upload signature
  - [ ] Update admin room creation UI to upload images to ImageKit and submit returned URLs
  - [ ] Ensure uploaded ImageKit URLs are saved to `Room.imageUrls`
  - [ ] Verify rooms display the uploaded images across pages
- [x] Add/Update env: create a single server/.env and server/.env.example entries for ImageKit endpoints/keys
