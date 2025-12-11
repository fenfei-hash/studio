import type { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        {children}
      </div>
    </main>
  );
}
