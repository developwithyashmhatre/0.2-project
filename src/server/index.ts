import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import videosRouter from './api/videos';
import commentsRouter from './api/comments';
import usersRouter from './api/users';

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
mongoose.connect(process.env.VITE_MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/videos', videosRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

// Handle preflight requests
app.options('*', cors(corsOptions));

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

const PORT = process.env.VITE_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});