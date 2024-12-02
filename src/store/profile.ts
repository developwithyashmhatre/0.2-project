import { create } from 'zustand';
import { ref, set, get } from 'firebase/database';
import { realtimeDb } from '../lib/firebase';
import { useAuthStore } from './auth';

interface Profile {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  socialLinks: {
    [key: string]: string;
  };
  photoURL?: string;
  bannerURL?: string;
}

interface ProfileStore {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  updateSocialLinks: (links: { [key: string]: string }) => Promise<void>;
  loadProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  loadProfile: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const profileRef = ref(realtimeDb, `profiles/${user.uid}`);
      const snapshot = await get(profileRef);
      
      if (snapshot.exists()) {
        set({ profile: snapshot.val() });
      }
    } catch (error) {
      set({ error: 'Failed to load profile' });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const profileRef = ref(realtimeDb, `profiles/${user.uid}`);
      const currentProfile = get().profile || {};
      await set(profileRef, { ...currentProfile, ...data });
      set({ profile: { ...currentProfile, ...data } });
    } catch (error) {
      set({ error: 'Failed to update profile' });
    }
  },

  updateSocialLinks: async (links) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const profileRef = ref(realtimeDb, `profiles/${user.uid}`);
      const currentProfile = get().profile || {};
      const updatedProfile = {
        ...currentProfile,
        socialLinks: links
      };
      await set(profileRef, updatedProfile);
      set({ profile: updatedProfile });
    } catch (error) {
      set({ error: 'Failed to update social links' });
    }
  },
}));