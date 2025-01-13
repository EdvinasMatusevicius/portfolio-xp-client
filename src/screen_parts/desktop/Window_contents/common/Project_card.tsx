import { PhotoCarousel } from './Photo_carousel';
import styles from './Project_card.module.css';
import { ProjectDataList } from '../../../../types/index';
import cardDataRaw from './Project_card_data.json';

const techIcons = import.meta.glob<Record<string, string>>('/src/assets/images/tech_icons/*.svg', { eager: true });

interface CardProps { projectName: string }

export function ProjectCard({projectName}: CardProps): JSX.Element {
  const cardData = cardDataRaw as ProjectDataList;
  const projectData = cardData[projectName];


  return <div className={styles.project_card_wrapper}>
    <div className='flex justify-around items-end'>
      <div className={styles.title}>{projectData.title}</div>
      <div className='flex'>
        {projectData.techUsed.map(
          (techName, i)=>{
            const imgSrc = techIcons[`/src/assets/images/tech_icons/${techName}.svg`]?.default;
            return <img src={imgSrc} key={i} style={{maxHeight: '3rem'}}></img>
          }
        )}
      </div>
    </div>
    <div className={`${styles.fade_line} my-3`}></div>
    <PhotoCarousel />
  </div>
}