import { configureStore } from "@reduxjs/toolkit";
import screenReducer from './screen/screenSlice';
import mediaPlayerReducer from './media_player/screenSlice';

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    mediaPlayer: mediaPlayerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;