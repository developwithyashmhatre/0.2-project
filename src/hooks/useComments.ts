import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Comment } from '../types';

export function useComments(videoId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // First, try to get comments without ordering by timestamp
        const q = query(
          collection(db, 'comments'),
          where('videoId', '==', videoId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newComments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Comment[];
          
          // Sort comments client-side
          newComments.sort((a, b) => b.timestamp - a.timestamp);
          
          setComments(newComments);
          setLoading(false);
        }, (err) => {
          console.error('Error fetching comments:', err);
          setError('Failed to load comments');
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error('Error setting up comments listener:', err);
        setError('Failed to load comments');
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const addComment = async (text: string, user: { uid: string; displayName: string; photoURL: string | null }) => {
    try {
      await addDoc(collection(db, 'comments'), {
        text,
        videoId,
        userId: user.uid,
        userDisplayName: user.displayName || 'Anonymous',
        userPhotoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        timestamp: Date.now(),
        likes: 0
      });
    } catch (err) {
      console.error('Error adding comment:', err);
      throw new Error('Failed to add comment');
    }
  };

  return { comments, loading, error, addComment };
}