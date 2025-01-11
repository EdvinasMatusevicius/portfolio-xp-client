import { ProjectCard } from "./common/Project_card"

export function PersonalProjects(): JSX.Element {
  return <div 
      style={{
        display: 'grid',
        gridAutoColumns: '1fr 8fr 1fr',
        gridTemplateAreas: '". projects-column ."'
      }}
      className="w-full h-full bg-white"
    >
      <div 
        style={{ gridArea: 'projects-column'}}
        className="w-full h-full p-2"
      >
        <ProjectCard 
          projectName='basicRPG'
        />
      </div>
  </div>
}