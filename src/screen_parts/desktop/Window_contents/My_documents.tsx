import { CSSProperties } from "react";
import { WindowShortcut } from "./common/Window_shortcut/Window_shortcut"

export function MyDocuments({windowName}: {windowName: string}): JSX.Element {
  const shortcutsWrapperStyles = {
    // position: 'relative',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: '0.5rem',
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(25%, 1fr))`,
    gridTemplateRows: `repeat(auto-fill, minmax(6rem, 1fr))`,
  } as CSSProperties;
  return <div style={{ ...shortcutsWrapperStyles }} >
    <WindowShortcut routeName="personal_projects" text="Personal projects" windowName={windowName}/>
    <WindowShortcut routeName="other_projects" text="Other projects" windowName={windowName}/>
  </div>
}