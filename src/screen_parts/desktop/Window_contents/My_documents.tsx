import { WindowShortcut } from "./common/Window_shortcut/Window_shortcut"

export function MyDocuments({windowName}: {windowName: string}): JSX.Element {
  return <div style={{ position: 'relative', backgroundColor: 'white'}} >
    <WindowShortcut routeName="personal_projects"  windowName={windowName}/>
  </div>
}