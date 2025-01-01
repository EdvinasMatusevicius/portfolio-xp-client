export interface DesktopDimensionsData {
  width: number, height: number
}
export interface WindowLayeringOrderDataObj {
  id: number,
  name: string,
  isMinimized?: boolean
}
export interface WindowsData {
  [key: string]: WindowLayeringOrderDataObj
}
export interface ScreenState {
  windowsLayeringOrder: WindowLayeringOrderDataObj[],
  startMenuIsOpen: boolean,
  activeTaskbarButtons: TaskbarButton[]
}
export interface TaskbarButton {
  name: string,
  isFocused: boolean
}