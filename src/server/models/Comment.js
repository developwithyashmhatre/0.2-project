import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});