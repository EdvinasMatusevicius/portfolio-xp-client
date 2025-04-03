// import { Desktop } from "./screen_parts/Desktop"
// import { Taskbar } from "./screen_parts/Taskbar"
// import backgroundImage from './assets/images/xp_background.jpg';

import { useState } from "react"

export function Screen() {
  const [color, setColor] = useState<boolean>(true);
  const [text, setText] = useState<string>('START');
  function onTouchEnd() {
    setColor(!color)
  }
  function onTouchStart() {
    setText(JSON.stringify(Math.random()))
  }
  return <div 
    style={{ height: '100vh', width: '100vw', backgroundColor: color ? 'red' : 'blue'}}
    onTouchStart={()=>onTouchStart()}
    onTouchEnd={()=>onTouchEnd()}
  ><b className="m-5 text-white">{text}</b></div>
  // return <div style={{
  //   width: '100vw',
  //   height: '100vh',
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: 'cover',
  //   display: 'grid',
  //   gridTemplateRows: '1fr 35px',
  //   overflow: 'hidden'
  // }}>
  //   <Desktop />
  //   <Taskbar />
  // </div>
}