"use client";

import { getDynamicDescription } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function DynamicDescription({ scenario, previousChoices }: { scenario: string, previousChoices: string[] }) {
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDescription() {
      const desc = await getDynamicDescription(previousChoices, scenario);
      setDescription(desc);
    }
    fetchDescription();
  }, [scenario, previousChoices]);

  if (!description) {
    return (
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-full bg-background/20" />
        <Skeleton className="h-4 w-full bg-background/20" />
        <Skeleton className="h-4 w-5/6 bg-background/20" />
      </div>
    );
  }

  return <p className="mt-4 text-accent/80 italic animate-fade-in">{description}</p>;
}
