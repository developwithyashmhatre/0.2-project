import { useState } from 'react';
import { useAuthStore } from '../store/auth';

export function useUploadVideo() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuthStore();

  const uploadVideo = async (
    videoFile: File,
    thumbnailFile: File | null,
    videoData: { title: string; description?: string }
  ) => {
    if (!user) throw new Error('Must be logged in to upload videos');

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }
      formData.append('title', videoData.title);
      if (videoData.description) {
        formData.append('description', videoData.description);
      }
      formData.append('userId', user.uid);
      formData.append('channelName', user.displayName || 'Anonymous');

      const response = await fetch('http://localhost:3000/api/videos/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    } finally {
      setUploading(false);
      setProgress(100);
    }
  };

  return { uploadVideo, progress, uploading };
}