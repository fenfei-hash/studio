
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { successContent } from "@/lib/game-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const JUMPSCARE_VIDEO_URL = "https://storage.googleapis.com/nightmare/one_last_scare.mp4";
const SCREAM_SOUND_URL = "https://cdn.pixabay.com/audio/2022/03/10/audio_09968be149.mp3";

export default function SuccessPage() {
    const imageData = PlaceHolderImages.find(img => img.id === successContent.image.id);
    const [isJumpscareActive, setIsJumpscareActive] = useState(false);
    const [showWhiteScreen, setShowWhiteScreen] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleJumpscareClick = () => {
        setShowWhiteScreen(true);
        setTimeout(() => {
            setIsJumpscareActive(true);
            audioRef.current?.play().catch(e => console.error("Scream audio failed", e));
        }, 100); // Short delay for white screen to appear
        
        // End the jumpscare after 5 seconds
        setTimeout(() => {
            setIsJumpscareActive(false);
            setShowWhiteScreen(false);
        }, 5100); // Total duration of the effect (100ms white screen + 5000ms video)
    };
    
    if (showWhiteScreen) {
        return (
            // Removed animate-fade-in from this div
            <div className="fixed inset-0 bg-white z-[100]">
                {isJumpscareActive && (
                     <div className="fixed inset-0 bg-black flex items-center justify-center z-[101]">
                        <video 
                            src={JUMPSCARE_VIDEO_URL} 
                            autoPlay 
                            muted
                            playsInline
                            className="w-auto h-auto min-w-full min-h-full object-cover" 
                            aria-label="Jumpscare sequence"
                        />
                        <audio ref={audioRef} src={SCREAM_SOUND_URL} preload="auto"></audio>
                    </div>
                )}
            </div>
        )
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
            <Card className="w-full max-w-2xl animate-fade-in shadow-lg">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-4">
                        <CheckCircle className="w-12 h-12 text-green-400"/>
                        <h1 className="text-4xl font-bold text-accent">You Survived</h1>
                    </div>
                </CardHeader>
                <CardContent>
                    {imageData && (
                        <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden my-6 shadow-inner">
                            <Image
                                src={imageData.imageUrl}
                                alt={imageData.description}
                                fill
                                className="object-cover"
                                data-ai-hint={imageData.imageHint}
                                priority
                            />
                        </div>
                    )}
                    <p className="text-lg text-foreground/90 text-center">{successContent.text}</p>
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/">Play Again?</Link>
                    </Button>
                     <Button size="lg" variant="outline" onClick={handleJumpscareClick}>
                        <Ticket className="mr-2"/>
                        Claim Free Tickets
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
