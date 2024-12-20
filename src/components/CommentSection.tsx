import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { MessageSquare } from 'lucide-react';
import { CommentList } from './CommentList';
import { useComments } from '../hooks/useComments';

interface CommentSectionProps {
  videoId: string;
}

export function CommentSection({ videoId }: CommentSectionProps) {
  const { user } = useAuthStore();
  const [comment, setComment] = useState('');
  const { comments, loading, error, addComment } = useComments(videoId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    try {
      await addComment(comment.trim(), {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL
      });
      setComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="mt-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5" />
        <h3 className="text-lg font-medium">{comments.length} Comments</h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
          <img
            src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
            alt={user.displayName || 'User'}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setComment('')}
                className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!comment.trim()}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to comment
        </p>
      )}

      <CommentList comments={comments} />
    </div>
  );
}