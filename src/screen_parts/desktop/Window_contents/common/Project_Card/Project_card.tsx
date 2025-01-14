import { MediaCarousel } from '../Media_carousel/Media_carousel';
import styles from './Project_card.module.css';
import { ProjectDataList } from '../../../../../types/index';
import cardDataRaw from './Project_card_data.json';

const techIcons = import.meta.glob<Record<string, string>>('/src/assets/images/tech_icons/*.svg', { eager: true });

interface CardProps { projectName: string }

export function ProjectCard({projectName}: CardProps): JSX.Element {
  const cardData = cardDataRaw as ProjectDataList;
  const projectData = cardData[projectName];


  return <div className={`${styles.project_card_wrapper}`}>
    <div className='flex justify-around items-end'>
      <b className={styles.title}>{projectData.title}</b>
      <div className='flex h-full'>
        {projectData.techUsed.map(
          (techName, i)=>{
            const imgSrc = techIcons[`/src/assets/images/tech_icons/${techName}.svg`]?.default;
            return <img src={imgSrc} key={i} style={{maxHeight: '100%'}}></img>
          }
        )}
      </div>
    </div>
    <div className={`${styles.fade_line} my-3`}></div>
    <MediaCarousel 
      carouselGroupName="basicRPG"
    />
    <p>description should be here, check grid rules</p>
  </div>
}