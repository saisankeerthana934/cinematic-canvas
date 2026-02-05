// client/src/lib/config.ts

// This checks if the app is running on Render/Vercel or your laptop.
// It prevents your app from breaking when you deploy it.
// export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// ⚠️ HARDCODE THE LINK LIKE THIS:
const API_URL = "https://cinema-backend-lak2.onrender.com/api";