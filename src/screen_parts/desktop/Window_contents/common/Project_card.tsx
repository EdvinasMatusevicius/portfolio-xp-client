import styles from './Project_card.module.css';
import { ProjectCardData, ProjectDataList } from '../../../../types/index';
import cardDataRaw from './Project_card_data.json';
const techIcons = import.meta.glob('/src/assets/images/tech_icons/*.svg', { eager: true });

interface CardProps { projectName: string }

export function ProjectCard({projectName}: CardProps): JSX.Element {
  const cardData = cardDataRaw as ProjectDataList;
  const projectData = cardData[projectName];


  return <div className={styles.project_card_wrapper}>
    <div>
      <div>{projectData.title}</div>
      {projectData.techUsed.map((techName, i)=>{
        const imgSrc = techIcons[`/src/assets/images/tech_icons/${techName}.svg`]?.default;
        return (<img 
          src={imgSrc}
          key={i}
        ></img>)
      })}
    </div>
  </div>
}