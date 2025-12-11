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

const AssetLoader = ({ src, onLoaded }: { src: string, onLoaded: () => void }) => {
  useEffect(() => {
    let element: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
    let didLoad = false;

    const handleLoad = () => {
      if (!didLoad) {
        onLoaded();
        didLoad = true;
      }
    };

    const isVideo = videoUrls.includes(src);
    const isAudio = audioUrls.includes(src);

    if (isVideo) {
      element = document.createElement('video');
      element.src = src;
      element.oncanplaythrough = handleLoad;
      element.onerror = handleLoad; // Treat error as loaded to not block the app
      element.load();
    } else if (isAudio) {
      element = document.createElement('audio');
      element.src = src;
      element.oncanplaythrough = handleLoad;
      element.onerror = handleLoad;
      element.load();
    } else {
      element = new Image();
      element.src = src;
      element.onload = handleLoad;
      element.onerror = handleLoad;
    }

    // Fallback timer in case load events don't fire (e.g., for cached assets)
    const timer = setTimeout(handleLoad, 5000);

    return () => {
      clearTimeout(timer);
      // Cleanup to avoid memory leaks
      if (element) {
        element.onload = null;
        element.onerror = null;
        if ('oncanplaythrough' in element) {
            element.oncanplaythrough = null;
        }
        element.src = '';
      }
    };
  }, [src, onLoaded]);

  return null; // This component does not render anything
};

export function PreloadingScreen({ onReady }: { onReady: () => void }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const totalAssets = allAssets.length;
  const progress = totalAssets > 0 ? (loadedCount / totalAssets) * 100 : 100;

  useEffect(() => {
    if (loadedCount === totalAssets) {
        // A short delay to ensure the progress bar hits 100% visually
        setTimeout(onReady, 300);
    }
  }, [loadedCount, totalAssets, onReady]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
       {allAssets.map((src, index) => (
        <AssetLoader key={index} src={src} onLoaded={() => setLoadedCount(prev => prev + 1)} />
      ))}
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
