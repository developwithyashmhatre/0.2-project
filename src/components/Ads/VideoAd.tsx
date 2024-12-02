import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoAdProps {
  onComplete: () => void;
  duration?: number;
}

export function VideoAd({ onComplete, duration = 5 }: VideoAdProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Enable skip after 3 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <video
        src="https://storage.googleapis.com/your-tube-ads/sample-ad.mp4"
        autoPlay
        className="w-full h-full object-contain"
      />
      
      <div className="absolute bottom-4 right-4 flex items-center gap-4">
        {canSkip && (
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Skip Ad
          </button>
        )}
        <div className="bg-black/80 px-3 py-1 rounded text-white text-sm">
          Ad: {timeLeft}s
        </div>
      </div>
    </div>
  );
}