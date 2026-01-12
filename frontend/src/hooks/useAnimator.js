import { useState, useRef } from "react";
import { ACTIONS } from "../engine/actionTypes";

export const useAnimator = (steps, initialArray) => {
  const [array, setArray] = useState(initialArray);
  const [highlights, setHighlights] = useState({});
  const [status, setStatus] = useState("idle");

  const stepRef = useRef(0);
  const speedRef = useRef(500);
  const isPlayingRef = useRef(false);

  const runStep = () => {
    if (!isPlayingRef.current) return;

    if (stepRef.current >= steps.length) {
      setStatus("finished");
      setHighlights({});
      isPlayingRef.current = false;
      return;
    }

    const step = steps[stepRef.current];
    setHighlights({});

    switch (step.type) {
      case ACTIONS.COMPARE:
      case ACTIONS.SWAP:
      case ACTIONS.OVERWRITE:
      case ACTIONS.PIVOT:
      case ACTIONS.RECURSION:
      case ACTIONS.COUNT:
      case ACTIONS.PREFIX:
      case ACTIONS.GAP:
        setArray(step.array || array);
        setHighlights({ [step.index ?? 0]: step.type });
        break;
      default:
        break;
    }

    stepRef.current++;
    setTimeout(runStep, speedRef.current);
  };

  const play = () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    setStatus("running");
    runStep();
  };

  const pause = () => {
    isPlayingRef.current = false;
  };

  const reset = () => {
    isPlayingRef.current = false;
    stepRef.current = 0;
    setArray(initialArray);
    setHighlights({});
    setStatus("idle");
  };

  return { array, highlights, play, pause, reset, setSpeed: (speed) => (speedRef.current = speed), status };
};
