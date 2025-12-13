"use client";

import { useEffect, useState } from 'react';

export function Timer({ onTimeUp }: { onTimeUp: () => void }) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="w-full max-w-md mt-4 animate-fade-in">
      <div className="relative h-8 w-full rounded-full border-2 border-primary bg-background/50 overflow-hidden shadow-lg shadow-primary/30">
        <div 
          className="absolute top-0 left-0 h-full bg-primary/70 transition-all duration-1000 ease-linear"
          style={{ width: `${timeLeft * 10}%` }}
        ></div>
        <p className="absolute inset-0 flex items-center justify-center text-md font-bold text-primary-foreground mix-blend-lighten tracking-wider">
          {timeLeft}
        </p>
      </div>
    </div>
  );
}
