import { MediaCarousel } from '../Media_carousel/Media_carousel';
import styles from './Project_card.module.css';
import { ProjectDataList } from '../../../../../types/index';
import cardDataRaw from './Project_card_data.json';
import githubIcon from '../../../../../assets/images/icons/github.png';

const techIcons = import.meta.glob<Record<string, string>>('/src/assets/images/tech_icons/*.svg', { eager: true });

interface CardProps { projectName: string }

export function ProjectCard({projectName}: CardProps): JSX.Element {
  const cardData = cardDataRaw as ProjectDataList;
  const projectData = cardData[projectName];


  return <div className={`${styles.project_card_wrapper}`}>
    <div className='flex justify-between'>
      <div className='flex items-end justify-start h-full'>
        <b className={`${styles.title} whitespace-nowrap`}>{projectData.title}</b>
        {projectData.techUsed.map(
          (techName, i)=>{
            const imgSrc = techIcons[`/src/assets/images/tech_icons/${techName}.svg`]?.default;
            return <img src={imgSrc} key={i} style={{maxHeight: '60%', margin: '2px'}}></img>
          }
        )}
      </div>
      <div className='flex justify-between'>
        {projectData.gitLinks.map(
          (gitData, i)=>{
            return <a 
              href={gitData.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.github_link} key={i}
            >
              <img src={githubIcon} alt="github Logo"/>
              { gitData.text && <span className='whitespace-nowrap'>{gitData.text}</span>}
            </a>
          }
        )}
      </div>
    </div>
    <div className={`${styles.fade_line} mb-3`}></div>
    <MediaCarousel 
      carouselGroupName={projectData.mediaCarousel}
    />
    <span className={styles.description}>{projectData.description}</span>
  </div>
}