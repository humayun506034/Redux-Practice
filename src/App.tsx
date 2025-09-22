import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "./components/ui/separator";
import Waveform from "./components/Waveform";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setMediaStream(null);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or not supported!");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted">
      <Card className="w-[400px] shadow-xl border border-border">
        <CardHeader>
          <CardTitle className="text-center">🎙️ Voice Recorder</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col items-center space-y-6 mt-4">
          {isRecording && mediaStream && (
            <Waveform audioStream={mediaStream} isRecording={isRecording} />
          )}

          <div className="flex gap-4">
            <Button
              variant="default"
              onClick={startRecording}
              disabled={isRecording}
            >
              Start Recording
            </Button>
            <Button
              variant="secondary"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              Done
            </Button>
          </div>

          {audioURL && (
            <div className="w-full mt-4">
              <h4 className="text-sm font-semibold mb-2">🔊 Playback:</h4>
              <audio controls src={audioURL} className="w-full rounded-md" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
