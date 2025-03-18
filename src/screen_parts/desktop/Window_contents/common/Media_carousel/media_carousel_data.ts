import basicRPG1 from '../../../../../assets/carousel_media_groups/basicRPG/basicRPG.png';
import basicChat1 from '../../../../../assets/carousel_media_groups/basic_chat/basicChat.png';
import darboBaze1 from '../../../../../assets/carousel_media_groups/darbo_baze/darboBaze.png';
import serverPi1 from '../../../../../assets/carousel_media_groups/serverPi/serverpi.png';
import oldPortfolio1 from '../../../../../assets/carousel_media_groups/old_portfolio/oldPortfolio1.png';
import lmk1 from '../../../../../assets/carousel_media_groups/lmk/inventory.png';
import lmk2 from '../../../../../assets/carousel_media_groups/lmk/police_tablet.png';

import { MediaCarouselData } from '../../../../../types';

export const mediaCarouselData: MediaCarouselData = {
  basicRPG: {
    media:[
      {img: basicRPG1},
      {vid: () => import('../../../../../assets/carousel_media_groups/basicRPG/basicRpgVid.mp4')}
    ]
  },
  basicChat: {
    media:[
      {img: basicChat1}
    ]
  },
  darboBaze: {
    media:[
      {img: darboBaze1},
      {vid: () => import('../../../../../assets/carousel_media_groups/darbo_baze/darboBaze.mp4')}
    ]
  },
  serverPi:{
    media:[
      {img: serverPi1}
    ]
  },
  oldPortfolio:{
    media:[
      {img: oldPortfolio1},
      {vid: () => import('../../../../../assets/carousel_media_groups/old_portfolio/oldPortfolio.mp4')}
    ]
  },
  lmk:{
    media:[
      {img: lmk1},
      {img: lmk2},
      {vid: () => import('../../../../../assets/carousel_media_groups/lmk/videoplayback.mp4')}
    ]
  }
}