import { useEffect, useRef } from "react";

interface WaveformProps {
  audioStream: MediaStream | null;
  isRecording: boolean;
}

const Waveform = ({ audioStream, isRecording }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioStream) return;

    audioContextRef.current = new AudioContext();
    const source = audioContextRef.current.createMediaStreamSource(audioStream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;

    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const WIDTH = canvas?.width || 0;
    const HEIGHT = canvas?.height || 0;

    const barWidth = WIDTH / bufferLength;

    const draw = () => {
      if (!ctx || !analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Background fill
      ctx.fillStyle = "#3B82F6"; // blue background
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Bars color gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      gradient.addColorStop(0, "#93C5FD");
      gradient.addColorStop(1, "#1E40AF");
      ctx.fillStyle = gradient;

      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArrayRef.current[i] / 255) * HEIGHT;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth * 0.6, barHeight);
        x += barWidth;
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    if (isRecording) {
      draw();
    } else {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      ctx?.clearRect(0, 0, WIDTH, HEIGHT);
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      audioContextRef.current?.close();
    };
  }, [audioStream, isRecording]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={100}
      className="rounded-md border border-border"
      style={{ backgroundColor: "white" }}
    />
  );
};

export default Waveform;
