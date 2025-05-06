import clippy, { Agent } from 'clippyts';
import { useEffect, useRef } from 'react';

export function Clippy() {
  const clippyRef = useRef<HTMLDivElement>(null);
  // const animList: string[] = ["Congratulate","LookRight","SendMail","Thinking","Explain","IdleRopePile","IdleAtom","Print","Hide","GetAttention",
  //   "Save","GetTechy","GestureUp","Idle1_1","Processing","Alert","LookUpRight","IdleSideToSide","GoodBye","LookLeft","IdleHeadScratch",
  //   "LookUpLeft","CheckingSomething","Hearing_1","GetWizardy","IdleFingerTap","GestureLeft","Wave","GestureRight","Writing","IdleSnooze",
  //   "LookDownRight","GetArtsy","Show","LookDown","Searching","EmptyTrash","Greeting","LookUp","GestureDown","RestPose","IdleEyeBrowRaise",
  //   "LookDownLeft"
  // ];


  useEffect(() => {
    if (!clippyRef.current) return;
    let loopInterval: NodeJS.Timeout | undefined;
    let loopCount = 0;
    clippy.load({
      name: 'Clippy',
      selector: '.my-clippy',
      successCb: (agent: Agent) => {
        agent.show();
        agent.play('Greeting');
        agent.play('Wave');
        loopInterval = setInterval(() => {
          loopCount += 1;
          switch (loopCount) {
            case 4:
              agent.speak("Welcome to Ed's portfolio.", true);
              break;
            case 8:
              agent.stopCurrent();
              break;
            case 9:
              agent.speak("To check out some projects go to 'My Documents' folder.", true);
              break;
            case 15:
              agent.stopCurrent();
              agent.closeBalloon();
              break;
            case 16:
              agent.play('GestureRight');
              break;
            case 19:
              agent.hide();
              break;
            case 20:
              clearInterval(loopInterval);
              break;
            default:
              break;
          }

        }, 1000);
      },
      failCb: (e) => {
        console.error("Failed to load Clippy:", e);
      }
    });
    return () => {
      if (loopInterval) clearInterval(loopInterval);
    };
  }, []);

  return (
    <div className="my-clippy" ref={clippyRef}>
    </div>
  );
}
