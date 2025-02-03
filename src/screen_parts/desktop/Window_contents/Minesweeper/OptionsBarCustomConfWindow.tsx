interface OptionsBarCustomConfWindowProps{
  setIsWindowOpen: (isOpen: boolean) => void
}

export function OptionsBarCustomConfWindow({
  setIsWindowOpen
}: OptionsBarCustomConfWindowProps) : JSX.Element {
  return <div className="absolute left-[5%] top-[200%] w-60 h-100">
    <div 
      className="window"
      style={{
        height: '2rem'
      }}
    >
      <div style={{ height: '1.6rem', userSelect: 'none' }} className="title-bar">
        <div 
          className="text-white ml-1"
        >Custom</div>
        <div className="title-bar-controls">
          <button onClick={()=>setIsWindowOpen(false)} aria-label="Close" />
        </div>
      </div>
    </div>
  </div>
}