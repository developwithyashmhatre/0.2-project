import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

interface Ad {
  id: string;
  url: string;
  duration: number;
  skipAfter: number;
  type: 'video' | 'banner';
}

export function useAds(videoId: string) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const db = getDatabase();
        const adsRef = ref(db, 'ads');
        const snapshot = await get(adsRef);
        
        if (snapshot.exists()) {
          const adsData = snapshot.val();
          // Filter and sort ads based on targeting criteria
          const relevantAds = Object.values(adsData).filter((ad: Ad) => {
            // Add targeting logic here
            return true;
          });
          setAds(relevantAds);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [videoId]);

  return { ads, loading };
}