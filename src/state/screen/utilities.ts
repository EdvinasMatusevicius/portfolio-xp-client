import {WindowLayeringOrderDataObj, WindowsData, TaskbarButton} from '../../types/index';

export function addNewToWindowOrder(
  windowsLayeringOrder: WindowLayeringOrderDataObj[],
  windowsData: WindowsData,
  windowToOpen: string
){
  const existingOpenWindowIndex = windowsLayeringOrder.map((winData: WindowLayeringOrderDataObj) => winData.name).indexOf(windowToOpen);
  if (existingOpenWindowIndex === -1) {
    const windowData: WindowLayeringOrderDataObj = {...windowsData[windowToOpen]};
    windowData.nestedRoutesHistory.push(windowToOpen);
    windowsLayeringOrder.push(windowData);
  }
  if (existingOpenWindowIndex !== -1) {
    const windowData = (windowsLayeringOrder.splice(existingOpenWindowIndex, 1))[0];
    if (windowData.isMinimized) windowData.isMinimized = false;
    windowsLayeringOrder.push(windowData);
  }
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
export function setWindowAsMinimized(windowsLayeringOrder: WindowLayeringOrderDataObj[], windowToMinimize: string){
  windowsLayeringOrder.forEach((windowData)=>{
    if (windowData.name !== windowToMinimize || windowData.isMinimized) return;
    windowData.isMinimized = true;
  })
}
export function restoreMinimizedWindow(windowsLayeringOrder: WindowLayeringOrderDataObj[], windowToRestore: string){
  windowsLayeringOrder.forEach((windowData)=>{
    if (windowData.name !== windowToRestore || !windowData.isMinimized) return;
    windowData.isMinimized = false;
  })
}

export function addTaskbarButtonToArr(taskbarButtonsArr: TaskbarButton[], buttonName: string) {
  const existingTaskbarBTtnIndex = taskbarButtonsArr.map((btnData: TaskbarButton) => btnData.name).indexOf(buttonName);
  taskbarButtonsArr.forEach(btnData=>btnData.isFocused = false);
  if (existingTaskbarBTtnIndex !== -1) {
    taskbarButtonsArr[existingTaskbarBTtnIndex].isFocused = true;
  } else {
    taskbarButtonsArr.push({name: buttonName, isFocused: true})
  }
}
export function removeTaskbarBtn(taskbarButtonsArr: TaskbarButton[], buttonName: string) {
  const existingTaskbarBTtnIndex = taskbarButtonsArr.map((btnData: TaskbarButton) => btnData.name).indexOf(buttonName);
  if (existingTaskbarBTtnIndex === -1) return;
  taskbarButtonsArr.splice(existingTaskbarBTtnIndex, 1)
}
export function setTaskbarBtnAsFocused(taskbarButtonsArr: TaskbarButton[], buttonName: string) {
  taskbarButtonsArr.forEach(btnData=>{
    if (btnData.name === buttonName && !btnData.isFocused) btnData.isFocused = true;
    if (btnData.name !== buttonName && btnData.isFocused) btnData.isFocused = false;
  });
}
export function setTaskbarBtnAsNotFocused(taskbarButtonsArr: TaskbarButton[], buttonName: string) {
  taskbarButtonsArr.forEach(btnData=>{
    if (btnData.name !== buttonName || !btnData.isFocused) return;
    btnData.isFocused = false;
  });
}