import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import { openWindow } from "./state/screen/screenSlice";

export function Counter () {
  // const count = useSelector((state: RootState) => state.counter.value);
  const openWindows = useSelector((state: RootState) => state.screen.windowsLayeringOrder)
  const dispatch = useDispatch<AppDispatch>();
  return <div>
    <h2>{JSON.stringify(openWindows)}</h2>
    <div>
      <button onClick={()=>dispatch(openWindow('TEST_WINDOW_A'))}>increment</button>
      <button onClick={()=>dispatch(openWindow('TEST_WINDOW_B'))}>decrement</button>
    </div>
  </div>;
}