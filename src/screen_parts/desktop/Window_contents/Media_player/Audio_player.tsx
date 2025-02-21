import { useEffect, useRef } from "react";
import { Station } from "../../../../types";
interface RadioPlayerProps {
  station: Station | undefined;
  isPlaying: boolean,
  volume: number,
  isMuted: boolean
}
export function AudioPlayer({station, isPlaying, volume, isMuted}: RadioPlayerProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(()=>{
    if (!audioRef?.current) return;
    if (!station || !isPlaying) return audioRef.current.pause();
    audioRef.current.play().catch(error => console.error('Playback error:', error));
  }, [station, isPlaying]);
  useEffect(()=>{
    if (!audioRef?.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  },[volume, isMuted]);

  return (
    <audio 
      ref={audioRef}
      src={station ? station.urlResolved : undefined}
    >
    </audio>
  )
}