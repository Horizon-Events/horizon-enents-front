# Horizon Events Frontend

This is the frontend application for the Horizon Events platform, built using **Vue.js** and **Vite**. It provides an interactive interface for users and organizers to explore and manage events.

---

## 🔧 Prerequisites

Ensure the following are installed on your machine:

- **Node.js** (version 18 or later)
- **npm** (comes with Node.js)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/horizon-Events/horizon-enents-front.git
cd horizon-enents-front
```

> ⚠️ If your folder name is incorrect (e.g., `horizion-event`), rename it to match the expected directory structure.

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run the Frontend Server

```bash
npm run dev
```

You should see an output like:

```
VITE v5.x.x  ready in 300ms
➜  Local:   http://localhost:5173/
```

Then open your browser and navigate to [http://localhost:5173](http://localhost:5173)

---

### Shutting Down

To stop the development server, press:

- `Ctrl + C` (Windows/Linux)
- `Cmd + C` (macOS)

---

## Project Structure

```
horizon-enents-front/
├── src/
│   ├── components/
│   ├── views/
│   ├── assets/
│   └── main.js
├── public/
├── package.json
└── vite.config.js
```

---

## Development Notes

- This frontend connects to the backend hosted on [http://localhost:3000](http://localhost:3000).
- Make sure the backend is running and the database is seeded for full functionality.
