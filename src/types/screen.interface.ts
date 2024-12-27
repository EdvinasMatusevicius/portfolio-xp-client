export interface WindowLayeringOrderDataObj {
  id: number,
  name: string
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