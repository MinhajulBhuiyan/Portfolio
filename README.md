# 🌐 PRAXIS: AI-Powered Personal Portfolio

> A futuristic developer portfolio featuring a custom AI assistant, animated UI, and personalized knowledge retrieval — built with React, FastAPI, and Google Gemini AI.

---

## 🚀 About This Project

**PRAXIS** is more than a portfolio — it's a dynamic AI-powered digital presence. This full-stack project seamlessly integrates advanced UI animations, semantic search, and generative AI to offer a real-time, conversational experience.
**PRAXIS** (Portfolio Reactive Analytical & Experiential Intelligence System)

### 🔮 What makes it unique?

- 🤖 **Generative AI Chat Interface (PRAXIS)**: Built using RAG (Retrieval-Augmented Generation) and powered by **Google Gemini API**.
- 💡 **Contextual Awareness**: PRAXIS can answer queries about you, your projects, and career goals using a custom-trained knowledge base.
- 💻 **Modern Stack**: Built from scratch using **React + TypeScript** in the frontend and **FastAPI + Python** for the backend.
- 🎨 **Smooth UI/UX**: Framer Motion, TailwindCSS, and Vite ensure a blazing-fast and animated experience.
- 📁 **Modular Structure**: Designed with scalability, developer experience, and extensibility in mind.

---

## 🧠 Features

| Feature                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| 🎙️ Generative AI Chatbot   | Intelligent assistant trained to talk about your resume, skills, and goals. |
| 🎬 Animated Interface      | Motion-enhanced sections using Framer Motion for stunning effects.          |
| 🧠 RAG-based Retrieval     | Retrieves personal knowledge using lightweight keyword search for relevance.|
| 🌐 Fully Responsive Design | Optimized for all devices with custom breakpoints and fluid layouts.        |
| 🔐 Secure API Communication | Environment-protected backend for privacy and performance.                 |

---

## 🛠️ Tech Stack

### 🖥 Frontend
- **React 18 + TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Vite** (Blazing fast builds)

### ⚙️ Backend
- **Python 3.10+**
- **FastAPI** (RESTful & async)
- **Lightweight Keyword Search** (Optimized for free tier deployment)
- **Google Gemini API** (Generative AI)

### 🧪 Testing & Deployment
- **Vercel** (Frontend hosting)
- **Render** (Backend deployment)
- **ESLint + Prettier** (Code quality)

---

## 🚧 Installation & Setup

### ✅ Prerequisites
- Node.js & npm
- Python 3.10 or higher
- Google Gemini API Key

---

### 📦 Clone the Repo

```bash
git clone https://github.com/MinhajulBhuiyan/Portfolio.git
cd Portfolio
```

### 💻 Setup Frontend

```bash
npm install
npm run dev
```

### 🧠 Setup Backend

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 🔐 Add API Key (For PRAXIS AI Assistant)

Create a `.env` file in the `Backend/` directory:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

### ▶️ Run the Servers

**Start Backend**:
```bash
uvicorn main:app --reload
```

**Start Frontend**:
```bash
npm run dev
```

---

## 🧠 How PRAXIS Works (Architecture)

```
[ User Input ] 
      ↓
[ React UI + Chat Input ]
      ↓
[ Backend FastAPI Server ]
      ↓
[ Lightweight Keyword Search ]
      ↓
[ Gemini API (Generative Completion) ]
      ↓
[ Response → React UI ]
```

> All queries are enhanced with personal context — giving PRAXIS the ability to talk about Minhajul's experience and projects!

---

## 📸 Screenshots

Visit the live site to see PRAXIS in action!

---

## 📢 Future Enhancements

- ✅ Enhanced vector search with embedding models
- 🌍 Multilingual support
- 💾 Vector database with Faiss or Pinecone
- 🎙️ Voice input integration
- 📱 Mobile app version

---

## 👤 About Me

**Minhajul Bhuiyan**  
B.Sc in Software Engineering (Islamic University of Technology)  
🎯 Full-Stack Developer | AI/ML Enthusiast | Software Engineer  
📫 [LinkedIn](https://www.linkedin.com/in/minhajul-bhuiyan-11b388218/) | [GitHub](https://github.com/MinhajulBhuiyan)

---

## 📎 Project Links

- 🔗 Live Site: [https://minhajul-bhuiyan.vercel.app](https://minhajul-bhuiyan.vercel.app)
- 📁 Repo: [https://github.com/MinhajulBhuiyan/Portfolio](https://github.com/MinhajulBhuiyan/Portfolio)
- 🤖 Backend API: [https://portfolio-backend-ol16.onrender.com](https://portfolio-backend-ol16.onrender.com)

---

> 💡 *"Build a portfolio that talks for you... or talks like you." — PRAXIS AI*
