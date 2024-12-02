import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  email: String,
  photoURL: String,
  subscribers: [String],
  subscribedTo: [String],
  likedVideos: [String],
  watchHistory: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);