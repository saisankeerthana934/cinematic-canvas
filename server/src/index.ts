import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projectRoutes';

// 1. Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(cors({
  origin: "*",  // Allow all origins for development
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// --- ✅ CRITICAL ROUTE CONNECTION ---
// This connects your "projectRoutes.ts" file to the "/api/projects" URL.
// Without this, you get a 404 Error.
app.use('/api/projects', projectRoutes);

// 3. Database Connection
const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
  console.error("❌ ERROR: MONGODB_URI is missing in .env file.");
  process.exit(1);
}

mongoose.connect(MONGO_URL)
  .then(() => console.log('\n✅ CONNECTED TO MONGODB (The Brain is Online)\n'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 4. Basic Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.send('🎬 CineIntent Director Server is Running & Connected!');
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(`🚀 DIRECTOR SERVER RUNNING ON: http://localhost:${PORT}`);
});