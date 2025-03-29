import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MediaPlayerState, Station } from "../../types";

const initialMediaPlayerState: MediaPlayerState = {
  radioStationsArr: []
}

const screenSlice = createSlice({
  name: 'screen',
  initialState: initialMediaPlayerState,
  reducers:{
    updateRadioStationsList(state, action: PayloadAction<Station[]>) {
      const radioStationsPayload = action.payload;
      if (radioStationsPayload && !Array.isArray(radioStationsPayload)) return;
      state.radioStationsArr = radioStationsPayload;;
    }
  }
});

export const { 
  updateRadioStationsList
} = screenSlice.actions;

export default screenSlice.reducer;