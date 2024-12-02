import React from 'react';
import { Grid, Bookmark, Settings } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: 'posts' | 'saved' | 'settings';
  onTabChange: (tab: 'posts' | 'saved' | 'settings') => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-center">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id as 'posts' | 'saved' | 'settings')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-t-2 -mt-px transition-colors ${
              activeTab === id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}