import { CSSProperties } from "react"
import { ProjectCard } from "./common/Project_Card/Project_card"
import { WindowDimensions } from "../../../types";

interface PersonalProjectsProps {
  windowIsMaximized: boolean,
  windowDimensions: WindowDimensions | null
}

export function PersonalProjects({windowIsMaximized, windowDimensions}: PersonalProjectsProps): JSX.Element {
  const projectsWrapperCss = {
    position: 'relative',
    display: 'grid',
    gridAutoColumns: '1fr 10fr 1fr',
    gridTemplateAreas: '". projects-column ."',
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white'
  } as CSSProperties;
  const projectCardsColumnCss = {
    minWidth: '100%',
    height: '100%',
    gridArea: 'projects-column',
    paddingTop: '1rem'
  } as CSSProperties;
  if (windowIsMaximized && windowDimensions && windowDimensions?.width > 900) {
    projectCardsColumnCss.display = 'grid';
    projectCardsColumnCss.gridTemplateColumns = '1fr 1fr';
    projectCardsColumnCss.gap = '1rem';
  }
  return <div 
      style={projectsWrapperCss}
    >
      <div 
        style={projectCardsColumnCss}
      >
        <ProjectCard 
          projectName='serverPi'
        />
        <ProjectCard 
          projectName='basicRPG'
        />
        <ProjectCard 
          projectName='darboBaze'
        />
        <ProjectCard 
          projectName='basicChat'
        />
      </div>
  </div>
}