import { ProjectCard } from "./common/Project_Card/Project_card"

export function PersonalProjects(): JSX.Element {
  return <div 
      style={{
        display: 'grid',
        gridAutoColumns: '1fr 8fr 1fr',
        gridTemplateAreas: '". projects-column ."',
        width: '100%',
        height: '100%'
      }}
    >
      <div 
        style={{ gridArea: 'projects-column'}}
        className="w-full h-full"
      >
        <ProjectCard 
          projectName='basicRPG'
        />
        <ProjectCard 
          projectName='basicRPG'
        />
      </div>
  </div>
}