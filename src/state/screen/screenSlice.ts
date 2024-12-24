import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ScreenState {
  windowsLayeringOrder: WindowDataObj[],
}
interface WindowDataObj {
  id: number,
  name: string
}
interface WindowsData {
  [key: string]: WindowDataObj
}
const windowsData: WindowsData = {
  brown: { id:1, name: 'brown' },
  yellow: { id:2, name: 'yellow' },
  red: { id:3, name: 'red' },
  grey: { id:4, name: 'grey' },
  black: { id:5, name: 'black' },
}
const initialScreenState: ScreenState = {
  windowsLayeringOrder: []
}

const screenSlice = createSlice({
  name: 'screen',
  initialState: initialScreenState,
  reducers:{
    openWindow: (state, action: PayloadAction<string>)=>{
      const windowToOpen = action.payload;
      const existingOpenWindowIndex = state.windowsLayeringOrder.map((winData: WindowDataObj) => winData.name).indexOf(windowToOpen);
      if (existingOpenWindowIndex === -1) {
        const windowData: WindowDataObj = {
          id: windowsData[windowToOpen].id,
          name: windowsData[windowToOpen].name
        }
        state.windowsLayeringOrder.push(windowData);
      }
      if (existingOpenWindowIndex !== -1)
        state.windowsLayeringOrder.push(...state.windowsLayeringOrder.splice(existingOpenWindowIndex, 1));
    },
    closeWindow: (state, action: PayloadAction<string>) =>{
      const windowToClose = action.payload;
      const existingOpenWindowIndex = state.windowsLayeringOrder.map((winData: WindowDataObj) => winData.name).indexOf(windowToClose);
      if (existingOpenWindowIndex === -1) return;
      state.windowsLayeringOrder.splice(existingOpenWindowIndex, 1)
    },
    bringExistingToFront: (state, action: PayloadAction<string>)=>{
      const windowToFront = action.payload;
      const existingOpenWindowIndex = state.windowsLayeringOrder.map((winData: WindowDataObj) => winData.name).indexOf(windowToFront);
      if (existingOpenWindowIndex !== -1)
        state.windowsLayeringOrder.push(...state.windowsLayeringOrder.splice(existingOpenWindowIndex, 1));

    }
  }
});

export const { openWindow, bringExistingToFront, closeWindow } = screenSlice.actions;

export default screenSlice.reducer;