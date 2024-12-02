import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnail: String,
  userId: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  streamKey: String,
  duration: Number,
  mimeType: String,
  size: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

videoSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Video', videoSchema);