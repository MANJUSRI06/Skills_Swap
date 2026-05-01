# SkillSwap AI 🚀

> Trade Skills. Build Confidence. Grow Together.

SkillSwap AI is a modern peer-to-peer student skill exchange platform where students can teach skills they know and learn skills they want — without paying money. The platform intelligently connects students based on shared learning interests, teaching abilities, and availability.

---

## 🌟 Project Overview

Many students want to learn new technologies and improve their skills, but courses and mentorships are often expensive or inaccessible.

SkillSwap AI solves this problem by creating a collaborative learning ecosystem where students exchange knowledge with each other.

Example:
- A student teaching **Java** can learn **UI/UX Design**
- A student teaching **React** can learn **DSA**
- Students grow together through peer learning

---

## ✨ Key Features

### 🔐 Authentication System
- User Signup
- User Login
- JWT Authentication
- Protected Routes

### 👤 User Profiles
- Department & Year
- Bio Section
- Skills to Teach
- Skills to Learn
- Availability Preferences

### 🤝 Smart Skill Matching
SkillSwap AI calculates intelligent match scores between students based on:
- Shared interests
- Teaching skills
- Learning goals
- Availability

### 📩 Swap Requests
- Send learning requests
- Accept / Reject requests
- Manage learning connections

### 🤖 AI Chatbot Assistant
Integrated Gemini AI assistant that helps students:
- Find placement skills
- Improve profiles
- Suggest learning paths
- Guide platform usage

### 🎨 Modern UI/UX
- Glassmorphism design
- Responsive layouts
- Smooth animations
- Startup-inspired interface
- Mobile-friendly experience

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Lucide React Icons

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

## Database
- MongoDB Atlas
- Mongoose

## AI Integration
- Google Gemini API

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 📁 Project Structure

```bash
SkillSwap-AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── api/
│   │   └── assets/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
```

---

# ⚡ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/SkillSwap-AI.git
cd SkillSwap-AI
```

---

# 🔧 Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

## Start backend

```bash
npm run dev
```

---

# 🎨 Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

---

## Users

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/users/me` | Get current user |
| PUT | `/api/users/profile` | Update profile |
| GET | `/api/users/discover` | Discover users |

---

## Requests

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/requests/send` | Send request |
| GET | `/api/requests` | Get requests |
| PUT | `/api/requests/:id/accept` | Accept request |
| PUT | `/api/requests/:id/reject` | Reject request |

---

## Chatbot

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/chatbot/ask` | Ask Gemini AI assistant |

---

# 🧠 Smart Match Score Logic

The platform calculates intelligent match percentages using:

| Condition | Score |
|-----------|-------|
| Matching learning skill | +50 |
| Reverse skill compatibility | +40 |
| Same availability | +10 |

Example:
- You want to learn React
- Another student teaches React
- They want to learn Java
- You teach Java

➡️ Match Score = 90%+

---

# 📱 Screens Included

- Landing Page
- Login Page
- Signup Page
- Dashboard
- Discover Peers
- Profile Page
- Swap Requests
- AI Chat Assistant

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Backend Routes
- Environment Variable Protection
- Secure API Handling

---

# 🚀 Future Improvements

- Real-time chat system
- Video meeting integration
- Skill certification badges
- AI-based career roadmap
- Notifications system
- Dark/Light mode toggle

---

# 🎯 Purpose of the Project

SkillSwap AI aims to:
- Encourage collaborative learning
- Reduce dependency on expensive courses
- Build peer learning communities
- Improve student networking
- Support placement preparation

---

# 👨‍💻 Developed By

**Manjusri Shanmuga Kumar**  
B.Tech Information Technology Student  
Passionate Full Stack & AI Developer

---

# 📜 License

This project is developed for educational and portfolio purposes.

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!
