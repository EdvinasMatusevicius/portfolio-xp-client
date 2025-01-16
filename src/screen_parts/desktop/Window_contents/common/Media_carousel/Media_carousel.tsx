import { useState } from 'react';
import styles from './Media_carousel.module.css';
import videoSelectImg from '../../../../../assets/images/videoSelect.png';
import { mediaCarouselData } from './media_carousel_data';
import { MediaCarouselMainView } from './Media_carousel_main_view';
import navBtnImg from '../../../../../assets/images/icons/carousel_navpng.png'

interface CarouselProps{
  carouselGroupName: string
}

export function MediaCarousel({carouselGroupName}: CarouselProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const media = mediaCarouselData[carouselGroupName].media;
  function selectMedia(index: number) {
    const mediasCount = media.length;
    if (index < 0) index = mediasCount - 1; //when edge reached then will loop around from other side
    if (index > mediasCount - 1) index = 0;
    setSelectedIndex(index);
  }
  return (
    <div className={`${styles.carousel_wrapper} w-full h-full`}>
      <div className='h-full flex justify-center'>
        <MediaCarouselMainView mediaItem={media[selectedIndex]} />
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
        {media.map((item, index) => {
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