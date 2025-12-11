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
    <div className="fixed top-4 right-4 w-48 z-50">
      <div className="relative h-6 w-full rounded-full border-2 border-primary bg-background/50 overflow-hidden shadow-lg">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${timeLeft * 10}%` }}
        ></div>
        <p className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-foreground mix-blend-difference">
          {timeLeft} seconds remaining
        </p>
      </div>
    </div>
  );
}
