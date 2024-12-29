import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  addNewToWindowOrder,
  moveExistingWindowToFront,
  removeFromWindowsOrder,
  addTaskbarButtonToArr,
  removeTaskbarBtn,
  setTaskbarBtnAsFocused,
  setWindowAsMinimized,
  restoreMinimizedWindow,
  setTaskbarBtnAsNotFocused
} from './utilities';
import { ScreenState } from "../../types";

const initialScreenState: ScreenState = {
  windowsLayeringOrder: [],
  startMenuIsOpen: false,
  activeTaskbarButtons: []
}

const screenSlice = createSlice({
  name: 'screen',
  initialState: initialScreenState,
  reducers:{
    //window handling
    openWindow: (state, action: PayloadAction<string>)=>{
      state.startMenuIsOpen = false;
      const windowToOpen = action.payload;
      addNewToWindowOrder(state.windowsLayeringOrder, windowToOpen);
      addTaskbarButtonToArr(state.activeTaskbarButtons, windowToOpen);
    },
    closeWindow: (state, action: PayloadAction<string>) =>{
      state.startMenuIsOpen = false;
      const windowToClose = action.payload;
      removeFromWindowsOrder(state.windowsLayeringOrder, windowToClose);
      removeTaskbarBtn(state.activeTaskbarButtons, windowToClose);
    },
    bringWindowToFront: (state, action: PayloadAction<string>)=>{
      state.startMenuIsOpen = false;
      const windowToFront = action.payload;
      restoreMinimizedWindow(state.windowsLayeringOrder, windowToFront);
      moveExistingWindowToFront(state.windowsLayeringOrder, windowToFront);
      setTaskbarBtnAsFocused(state.activeTaskbarButtons, windowToFront);
    },
    minimizeWindow: (state, action: PayloadAction<string>)=>{
      state.startMenuIsOpen = false;
      const windowToMinimize = action.payload;
      setWindowAsMinimized(state.windowsLayeringOrder, windowToMinimize);
      setTaskbarBtnAsNotFocused(state.activeTaskbarButtons, windowToMinimize);
    },
    //start menu handling
    toggleStartMenu(state) {
      state.startMenuIsOpen = !state.startMenuIsOpen;
    }
  }
});

export const { 
  openWindow, 
  bringWindowToFront, 
  closeWindow,
  toggleStartMenu,
  minimizeWindow
} = screenSlice.actions;

export default screenSlice.reducer;