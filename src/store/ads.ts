import { create } from 'zustand';

interface AdsState {
  lastAdShown: number;
  adFrequency: number;
  setLastAdShown: (timestamp: number) => void;
  setAdFrequency: (frequency: number) => void;
}

export const useAdsStore = create<AdsState>((set) => ({
  lastAdShown: 0,
  adFrequency: 3, // Show ad every 3 videos by default
  setLastAdShown: (timestamp) => set({ lastAdShown: timestamp }),
  setAdFrequency: (frequency) => set({ adFrequency: frequency }),
}));