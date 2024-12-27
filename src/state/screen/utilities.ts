import {WindowLayeringOrderDataObj, WindowsData} from '../../types/index';
const windowsData: WindowsData = {
  brown: { id:1, name: 'brown' },
  yellow: { id:2, name: 'yellow' },
  red: { id:3, name: 'red' },
  grey: { id:4, name: 'grey' },
  black: { id:5, name: 'black' },
}

export function addNewToWindowOrder(windowsLayeringOrder: WindowLayeringOrderDataObj[], windowToOpen: string){
  const existingOpenWindowIndex = windowsLayeringOrder.map((winData: WindowLayeringOrderDataObj) => winData.name).indexOf(windowToOpen);
  if (existingOpenWindowIndex === -1) {
    const windowData: WindowLayeringOrderDataObj = {
      id: windowsData[windowToOpen].id,
      name: windowsData[windowToOpen].name
    }
    windowsLayeringOrder.push(windowData);
  }
  if (existingOpenWindowIndex !== -1)
    windowsLayeringOrder.push(...windowsLayeringOrder.splice(existingOpenWindowIndex, 1));
}
export function removeFromWindowsOrder(windowsLayeringOrder: WindowLayeringOrderDataObj[], windowToClose: string) {
  const existingOpenWindowIndex = windowsLayeringOrder.map((winData: WindowLayeringOrderDataObj) => winData.name).indexOf(windowToClose);
  if (existingOpenWindowIndex === -1) return;
  windowsLayeringOrder.splice(existingOpenWindowIndex, 1)
}
export function moveExistingWindowToFront(windowsLayeringOrder: WindowLayeringOrderDataObj[], windowToFront: string){
  const existingOpenWindowIndex = windowsLayeringOrder.map((winData: WindowLayeringOrderDataObj) => winData.name).indexOf(windowToFront);
  if (existingOpenWindowIndex !== -1)
    windowsLayeringOrder.push(...windowsLayeringOrder.splice(existingOpenWindowIndex, 1));
}