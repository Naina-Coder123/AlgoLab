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
    setHighlights([]);
    isPlayingRef.current = false;
    return;
  }

  const step = steps[stepRef.current];

  if (step.array) {
    setArray(step.array);
  }

  setHighlights(step.highlights || []);

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

  const setSpeed = (speed) => {
    speedRef.current = speed;
  };

  return {
    array,
    highlights,
    play,
    pause,
    reset,
    setSpeed,
    status,
  };
};