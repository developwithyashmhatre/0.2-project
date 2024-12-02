import React from 'react';
import { Camera } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface ProfileHeaderProps {
  onEditProfile: () => void;
}

export function ProfileHeader({ onEditProfile }: ProfileHeaderProps) {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 p-8">
      <div className="relative group">
        <img
          src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`}
          alt={user?.displayName || 'Profile'}
          className="w-32 h-32 rounded-full object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-semibold">{user?.displayName || 'Anonymous'}</h1>
          <button
            onClick={onEditProfile}
            className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex gap-8 mb-4">
          <div>
            <span className="font-semibold">1,048</span> posts
          </div>
          <div>
            <span className="font-semibold">13.5k</span> followers
          </div>
          <div>
            <span className="font-semibold">22</span> following
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium">{user?.displayName}</p>
          <p className="text-gray-600 dark:text-gray-400">
            Content creator and tech enthusiast
          </p>
          <p className="text-blue-600">youtube.com/channel</p>
        </div>
      </div>
    </div>
  );
}