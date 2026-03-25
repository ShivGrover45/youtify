# 🎵 Youtify API

**Youtify** is a specialized backend service built to master **User Authentication**, **Role-Based Access Control (RBAC)**, and **Cloud-based File Handling**. The project simulates a music streaming platform's core engine.

---

## 🚀 Key Features

* **Secure Authentication:** Registration and Login system using JWT (JSON Web Tokens).
* **Role-Based Access Control (RBAC):** Specific endpoints restricted by user permissions.
* **Cloud Media Handling:** Efficiently uploading and managing audio files using cloud providers (e.g.,ImageKit).
* **Password Security:** Industry-standard hashing using Bcrypt.

---

## 📖 API Documentation

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account. |
| `POST` | `/api/auth/login` | Validate credentials and return a JWT. |

### 🎼 Music Management
| Method | Endpoint | Role Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/music/upload` | **Artist** | Uploads music files to cloud storage. |

> **Note:** The upload endpoint includes a middleware check. If a user with the role `listener` or `admin` (without artist permissions) attempts to upload, the API returns a `403 Forbidden` status.

---

## 🛠 Tech Stack

* **Runtime:** Node.js / Express
* **Database:** MongoDB / PostgreSQL
* **Auth:** JWT & Bcrypt
* **File Handling:** Multer (for multipart/form-data)
* **Cloud Storage:** [Insert Service Name, e.g., Cloudinary or AWS S3]

---

## 🧠 Implementation Details

### File Handling Strategy
To ensure the server remains performant, I implemented a **Stream-to-Cloud** pipeline.
1.  **Validation:** The API checks for valid audio MIME types.
2.  **Upload:** Files are passed through `Multer` and sent directly to the cloud.
3.  **Persistence:** Only the metadata (file URL, duration, artist ID) is stored in the database.

---

## 🗺 Roadmap (Upcoming Features)

- [ ] **GET /api/music**: Fetch track lists with search and filter functionality.
- [ ] **POST /api/music/album**: Create and manage musical albums (Artist only).
- [ ] **Stream logic**: Direct streaming URLs for frontend integration.
- [ ] **User Playlists**: Allow users to save their favorite tracks.

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/youtify.git](https://github.com/your-username/youtify.git)
   ```
2.**change the directory:**
  ```bash
  cd youtify   
  ``` 
3.**configure environment variables:**
  ```bash
  PORT=3000
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_secret_key
  CLOUD_NAME=your_cloud_name
  ```
4.**Run the Server:**
```bash
npm start
```