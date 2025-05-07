import signal_left from '../../assets/clippy/signal_left.gif'
import on_bike_appear from '../../assets/clippy/on_bike_appear.gif'
import idle from '../../assets/clippy/idle.gif'
import fly_away from '../../assets/clippy/fly_away.gif'
import SpeechBubble from './clippy/SpeechBubble'
import { useState, useEffect, useRef } from 'react';

interface TimeoutAction {
  duration: number; // Renamed 'delay' to 'duration' for clarity and consistency
  callback: () => void;
}

interface Actions {
  [key: string]: TimeoutAction;
}


export function Clippy() {
  const actions: Actions = {
    showGreeting: {
      duration: 2000,
      callback: () => setMessage('Welcome to Ed\'s portfolio!'),
    },
    toProjects: {
      duration: 5000,
      callback: () => {
        setGifUrl(idle);
        setMessage('If you want to check out some projects, go to "My Documents"');
      }
    },
    signalLeft: {
      duration: 5000,
      callback: () => setGifUrl(signal_left)
    },
    leave: {
      duration: 2000,
      callback: () => {
        setMessage('');
        setGifUrl(fly_away);
      }
    },
    hide: {
      duration: 9500,
      callback: () => setClippyIsVisible(false)
    }
  };

  const actionsToDoOrder = ['showGreeting', 'toProjects', 'signalLeft', 'leave', 'hide']; // Added showGoodbyeMsg
  const [message, setMessage] = useState<string | null>(null);
  const currentAction = useRef<string | null>(null);
  const currentTimeout = useRef<NodeJS.Timeout | null>(null);
  const [gifUrl, setGifUrl] = useState<string | undefined>(on_bike_appear);
  const [clippyIsVisible, setClippyIsVisible] = useState<boolean>(true);

  const startNextTimeout = () => {
    if (actionsToDoOrder.length === 0) {
      currentAction.current = null;
      currentTimeout.current = null;
      return;
    }

    const actionKey = actionsToDoOrder.shift()!; // Get and remove the first action
    console.log(actionKey)
    currentAction.current = actionKey; // Store the current action key
    const action = actions[actionKey];

    if (currentTimeout.current) {
      clearTimeout(currentTimeout.current); // Clear any existing timeout
      currentTimeout.current = null;
    }

    currentTimeout.current = setTimeout(() => {
      action.callback();
      currentTimeout.current = null; // Clear the ref after the timeout
      currentAction.current = null;
      startNextTimeout(); // Start the next timeout in the sequence
    }, action.duration);
      console.log(`Timeout "${actionKey}" set for ${action.duration}ms`);
  };

  useEffect(() => {
    startNextTimeout(); // Start the sequence when the component mounts

    return () => {
      if (currentTimeout.current) {
        clearTimeout(currentTimeout.current);
      }
    };
  }, []);



  return <div style={{
    position: 'absolute',
    right: '0px',
    height: '300px',
    width: '200px',
    top: '-310px',
    display: clippyIsVisible ? 'block' : 'none'
  }}>
    <div 
      style={{
        // background: 'green',
        width: '100%',
        height: '100%'
      }}
      className='flex flex-col justify-end items-center p-1'
    >
      {message && 
        <SpeechBubble>
          {message}
        </SpeechBubble>
      }
      <img src={gifUrl} alt="" />
    </div>
  </div>
}