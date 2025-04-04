import { Desktop } from "./screen_parts/Desktop"
import { Taskbar } from "./screen_parts/Taskbar"
import backgroundImage from './assets/images/xp_background.jpg';

export function Screen() {
  return <div style={{
    width: '100vw',
    height: '100svh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    display: 'grid',
    gridTemplateRows: '1fr 35px',
    overflow: 'hidden'
  }}>
    <Desktop />
    <Taskbar />
  </div>
}