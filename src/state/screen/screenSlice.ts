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
import { ScreenState, WindowsData } from "../../types";

const windowsData: WindowsData = {
  about: { 
      id:1,
      name: 'about',
      text: 'About',
      nestedRoutesHistory: [],
      windowDimensions: { width: 800, height: 550 },
      usesScrollbar: true
    },
  my_documents: { 
    id:2,
    name: 'my_documents',
    text: 'My Documents',
    nestedRoutesHistory: [],
    windowDimensions: { width: 800, height: 550 },
    usesScrollbar: false
  },
  recycle_bin: { 
    id:3,
    name: 'recycle_bin',
    text: 'Recycle Bin',
    nestedRoutesHistory: [],
    windowDimensions: { width: 800, height: 550 },
    usesScrollbar: true
  },
  personal_projects: { 
    id:4,
    name: 'personal_projects',
    text: 'Personal projects',
    nestedRoutesHistory: [],
    windowDimensions: { width: 800, height: 550 },
    usesScrollbar: true
  },
  minesweeper: { 
    id:5,
    name: 'minesweeper',
    text: 'Minesweeper',
    nestedRoutesHistory: [],
    hideWindowHeader: true,
    windowDimensions: null,
    usesScrollbar: false,
    disableFullScreen: true
  },
  media_player: { 
    id:6,
    name: 'media_player',
    text: 'Media player',
    nestedRoutesHistory: [],
    hideWindowHeader: true,
    windowDimensions: { width: 900, height: 600 },
    usesScrollbar: false,
  },
  email: { 
    id:7,
    name: 'email',
    text: 'Email',
    nestedRoutesHistory: [],
    hideWindowHeader: true,
    windowDimensions: { width: 900, height: 600 },
    usesScrollbar: false,
  }
}

const initialScreenState: ScreenState = {
  windowsLayeringOrder: [
    // {
    //   id: 1,
    //   name: 'my_documents',
    //   text: 'test dokumentai',
    //   isMinimized: false,
    //   nestedRoutesHistory: ['my_documents']
    // }
  ],
  startMenuIsOpen: false,
  activeTaskbarButtons: [
    // {
    //   name: 'my_documents',
    //   text: 'My documents',
    //   isFocused: true
    // }
  ],
  windowsData: windowsData
}

const screenSlice = createSlice({
  name: 'screen',
  initialState: initialScreenState,
  reducers:{
    //window handling
    openWindow: (state, action: PayloadAction<string>)=>{
      state.startMenuIsOpen = false;
      const windowToOpen = action.payload;
      addNewToWindowOrder(state.windowsLayeringOrder, state.windowsData, windowToOpen);
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
    },
    setStartMenuState(state, action: PayloadAction<boolean>) {
      state.startMenuIsOpen = action.payload;
    },
    openNewRouteInWindow(state, action: PayloadAction<{windowName: string, routeName: string}>) {
      const {windowName, routeName} = action.payload;
      const openWindowData = state.windowsLayeringOrder.filter(windowData=> windowData.name === windowName)[0];
      if (!openWindowData) return;
      openWindowData.nestedRoutesHistory.push(routeName);
    },
    goBackToPrevWindowRoute(state, action: PayloadAction<string>) {
      const windowName = action.payload;
      const openWindowData = state.windowsLayeringOrder.filter(windowData=> windowData.name === windowName)[0];
      if (!openWindowData || openWindowData.nestedRoutesHistory.length < 2) return;
      openWindowData.nestedRoutesHistory.pop();
    }
  }
});

export const { 
  openWindow, 
  bringWindowToFront, 
  closeWindow,
  minimizeWindow,
  toggleStartMenu,
  setStartMenuState,
  openNewRouteInWindow,
  goBackToPrevWindowRoute
} = screenSlice.actions;

export default screenSlice.reducer;