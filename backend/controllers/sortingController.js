const bubbleSort = require("../services/bubblesort");
const insertionSort = require("../services/insertionSort");
const selectionSort = require("../services/selectionSort");
const mergeSort = require("../services/mergeSort");
const quickSort = require("../services/quickSort");
const countingSort = require("../services/countingSort");
const heapSort = require("../services/heapSort");
const shellSort = require("../services/shellSort");
const bucketSort = require("../services/bucketSort");

exports.runSort = (req, res) => {
  console.log("/run route hit");
  const { algorithm, array } = req.body;

  if (!array || !algorithm) {
    return res.status(400).json({ error: "Invalid input" });
  }

  let result;
  switch (algorithm) {
    case "bubble":
      result = bubbleSort(array);
      break;
    case "insertion":
      result = insertionSort(array);
      break;
    case "selection":
      result = selectionSort(array);
      break;
    case "merge":
      result = mergeSort(array);
      break;
    case "quick":
      result = quickSort(array);
      break;
    case "counting":
      result = countingSort(array);
      break;
    case "heap":
      result = heapSort(array);
      break;
    case "shell":
      result = shellSort(array);
      break;
    case "bucket":
      result = bucketSort(array);
      break;
    default:
      return res.status(400).json({ error: "Algorithm not supported" });
  }

  res.json({
    steps: result.steps,
    complexity: result.complexity,
  });
};
