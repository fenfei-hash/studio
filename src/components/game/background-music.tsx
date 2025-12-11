
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { VolumeX, Volume2 } from "lucide-react";

const HOME_MUSIC_URL = "https://cdn.pixabay.com/audio/2025/12/05/audio_b8fc051d1b.mp3";
const INTRO_MUSIC_URL = "https://cdn.pixabay.com/audio/2024/10/17/audio_0666eeb332.mp3"; 
const HORROR_PIANO_URL = "https://cdn.pixabay.com/audio/2022/07/05/audio_397d005fdb.mp3";


export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();

  const getMusicUrl = (path: string) => {
    if (path === '/') {
      return HOME_MUSIC_URL;
    }
    if (path.startsWith('/game/intro-')) {
      return INTRO_MUSIC_URL;
    }
    if (path.startsWith('/game/')) {
       return HORROR_PIANO_URL;
    }
    // Fallback for game over or success pages
    if (path.startsWith('/game-over') || path.startsWith('/success')) {
        return HOME_MUSIC_URL;
    }
    return ""; // Return empty string if no match
  };
  
  // Effect to handle the first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      // Let the other effect handle playback
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Effect to control play/pause and track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMusicUrl = getMusicUrl(pathname);

    // If the new URL is different, we need to change tracks.
    if (newMusicUrl && audio.src !== newMusicUrl) {
        // Pause and reset current track to prevent interruption errors
        audio.pause();
        audio.currentTime = 0;
        
        audio.src = newMusicUrl;
        audio.load(); // Explicitly load the new source
        
        // Play only after interaction and when the new track is ready
        if (hasInteracted) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              // Autoplay was prevented.
              if (error.name !== 'AbortError') {
                console.error("Audio play on track change failed:", error);
              }
            });
          }
        }
    } else if (!newMusicUrl) {
        audio.pause();
        audio.currentTime = 0;
    }
    
    // Always respect the mute state
    audio.muted = isMuted;

  }, [pathname, hasInteracted, isMuted]);

  // Effect to handle initial play after interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (hasInteracted && audio && audio.paused && audio.src) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name !== 'AbortError') {
                    console.error("Audio play after interaction failed:", error);
                }
            });
        }
    }
  }, [hasInteracted]);

  const toggleMute = () => {
    // If this is the first interaction, it will also trigger the playback
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} loop playsInline />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 text-foreground/50 hover:text-foreground"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </Button>
    </>
  );
}
