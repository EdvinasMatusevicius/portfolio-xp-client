export interface DesktopDimensionsData {
  width: number, height: number
}
export interface WindowLayeringOrderDataObj {
  id: number,
  name: string,
  text: string,
  nestedRoutesHistory: string[]
  windowDimensions: null | {width: number, height: number}
  usesScrollbar: boolean
  isMinimized?: boolean,
  hideWindowHeader?: boolean,
  disableFullScreen?: boolean
}
export interface WindowsData {
  [key: string]: WindowLayeringOrderDataObj
}
export interface ScreenState {
  windowsLayeringOrder: WindowLayeringOrderDataObj[],
  startMenuIsOpen: boolean,
  activeTaskbarButtons: TaskbarButton[],
  windowsData: WindowsData
}
export interface TaskbarButton {
  name: string,
  isFocused: boolean
}

export interface ProjectCardData {
  title: string
  techUsed: string[]
  mediaCarousel: string,
  description: string,
  gitLinks: {link: string, text?: string}[],
  backgroundColor: string
}

export interface ProjectDataList {
  [key: string]: ProjectCardData
}