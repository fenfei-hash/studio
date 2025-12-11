import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background animate-flicker">
      <Card className="w-full max-w-lg shadow-2xl animate-fade-in" style={{'--tw-shadow-color': 'hsl(var(--primary))'}}>
        <CardHeader className="text-center">
          <h1 className="text-4xl font-headline font-bold text-primary tracking-wider">
            THE WARD
          </h1>
          <p className="text-lg text-foreground/80 font-headline">Eyeless Escape</p>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="mb-6 text-foreground/90">
            A dare, a deserted hospital, a decision every ten seconds. Can you escape the Eyeless Nurse?
          </CardDescription>
          <Button asChild size="lg" className="w-full font-bold group">
            <Link href="/game/intro-1">
              Begin the Nightmare
              <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
