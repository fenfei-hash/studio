"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { VolumeX, Volume2 } from "lucide-react";

const INTRO_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2024/05/09/audio_651a14c33d.mp3";
const GAME_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2024/07/22/audio_f59c748729.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();

  const getMusicUrl = () => {
    if (pathname.startsWith('/game/intro-')) {
      return INTRO_MUSIC_URL;
    }
    return GAME_MUSIC_URL;
  };
  
  const musicUrl = getMusicUrl();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.src !== musicUrl) {
        const currentTime = audio.currentTime;
        const isPlaying = !audio.paused;
        audio.src = musicUrl;
        audio.load();
        if (isPlaying) {
          audio.play().then(() => {
            audio.currentTime = currentTime;
          }).catch(e => console.error("Error playing new track:", e));
        }
      }
    }
  }, [musicUrl]);


  useEffect(() => {
    const audio = audioRef.current;
    if (audio && hasInteracted) {
      if(audio.paused) {
        audio.play().catch(error => {
          // Autoplay was prevented.
          console.warn("Background music autoplay was prevented.", error)
          setIsMuted(true);
        });
      }
    }
  }, [hasInteracted]);

  useEffect(() => {
    const audio = audioRef.current;
    if(audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  // We need a user interaction to start playing the music.
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop />
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
