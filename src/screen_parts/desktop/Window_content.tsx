import { About } from "./Window_contents/About";
import { MyDocuments } from "./Window_contents/My_documents";
import { PersonalProjects } from "./Window_contents/Personal_projects";

interface WindowContentsProps {
  windowName: string,
  currentRoute: string,
  windowIsMaximized: boolean
}
export function WindowContent({windowName, currentRoute, windowIsMaximized}: WindowContentsProps): JSX.Element {
  //padding so that blue outline of window would be visible
  return <div style={{width: '100%', height: '100%', padding: '0 3px 0 3px',overflow: 'hidden',}}>
    <div style={{width: '100%', height: '100%', overflowY: 'auto'}}>
      {currentRoute === 'about' ? <About/> : null}
      {currentRoute === 'my_documents' ? <MyDocuments windowName={windowName} /> : null}
      {currentRoute === 'personal_projects' ? <PersonalProjects windowIsMaximized={windowIsMaximized} /> : null}
    </div>
  </div>
}