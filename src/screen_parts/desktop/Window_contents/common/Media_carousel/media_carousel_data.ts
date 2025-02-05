import basicRPG1 from '../../../../../assets/carousel_media_groups/basicRPG/basicRPG.png';
import basicRPG2 from '../../../../../assets/carousel_media_groups/basicRPG/basicRpgVid.mp4';
import basicChat1 from '../../../../../assets/carousel_media_groups/basic_chat/basicChat.png';
import darboBaze1 from '../../../../../assets/carousel_media_groups/darbo_baze/darboBaze.png';
import darboBaze2 from '../../../../../assets/carousel_media_groups/darbo_baze/darboBaze.mp4';
import serverPi1 from '../../../../../assets/carousel_media_groups/serverPi/serverpi.png';
import oldPortfolio1 from '../../../../../assets/carousel_media_groups/old_portfolio/oldPortfolio1.png';
import oldPortfolio2 from '../../../../../assets/carousel_media_groups/old_portfolio/oldPortfolio.mp4';

import { MediaCarouselData } from '../../../../../types';

export const mediaCarouselData: MediaCarouselData = {
  basicRPG: {
    media:[
      {img: basicRPG1},
      {vid: basicRPG2}
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
      {vid: darboBaze2}
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
      {vid: oldPortfolio2}
    ]
  }
}