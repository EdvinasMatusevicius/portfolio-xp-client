import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ScreenState {
  windowsLayeringOrder: string[],
}

const initialScreenState: ScreenState = {
  windowsLayeringOrder: ['test1','test2','test3']
}

const screenSlice = createSlice({
  name: 'screen',
  initialState: initialScreenState,
  reducers:{
    openWindow: (state, action: PayloadAction<string>)=>{
      const windowToOpen = action.payload;
      const existingWindowOrderIndex = state.windowsLayeringOrder.indexOf(windowToOpen);
      if (existingWindowOrderIndex !== -1)
        state.windowsLayeringOrder.push(...state.windowsLayeringOrder.splice(existingWindowOrderIndex, 1));
      else
        state.windowsLayeringOrder.push(windowToOpen);
    }
  }
});

export const { openWindow } = screenSlice.actions;

export default screenSlice.reducer;