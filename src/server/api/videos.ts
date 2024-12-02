import express from 'express';
import multer from 'multer';
import path from 'path';
import { Video } from '../models/Video';
import { validateVideoUpload } from '../middleware/validation';

const router = express.Router();

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'video') {
      const allowedMimes = ['video/mp4', 'video/webm', 'video/ogg'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid video file type'));
      }
    } else if (file.fieldname === 'thumbnail') {
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid thumbnail file type'));
      }
    } else {
      cb(null, false);
    }
  }
}).fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

// Get all videos with search and pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, search } = req.query;
    
    // Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { channelName: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    // Execute query with pagination
    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    
    // Get total count for pagination
    const total = await Video.countDocuments(query);
    
    res.json({
      videos,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Upload video endpoint
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const videoFile = req.files['video'][0];
      const thumbnailFile = req.files['thumbnail']?.[0];

      const video = new Video({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        channelName: req.body.channelName,
        videoUrl: `/uploads/${videoFile.filename}`,
        thumbnail: thumbnailFile ? `/uploads/${thumbnailFile.filename}` : null,
        views: 0,
        likes: 0,
        timestamp: Date.now(),
        createdAt: new Date()
      });

      await video.save();
      res.status(201).json(video);
    } catch (error) {
      console.error('Error saving video:', error);
      res.status(500).json({ error: 'Failed to save video' });
    }
  });
});

// Get video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// Update video
router.patch('/:id', validateVideoUpload, async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// Delete video
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// Like video
router.post('/:id/like', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like video' });
  }
});

// View video (increment view count)
router.post('/:id/view', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update view count' });
  }
});

export default router;