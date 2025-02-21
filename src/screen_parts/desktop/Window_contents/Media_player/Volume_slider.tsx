
import { useEffect, useRef, useState } from 'react';
import styles from './Media_player.module.css';

interface VolumeSliderProps {
  setNewVolume: (volume: number) => void,
  currentVolume: number,
  windowIsMaximized: boolean,
  isMuted: boolean
}

export function VolumeSlider({setNewVolume, currentVolume, windowIsMaximized, isMuted}: VolumeSliderProps): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const [sliderOffsetPos, setSliderOffsetPos] = useState<number>(0);
  //load widths on first render
  useEffect(()=>{
    setElementProportions();
  }, []);
  useEffect(()=>{onSliderPosChange(trackWidth*currentVolume)},[trackWidth])
  useEffect(()=>{
    setElementProportions();
  },[windowIsMaximized])
  // event listeners handling on slider drag
  useEffect(()=>{
    if (isDragged) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isDragged]);

  function handleMouseDown() {
    setIsDragged(true);
  }
  function setElementProportions() {
    if (trackRef.current) {
      const trackWidth = trackRef.current.getBoundingClientRect().width;
      setTrackWidth(trackWidth);
    }
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.getBoundingClientRect().width;
      setSliderOffsetPos(sliderWidth/2);
    }
  }
  function handleMouseMove (e: MouseEvent) {
    if (!isDragged) return;

    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const pos = Math.min(Math.max(e.clientX - rect.left, 0), trackWidth);
      onSliderPosChange(pos);
    }
  };
  function handleMouseUp() {
    setIsDragged(false);
  };
  function onSliderPosChange(newPos: number) {
    if (!trackWidth) return;
    setPosition(newPos);
    const newVol = newPos / trackWidth;
    if (currentVolume === newVol) return;
    setNewVolume(newVol);
  };

  const sliderStyle: React.CSSProperties = {
    left: `${isMuted ? 0 : position-sliderOffsetPos}px`,
  };

  return <div 
    ref={trackRef}
    className={styles.volume_wrapper}
  >
    <div
      ref={sliderRef} 
      className={`${styles.volume_slider} ${isDragged ? styles.volume_slider_selected : ''}`}
      onMouseDown={handleMouseDown}
      style={sliderStyle}
    ></div>
  </div>
}