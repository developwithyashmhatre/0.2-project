import { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  UserCredential
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { googleProvider } from '../lib/auth/providers';
import { getAuthErrorMessage } from '../lib/auth/errors';
import { useAuthStore } from '../store/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuthSuccess = (result: UserCredential) => {
    setUser(result.user);
    setError(null);
    navigate('/');
  };

  const handleAuthError = (error: any) => {
    console.error('Authentication error:', error);
    setError(getAuthErrorMessage(error));
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(result);
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        const result = await signInWithPopup(auth, googleProvider);
        handleAuthSuccess(result);
      } catch (popupError: any) {
        if (popupError?.code === 'auth/popup-blocked' || 
            popupError?.code === 'auth/unauthorized-domain') {
          await signInWithRedirect(auth, googleProvider);
        } else {
          throw popupError;
        }
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    signInWithEmail,
    signInWithGoogle
  };
};