

// src/App.js
import { useState, useEffect } from 'react';
import btnPlay from '../../../assets/media_player/media_play_btn.webp'
import btnPause from '../../../assets/media_player/media_pause_btn.webp'
import btnMutedImg from '../../../assets/media_player/muted.webp'
import btnUnmutedImg from '../../../assets/media_player/unmuted.webp'
import styles from './Media_player/Media_player.module.css';
import { TrackSelectBtn } from './Media_player/Track_select_btn';
import { Station } from '../../../types';
import { AudioPlayer } from './Media_player/Audio_player';
import { VolumeSlider } from './Media_player/Volume_slider';


export function MediaPlayer({windowIsMaximized}: {windowIsMaximized: boolean}): JSX.Element {
    const [stations, setStations] = useState<Station[] | null>(null);
    const [currentStation, setCurrentStation] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.5);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [highlightedTrackIndex, setHighlightedTrackIndex] = useState<number|null>(null);

    function onPlayPausePress() {
        setIsPlaying(!isPlaying);
    }

    function onMuteUnmutePress() {
       setIsMuted(!isMuted);
    }

    function onTrackClick(trackIndex: number) {
        setHighlightedTrackIndex(trackIndex);
    }

    function onTrackDoubleClick(trackIndex: number) {
        setHighlightedTrackIndex(null);
        setCurrentStation(trackIndex);
    }

    function setNewVolume(volVal: number) {
        setVolume(volVal);
    }
    
    async function fetchStation(){
        try {
            const response = await fetch('http://localhost:8080/mediaPlayer');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Station[] = await response.json();
            setStations(data);
            setCurrentStation(0);
        } catch (error: unknown) {
            console.error("Fetch error:", error);
            setStations(null);
        }
    };
    useEffect(() => {
        fetchStation();
    }, []);

    return (
        <div className={styles.main_container}>
            <AudioPlayer
                station={stations?.[currentStation]}
                isPlaying={isPlaying}
                volume={volume}
                isMuted={isMuted}
            />
            <VolumeSlider
                setNewVolume={setNewVolume}
                currentVolume={volume}
                windowIsMaximized={windowIsMaximized}
                isMuted={isMuted}
            />
            <div className={styles.play_pause_btn} onClick={onPlayPausePress}>
                <img src={isPlaying ? btnPause : btnPlay} alt="" className='w-50 h-50'/>
            </div>
            <div className={styles.mute_un_mute_btn} onClick={onMuteUnmutePress}>
                <img src={volume > 0 && !isMuted ? btnUnmutedImg : btnMutedImg} alt="" className='w-50 h-50'/>
            </div>
            <div className={styles.track_select_wrapper}>
                {stations && stations.length > 0 ? (
                    stations.map((stationData, i) => (
                        <TrackSelectBtn 
                            key={i}
                            name={stationData.name}
                            trackIndex={i}
                            highlightedIndex={highlightedTrackIndex}
                            selectedIndex={currentStation}
                            onClickHandler={onTrackClick}
                            onDoubleClickHandler={onTrackDoubleClick}
                        />
                    ))
                ) : (
                    <div>No radio stations found</div>
                )}
            </div>
        </div>
    );
}