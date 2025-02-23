import { About } from "./Window_contents/About";
import { MyDocuments } from "./Window_contents/My_documents";
import { PersonalProjects } from "./Window_contents/Personal_projects";
import { MineSweeper } from "./Window_contents/Minesweeper";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { RecycleBin } from "./Window_contents/RecycleBin";
import { MediaPlayer } from './Window_contents/Media_player';
import { Email } from './Window_contents/EMail';

interface WindowContentsProps {
  windowName: string,
  currentRoute: string,
  windowIsMaximized: boolean
}
export function WindowContent({windowName, currentRoute, windowIsMaximized}: WindowContentsProps): JSX.Element {
  const windowsData = useSelector((state: RootState) => state.screen.windowsData);

  //padding so that blue outline of window would be visible
  return <div style={{
    width: '100%', 
    height: '100%', 
    padding: '0 3px 0 3px',
    ...(windowsData[currentRoute]?.usesScrollbar ? {overflow: 'hidden',} : {}),

  }}>
    <div style={{
      width: '100%',
      height: '100%',
      ...(windowsData[currentRoute]?.usesScrollbar ? {overflowY: 'auto',} : {})
    }}>
      {currentRoute === 'about' ? <About/> : null}
      {currentRoute === 'my_documents' ? <MyDocuments windowName={windowName} /> : null}
      {currentRoute === 'personal_projects' ? <PersonalProjects windowIsMaximized={windowIsMaximized} /> : null}
      {currentRoute === 'recycle_bin' ? <RecycleBin  windowIsMaximized={windowIsMaximized} /> : null}
      {currentRoute === 'minesweeper' ? <MineSweeper /> : null}
      {currentRoute === 'media_player' ? <MediaPlayer windowIsMaximized={windowIsMaximized} /> : null}
      {currentRoute === 'email' ? <Email /> : null}
    </div>
  </div>
}