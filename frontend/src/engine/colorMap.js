import { ACTIONS } from "./actionTypes";

export const colorMap = {
  default: "#4f46e5",           // Purple-blue for inactive bars
  [ACTIONS.COMPARE]: "#facc15", // Neon yellow for compare
  [ACTIONS.SWAP]: "#f472b6",    // Neon pink for swap
  [ACTIONS.OVERWRITE]: "#60a5fa", // Neon blue for overwrite
  [ACTIONS.PIVOT]: "#22c55e",    // Neon green for pivot
  [ACTIONS.RECURSION]: "#a78bfa", // Neon purple for recursion
  [ACTIONS.COUNT]: "#f97316",    // Orange for counting
  [ACTIONS.PREFIX]: "#10b981",   // Green for prefix sum
  [ACTIONS.GAP]: "#8b5cf6",      // Violet for gap (shell sort)
};
