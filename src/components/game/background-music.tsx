
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { VolumeX, Volume2 } from "lucide-react";

const HOME_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/10/26/audio_736636a23a.mp3";
const INTRO_MUSIC_URL = "https://pixabay.com/music/ambient-scary-movie-opener-443329/";
const GAME_MUSIC_URL = "https://cdn.pixabay.com/audio/2024/05/09/audio_651a14c33d.mp3"; // Fallback
const NEW_GAME_MUSIC_URL = "https://cdn.pixabay.com/audio/2023/10/24/audio_b863897a66.mp3"; // Cinematic Horror Piano

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
       return NEW_GAME_MUSIC_URL;
    }
    return GAME_MUSIC_URL; // Default/fallback
  };
  
  // Set initial URL correctly
  const [musicUrl, setMusicUrl] = useState(() => getMusicUrl(pathname));

  // Effect to update music on path change
  useEffect(() => {
    setMusicUrl(getMusicUrl(pathname));
  }, [pathname]);


  // Effect to handle the first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
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

    const playAudio = async () => {
      try {
         if (audio.src !== musicUrl) {
          audio.src = musicUrl;
          audio.load();
        }
        if (audio.paused) {
          await audio.play();
        }
      } catch (error) {
        console.error("Audio playback failed:", error);
        // If autoplay fails, we mute to avoid errors on subsequent attempts.
        setIsMuted(true);
      }
    };

    if (hasInteracted) {
      playAudio();
    }
    
    // On initial load, the audio element is muted via the property.
    // The `isMuted` state is false, so the icon shows "unmuted".
    // This allows us to autoplay after interaction without changing the icon state.
    audio.muted = !hasInteracted || isMuted;

  }, [musicUrl, hasInteracted, isMuted]);

  const toggleMute = () => {
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
