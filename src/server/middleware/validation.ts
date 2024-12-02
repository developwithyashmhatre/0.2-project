import { z } from 'zod';

const videoSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(5000).optional(),
  userId: z.string(),
  videoUrl: z.string().url(),
  thumbnail: z.string().url().optional(),
});

const commentSchema = z.object({
  content: z.string().min(1).max(1000),
  userId: z.string(),
  videoId: z.string(),
});

export const validateVideoUpload = (req, res, next) => {
  try {
    videoSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const validateComment = (req, res, next) => {
  try {
    commentSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};