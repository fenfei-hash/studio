'use client';

import { useState, type ChangeEvent } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFirebaseApp } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function UploadPage() {
  const app = useFirebaseApp();
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadState('idle');
      setDownloadURL(null);
      setError(null);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file || !app) return;

    setUploadState('uploading');
    setError(null);
    setProgress(0); // Reset progress

    const storage = getStorage(app);
    // Create a storage reference with a unique name
    const storageRef = ref(storage, `videos/jumpscare-${Date.now()}-${file.name}`);

    try {
      // Use uploadBytes for simpler progress tracking if available, or just upload
      const uploadTask = uploadBytes(storageRef, file);

      // A simple loop to simulate progress as uploadBytes doesn't provide it directly.
      const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 95) {
                clearInterval(progressInterval);
                return 95;
            }
            return prev + 5;
        });
      }, 200);


      await uploadTask;
      clearInterval(progressInterval);
      setProgress(100);

      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      setUploadState('success');
    } catch (e: any) {
      console.error(e);
      setError('Upload failed. Please check the browser console for more details. Ensure Firebase Storage is set up correctly with public read access rules.');
      setUploadState('error');
      setProgress(0);
    }
  };
  
  const copyToClipboard = () => {
    if (downloadURL) {
      navigator.clipboard.writeText(downloadURL);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="text-primary" />
            Upload Jumpscare Video
          </CardTitle>
          <CardDescription>
            Select a video file to upload to Firebase Storage. Once uploaded, you will get a URL to use in the game.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept="video/*" onChange={handleFileChange} disabled={uploadState === 'uploading'} />
          
          {uploadState === 'uploading' && (
             <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground animate-pulse">Uploading video...</p>
            </div>
          )}

          {uploadState === 'success' && downloadURL && (
            <div className="p-4 bg-green-100/10 border border-green-400/30 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle />
                <h3 className="font-semibold">Upload Successful!</h3>
              </div>
              <p className="text-sm text-foreground/80">
                Here is your video URL. Copy it and paste it into the `JUMPSCARE_VIDEO_URL` constant in `src/app/game-over/page.tsx`.
              </p>
              <div className="flex gap-2">
                <Input type="text" readOnly value={downloadURL} className="bg-background/50"/>
                <Button onClick={copyToClipboard}>Copy</Button>
              </div>
            </div>
          )}

          {uploadState === 'error' && error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle />
                <h3 className="font-semibold">Upload Failed</h3>
              </div>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          )}

        </CardContent>
        <CardFooter>
          <Button onClick={handleUpload} disabled={!file || uploadState === 'uploading'} className="w-full">
            {uploadState === 'uploading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {uploadState === 'uploading' ? 'Uploading...' : 'Upload Video'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
