import { Desktop } from "./screen_parts/Desktop"
import { Taskbar } from "./screen_parts/Taskbar"

export function Screen() {
  return <div style={{
    width: '100vw',
    height: '100vh',
    backgroundColor: 'green',
    display: 'grid',
    gridTemplateRows: '1fr 3rem'
  }}>
    {/* <Desktop /> */}
    <Desktop />
    <Taskbar />
  </div>
}