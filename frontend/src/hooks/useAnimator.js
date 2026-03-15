import { useState, useRef, useEffect, useCallback } from "react";

export const useAnimator = (steps = [], initialArray = []) => {
  const [array, setArray] = useState(initialArray);
  const [highlights, setHighlights] = useState([]);
  const [status, setStatus] = useState("idle");

  const stepRef = useRef(0);
  const speedRef = useRef(400);
  const timerRef = useRef(null);
  const playingRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopAnimation = useCallback(() => {
    playingRef.current = false;
    clearTimer();
  }, [clearTimer]);

  const play = useCallback(() => {
    if (!steps.length) return;
    if (playingRef.current) return;

    playingRef.current = true;
    setStatus("playing");

    const tick = () => {
      if (!playingRef.current) return;

      if (stepRef.current >= steps.length) {
        stopAnimation();
        setHighlights([]);
        setStatus("finished");
        return;
      }

      const step = steps[stepRef.current];

      if (step && Array.isArray(step.array)) {
        setArray(step.array);
      }

      if (step && Array.isArray(step.highlights)) {
        setHighlights(step.highlights);
      } else {
        setHighlights([]);
      }

      stepRef.current += 1;
      timerRef.current = setTimeout(tick, speedRef.current);
    };

    tick();
  }, [steps, stopAnimation]);

  const pause = useCallback(() => {
    stopAnimation();
    setStatus("paused");
  }, [stopAnimation]);

  const reset = useCallback(() => {
    stopAnimation();
    stepRef.current = 0;
    setArray(initialArray);
    setHighlights([]);
    setStatus("idle");
  }, [initialArray, stopAnimation]);

  const setSpeed = useCallback((speed) => {
    speedRef.current = speed;
  }, []);

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

  return {
    array,
    highlights,
    status,
    play,
    pause,
    reset,
    setSpeed,
    totalSteps: steps.length,
  };
};