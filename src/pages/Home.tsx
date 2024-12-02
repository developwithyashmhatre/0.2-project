import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VideoCard } from '../components/VideoCard';
import { Search } from 'lucide-react';
import { Video } from '../types';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch videos from MongoDB
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['videos', debouncedQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedQuery) {
        params.append('search', debouncedQuery);
      }
      
      const response = await fetch(`http://localhost:3000/api/videos?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      return data.videos as Video[];
    },
  });

  return (
    <main className="pt-14 pl-64">
      <div className="p-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">
              Error loading videos. Please try again later.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {!isLoading && videos && (
          <>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    thumbnail={video.thumbnail || 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74'}
                    title={video.title}
                    channelName={video.channelName}
                    channelAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.userId}`}
                    views={video.views}
                    timestamp={video.timestamp}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No videos found</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? `No videos match "${searchQuery}"`
                    : 'Be the first to upload a video!'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}