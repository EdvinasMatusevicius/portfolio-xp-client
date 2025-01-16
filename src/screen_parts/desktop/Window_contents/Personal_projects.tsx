import { CSSProperties } from "react"
import { ProjectCard } from "./common/Project_Card/Project_card"

export function PersonalProjects({windowIsMaximized}: {windowIsMaximized: boolean}): JSX.Element {
  const projectsWrapperCss = {
    display: 'grid',
    gridAutoColumns: '1fr 10fr 1fr',
    gridTemplateAreas: '". projects-column ."',
    width: '100%',
    height: '100%'
  } as CSSProperties;
  const projectCardsColumnCss = {
    minWidth: '100%',
    height: '100%',
    gridArea: 'projects-column',
    paddingTop: '1rem'
  } as CSSProperties;
  if (windowIsMaximized) {
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
          projectName='basicRPG'
        />

        {/* TODO REMOVE THESE PLACEHOLDER COPIES */}
        <ProjectCard 
          projectName='basicRPG'
        />
                <ProjectCard 
          projectName='basicRPG'
        />
                <ProjectCard 
          projectName='basicRPG'
        />
                        <ProjectCard 
          projectName='basicRPG'
        />
                                <ProjectCard 
          projectName='basicRPG'
        />
                <ProjectCard 
          projectName='basicRPG'
        />
                <ProjectCard 
          projectName='basicRPG'
        />
                <ProjectCard 
          projectName='basicRPG'
        />
                        <ProjectCard 
          projectName='basicRPG'
        />
                                <ProjectCard 
          projectName='basicRPG'
        />
      </div>
  </div>
}