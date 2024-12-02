import express from 'express';
import { Comment } from '../models/Comment';
import { validateComment } from '../middleware/validation';

const router = express.Router();

// Get comments for a video
router.get('/video/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .sort('-createdAt');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add comment
router.post('/', validateComment, async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      createdAt: new Date()
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;