import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileTabs } from '../components/Profile/ProfileTabs';
import { ChannelCustomization } from '../components/ChannelCustomization';

export function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'settings'>('posts');
  const [showCustomization, setShowCustomization] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <main className="pt-14 pl-64 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader onEditProfile={() => setShowCustomization(true)} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="p-8">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
                >
                  <img
                    src={`https://source.unsplash.com/random/400x400?sig=${i}`}
                    alt={`Post ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              No saved posts yet
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
              {/* Settings content */}
            </div>
          )}
        </div>
      </div>

      {showCustomization && (
        <ChannelCustomization onClose={() => setShowCustomization(false)} />
      )}
    </main>
  );
}