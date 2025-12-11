
'use client';

import { useEffect, useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';

// Manually list all assets to be preloaded
const imageUrls = PlaceHolderImages.map(img => img.imageUrl);
const audioUrls = [
  "https://cdn.pixabay.com/audio/2025/12/05/audio_b8fc051d1b.mp3", // home
  "https://cdn.pixabay.com/audio/2024/10/17/audio_0666eeb332.mp3", // intro
  "https://cdn.pixabay.com/audio/2022/07/05/audio_397d005fdb.mp3", // horror piano
  "https://cdn.pixabay.com/audio/2022/03/10/audio_09968be149.mp3", // scream
];
const videoUrls = [
  "https://storage.googleapis.com/nightmare/nightmare%20(1).mp4" // jumpscare
];

const allAssets = [...imageUrls, ...audioUrls, ...videoUrls];

async function preloadAsset(src: string) {
  try {
    // Use fetch to request the asset. The 'no-cors' mode is a fallback for cross-origin issues,
    // though it means we can't read the response body. We just care if it loads.
    await fetch(src, { mode: 'no-cors' });
  } catch (error) {
    // We can log the error, but we don't want to block the user.
    console.warn(`Could not preload asset: ${src}`, error);
  }
}

export function PreloadingScreen({ onReady }: { onReady: () => void }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const totalAssets = allAssets.length;
  const progress = totalAssets > 0 ? (loadedCount / totalAssets) * 100 : 100;

  useEffect(() => {
    let isCancelled = false;

    async function preloadAll() {
      const preloadPromises = allAssets.map(src => 
        preloadAsset(src).then(() => {
          if (!isCancelled) {
            setLoadedCount(prev => prev + 1);
          }
        })
      );
      await Promise.all(preloadPromises);
    }

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loadedCount === totalAssets) {
        // A short delay to ensure the progress bar hits 100% visually
        const timer = setTimeout(onReady, 300);
        return () => clearTimeout(timer);
    }
  }, [loadedCount, totalAssets, onReady]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-headline text-primary mb-4 animate-pulse">
            The horrors are gathering...
        </h1>
        <Progress value={progress} className="w-full h-2 bg-primary/20 border border-primary/50" />
        <p className="mt-2 text-sm text-accent">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
