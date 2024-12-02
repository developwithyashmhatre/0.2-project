import React from 'react';
import { X } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { ProfileForm } from './ProfileForm';
import { SocialLinks } from './SocialLinks';

interface ChannelCustomizationModalProps {
  onClose: () => void;
}

export function ChannelCustomizationModal({ onClose }: ChannelCustomizationModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold">Customize Your Channel</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <ImageUpload />
            <ProfileForm />
            <SocialLinks />
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="profile-form"
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}