export const extractMetricsFromSteps = (steps = []) => {
  let comparisons = 0;
  let swaps = 0;
  let overwrites = 0;
  let pivots = 0;
  let sortedMarks = 0;

  for (const step of steps) {
    if (!step || !step.type) continue;

    switch (step.type) {
      case "compare":
        comparisons += 1;
        break;
      case "swap":
        swaps += 1;
        break;
      case "overwrite":
        overwrites += 1;
        break;
      case "pivot":
        pivots += 1;
        break;
      case "sorted":
        sortedMarks += 1;
        break;
      default:
        break;
    }
  }

  return {
    totalSteps: steps.length,
    comparisons,
    swaps,
    overwrites,
    pivots,
    sortedMarks,
    writes: swaps + overwrites,
  };
};