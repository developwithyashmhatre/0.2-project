import express from 'express';
import { User } from '../models/User';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Get user's videos
router.get('/:id/videos', async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.id })
      .sort('-createdAt');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user videos' });
  }
});

// Subscribe to channel
router.post('/:id/subscribe', async (req, res) => {
  try {
    const { subscriberId } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      $addToSet: { subscribers: subscriberId }
    });
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Unsubscribe from channel
router.post('/:id/unsubscribe', async (req, res) => {
  try {
    const { subscriberId } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { subscribers: subscriberId }
    });
    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unsubscribe' });
  }
});

export default router;