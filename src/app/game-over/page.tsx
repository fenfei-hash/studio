import { Suspense } from 'react';
import { GameOverClientContent } from '@/components/game/game-over-client-content';
import { Skeleton } from '@/components/ui/skeleton';

function GameOverLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="w-full max-w-lg space-y-4">
        <Skeleton className="h-10 w-3/4 mx-auto bg-card" />
        <Skeleton className="w-80 h-[450px] max-w-[80vw] mx-auto bg-card" />
        <Skeleton className="h-12 w-32 mx-auto bg-card" />
      </div>
    </div>
  );
}

export default function GameOverPage() {
    return (
        <Suspense fallback={<GameOverLoading />}>
            <GameOverClientContent />
        </Suspense>
    )
}
