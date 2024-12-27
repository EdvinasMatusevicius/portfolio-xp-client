import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {addNewToWindowOrder, moveExistingWindowToFront, removeFromWindowsOrder} from './utilities';
import { ScreenState, WindowLayeringOrderDataObj } from "../../types";

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
    },
    closeWindow: (state, action: PayloadAction<string>) =>{
      state.startMenuIsOpen = false;
      const windowToClose = action.payload;
      removeFromWindowsOrder(state.windowsLayeringOrder, windowToClose)
    },
    bringWindowToFront: (state, action: PayloadAction<string>)=>{
      state.startMenuIsOpen = false;
      const windowToFront = action.payload;
      moveExistingWindowToFront(state.windowsLayeringOrder, windowToFront)
    },
    // taskbar buttons 
    
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
  toggleStartMenu
} = screenSlice.actions;

export default screenSlice.reducer;