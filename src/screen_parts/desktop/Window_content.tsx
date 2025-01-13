import { About } from "./Window_contents/About";
import { MyDocuments } from "./Window_contents/My_documents";

interface WindowContentsProps {
  windowName: string
}

export function WindowContent({windowName}: WindowContentsProps): JSX.Element {
  //padding so that blue outline of window would be visible
  return <div style={{width: '100%', height: '100%', padding: '0 3px 0 3px',overflow: 'hidden',}}>
    <div style={{width: '100%', height: '100%', overflowY: 'auto'}}>
      {windowName === 'about' ? <About/> : null}
      {windowName === 'my_documents' ? <MyDocuments/> : null}
    </div>
  </div>
}