export interface DesktopDimensionsData {
  width: number, height: number
}
export interface WindowLayeringOrderDataObj {
  id: number,
  name: string,
  text: string,
  isMinimized?: boolean
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