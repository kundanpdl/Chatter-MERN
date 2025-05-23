# 💬 MERN Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js). The app includes real-time messaging using Socket.IO and features user authentication, image uploads, and a beautiful UI with Tailwind CSS and DaisyUI.

## 🧰 Tech Stack

### **Frontend**

* React
* Zustand (state management)
* Axios (API requests)
* Tailwind CSS & DaisyUI (styling)
* React Router DOM (routing)
* React Hot Toast (notifications)

### **Backend**

* Node.js
* Express.js
* MongoDB & Mongoose (database and ORM)
* JSON Web Token (authentication)
* bcryptjs (password hashing)
* dotenv (environment variables)
* cookie-parser (for managing cookies)
* Cloudinary (image uploads)
* Socket.IO (real-time communication)

---

## 🚀 Features

* 👥 User registration and login with JWT and hashed passwords
* 📸 Profile picture uploads via Cloudinary
* 🍪 Secure session handling with cookies
* 🧵 Real-time messaging via Socket.IO
* 🎨 Clean and responsive UI with Tailwind CSS & DaisyUI
* 🔥 Instant feedback with toast notifications
* 🌐 Routing using React Router DOM
* 🗃️ Centralized state management with Zustand

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kundanpdl/Chatter-MERN.git
cd Chatter-MERN
```

### 2. Setup Backend

```bash
cd backend
npm install
touch .env
npm run dev
```
(Note: Look at the environment variable section for further details on .env file.)

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend `.env` example:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🔧 Scripts

### Backend

```bash
npm run dev       # Start backend server with nodemon
```

### Frontend

```bash
npm run dev       # Start React dev server
```

---

## 📡 Real-Time with Socket.IO

The app establishes a WebSocket connection for live chat updates. Users get notified of messages instantly without refreshing the page.

---

## 🛡️ Security

* Passwords are hashed using `bcryptjs`
* Tokens are stored securely via cookies
* Environment variables are hidden with `dotenv`

---
