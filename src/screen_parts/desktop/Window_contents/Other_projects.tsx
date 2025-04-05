import { CSSProperties } from "react";
import { ProjectCard } from "./common/Project_Card/Project_card";
import { WindowDimensions } from "../../../types";


interface OtherProjectsProps {
  windowIsMaximized: boolean,
  windowDimensions: WindowDimensions | null
}

export function OtherProjects({windowIsMaximized, windowDimensions}: OtherProjectsProps): JSX.Element {

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
          projectName='lmk'
        />
      </div>
  </div>
}