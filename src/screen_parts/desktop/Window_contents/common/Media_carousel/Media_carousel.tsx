import { useEffect, useMemo, useState } from 'react';
import styles from './Media_carousel.module.css';
import videoSelectImg from '../../../../../assets/images/videoSelect.png';
import { mediaCarouselData } from './media_carousel_data';
import { MediaCarouselMainView } from './Media_carousel_main_view';
import navBtnImg from '../../../../../assets/images/icons/carousel_navpng.png'
import { LoadedMediaItem } from '../../../../../types';

interface CarouselProps{
  carouselGroupName: string
}

export function MediaCarousel({carouselGroupName}: CarouselProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const media = useMemo(() => {
    return mediaCarouselData[carouselGroupName]?.media || [];
  }, [carouselGroupName]);
  const [loadedMedia, setLoadedMedia] = useState<LoadedMediaItem[]>([]);


  useEffect(() => {
    const loadMedia = async () => {
      const loaded: LoadedMediaItem[] = await Promise.all(
        media.map(async (item) => {
          if (item.vid) {
            const video = await item.vid(); // Load video
            return { ...item, vid: video.default } as LoadedMediaItem; // Return the component with the loaded video
          }
          return item as LoadedMediaItem;
        })
      );
      setLoadedMedia(loaded);
    };

    loadMedia();
  }, [media]);

  function selectMedia(index: number) {
    const mediasCount = media.length;
    if (index < 0) index = mediasCount - 1; //when edge reached then will loop around from other side
    if (index > mediasCount - 1) index = 0;
    setSelectedIndex(index);
  }
  return (
    <div className={`${styles.carousel_wrapper} w-full h-full`}>
      <div className='h-full flex justify-center'>
        <MediaCarouselMainView mediaItem={loadedMedia[selectedIndex]} />
      </div>
      <div className='w-full flex justify-center my-2'>
        <img 
          src={navBtnImg} 
          alt="nav left"  
          style={{width: '1.1rem', transform: 'scaleX(-1)'}}
          className={`${styles.nav_btn} mx-1`}
          onClick={()=>selectMedia(selectedIndex - 1)}
        />
        <img 
          src={navBtnImg} 
          alt="nav right"  
          style={{width: '1.1rem'}}
          className={`${styles.nav_btn} mx-1`}
          onClick={()=>selectMedia(selectedIndex + 1)}
        />
      </div>
      <div className='flex'>
        {loadedMedia.map((item, index) => {
          let imgToUse;
          if (item.img) imgToUse = item.img;
          if (item.vid) imgToUse = videoSelectImg;
          return <div
            className={`h-full mx-1 p-1 ${index === selectedIndex ? 'bg-sky-500' : ''}`}
            key={index} 
            onClick={()=>selectMedia(index)}
          >
            <img 
              className='h-full'
              src={imgToUse} 
            />
          </div>
        })}
        </div>
    </div>
  );
}