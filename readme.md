# 🎵 Youtify — Music Streaming API

A backend REST API simulating a music streaming platform with role-based access control, cloud media storage, and audio streaming via CDN redirection.

## 🌐 Live Demo

| | Link |
|---|---|
| 🖥️ Frontend | [youtify-frontend.vercel.app](https://youtify-frontend.vercel.app) |
| 🔗 Backend API | `https://your-render-url.onrender.com` ← replace with your actual URL |

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT + bcryptjs |
| File Upload | Multer (memory storage) |
| Cloud Storage | ImageKit CDN |
| Cookie Handling | cookie-parser |
| Cross-Origin | CORS (configured for Vercel frontend) |

---

## 🚀 Features

- **JWT Authentication** — Register, login, and protected route access via HTTP-only cookies
- **Role-Based Access Control (RBAC)** — Two roles: `artist` (upload/create) and `user` (read/stream)
- **Music Upload** — Artists upload audio files via multipart form; files are streamed directly to ImageKit CDN (no disk writes)
- **Album Management** — Artists can create albums and associate tracks
- **Audio Streaming** — Stream endpoint resolves track by ID and redirects to CDN URL for playback
- **Track Search** — Case-insensitive regex search by title
- **CORS Configured** — Locked to frontend origin with credentials support

---

## 📁 Project Structure

```
youtify/
├── server.js                     # Entry point — connects DB, starts server
├── package.json
└── src/
    ├── app.js                    # Express app — middleware + route mounting
    ├── db/
    │   └── db.js                 # MongoDB connection
    ├── routes/
    │   ├── auth.routes.js        # /api/auth
    │   └── music.routes.js       # /api/music
    ├── controller/
    │   ├── auth.controller.js    # register, login, me
    │   └── music.controller.js   # upload, stream, search, albums
    ├── middleware/
    │   └── auth.middleware.js    # authMiddleware, authArtist, authUser
    ├── models/
    │   ├── user.model.js         # User schema (username, email, password, role)
    │   ├── music.model.js        # Music schema (uri, title, artist ref)
    │   └── album.model.js        # Album schema (title, musics[], artist ref)
    └── services/
        └── storage.service.js    # ImageKit upload wrapper
```

---

## 📖 API Reference

### 🔐 Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | None | Register a new user. Body: `{ username, email, password, role }` |
| `POST` | `/login` | None | Login. Returns JWT in HTTP-only cookie. Body: `{ username/email, password }` |
| `GET` | `/me` | Any logged-in user | Returns current user profile (no password) |

**Register body example:**
```json
{
  "username": "shiv",
  "email": "shiv@example.com",
  "password": "secret123",
  "role": "artist"
}
```

---

### 🎵 Music — `/api/music`

All music routes require a valid JWT cookie.

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `/upload` | `artist` | Upload audio file to ImageKit. Form-data: `music` (file) + `title` (string) |
| `POST` | `/album` | `artist` | Create an album. Body: `{ title, musicId }` |
| `GET` | `/` | Any | Fetch all tracks with artist username |
| `GET` | `/albums` | Any | Fetch all albums with artist info |
| `GET` | `/stream/:id` | Any | Stream track by MongoDB ID (redirects to CDN URL) |
| `GET` | `/search?title=` | Any | Case-insensitive title search |

---

## 🔒 RBAC Logic

| Role | Can Upload Music | Can Create Album | Can Stream/Search |
|------|-----------------|-----------------|-------------------|
| `artist` | ✅ | ✅ | ✅ |
| `user` | ❌ (403) | ❌ (403) | ✅ |
| Unauthenticated | ❌ (401) | ❌ (401) | ❌ (401) |

---

## 🛠️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- ImageKit account (free tier works)

### Steps

**1. Clone the repo**
```bash
git clone https://github.com/ShivGrover45/youtify.git
cd youtify
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

**4. Start the server**
```bash
npm start
# Server runs on http://localhost:3000
```

---

## 🧠 Implementation Notes

### Stream-to-Cloud Upload Pipeline
Audio files are never written to disk. Multer stores the file in memory as a Buffer, which is base64-encoded and sent directly to ImageKit. Only the resulting CDN URL is persisted in MongoDB.

### Streaming Strategy
The `/stream/:id` endpoint looks up the track's CDN URL from MongoDB and issues a `302` redirect to the ImageKit-hosted file. This offloads bandwidth entirely to the CDN.

### Cookie-Based Auth
JWT is stored in an HTTP-only, `SameSite=none`, `Secure=true` cookie — making it inaccessible to JavaScript and safe for cross-origin requests between the Vercel frontend and the deployed backend.

---

## 🗺️ Roadmap

- [ ] Delete track endpoint (`DELETE /api/music/:id`)
- [ ] Pagination for `/api/music` (currently returns all tracks)
- [ ] Thumbnail upload support via ImageKit
- [ ] Playlist creation for listeners
- [ ] Rate limiting middleware

---

## 👨‍💻 Author

**Shiv Grover** — [github.com/ShivGrover45](https://github.com/ShivGrover45)