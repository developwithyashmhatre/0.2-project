import React from 'react';
import { useAuthStore } from '../../store/auth';
import { useProfileStore } from '../../store/profile';

export function ProfileForm() {
  const { user } = useAuthStore();
  const { profile, updateProfile } = useProfileStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    updateProfile({
      displayName: formData.get('displayName') as string,
      bio: formData.get('bio') as string,
      location: formData.get('location') as string,
      website: formData.get('website') as string,
    });
  };

  return (
    <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Basic Info</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium mb-1">
              Channel Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              defaultValue={user?.displayName || ''}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Your channel name"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={profile?.bio || ''}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Tell viewers about your channel"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={profile?.location || ''}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Where are you based?"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              defaultValue={profile?.website || ''}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Your website URL"
            />
          </div>
        </div>
      </div>
    </form>
  );
}