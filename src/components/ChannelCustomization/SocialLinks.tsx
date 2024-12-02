import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { useProfileStore } from '../../store/profile';

export function SocialLinks() {
  const { profile, updateSocialLinks } = useProfileStore();

  const handleSocialLinkChange = (platform: string, value: string) => {
    updateSocialLinks({
      ...profile?.socialLinks,
      [platform]: value
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Social Links</h3>
      <div className="space-y-3">
        {['youtube', 'twitter', 'instagram'].map((platform) => (
          <div key={platform} className="flex items-center gap-3">
            <LinkIcon className="w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={profile?.socialLinks?.[platform] || ''}
              onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
              placeholder={`Your ${platform} profile URL`}
              className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}