import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { storage, realtimeDb } from '../../lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, update } from 'firebase/database';

export function ImageUpload() {
  const { user } = useAuthStore();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    if (!user || !e.target.files?.length) return;

    const file = e.target.files[0];
    setUploading(true);
    setError(null);

    try {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Create unique filename
      const filename = `${type}_${user.uid}_${Date.now()}.${file.name.split('.').pop()}`;
      const imageRef = storageRef(storage, `${type}s/${filename}`);

      // Upload with metadata
      const metadata = {
        contentType: file.type,
        customMetadata: {
          userId: user.uid,
          uploadedAt: new Date().toISOString()
        }
      };

      const snapshot = await uploadBytes(imageRef, file, metadata);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Update database
      const updates: Record<string, string> = {};
      if (type === 'avatar') {
        updates[`profiles/${user.uid}/photoURL`] = imageUrl;
      } else {
        updates[`profiles/${user.uid}/bannerURL`] = imageUrl;
      }

      await update(dbRef(realtimeDb), updates);
    } catch (err: any) {
      console.error(`Error uploading ${type}:`, err);
      setError(err.message || `Failed to upload ${type}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Channel Images</h3>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        <div className="flex gap-8">
          {/* Profile Picture */}
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">Profile Picture</p>
            <div className="relative group">
              <img
                src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full ${
                uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } cursor-pointer transition-opacity`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'avatar')}
                  disabled={uploading}
                  className="hidden"
                />
                {uploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                ) : (
                  <Camera className="w-6 h-6 text-white" />
                )}
              </label>
            </div>
          </div>

          {/* Banner Image */}
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">Banner Image</p>
            <div className="relative group aspect-[3/1] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <label className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer ${
                uploading ? 'bg-black/10' : 'hover:bg-black/5 dark:hover:bg-white/5'
              } transition-colors`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  disabled={uploading}
                  className="hidden"
                />
                {uploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-current border-t-transparent" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-sm">Upload banner image</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}