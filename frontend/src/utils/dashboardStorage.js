const DASHBOARD_KEY = "algolab_dashboard_data";

const defaultDashboardData = {
  totalAlgorithms: 9,
  lastUsedAlgorithm: "--",
  lastInputSize: "--",
  lastDatasetType: "--",
  lastRaceWinner: "--",
  lastRaceAlgorithms: [],
  lastAnalysisAlgorithm: "--",
  lastAnalysisSteps: "--",
  lastAnalysisComparisons: "--",
  lastAnalysisWrites: "--",
  totalRuns: 0,
  recentActivity: [],
  lastUpdatedAt: null,
};

export const getDashboardData = () => {
  try {
    const raw = localStorage.getItem(DASHBOARD_KEY);
    if (!raw) return defaultDashboardData;
    return { ...defaultDashboardData, ...JSON.parse(raw) };
  } catch {
    return defaultDashboardData;
  }
};

export const saveDashboardData = (data) => {
  localStorage.setItem(DASHBOARD_KEY, JSON.stringify(data));
};

export const updateDashboardData = (updater) => {
  const current = getDashboardData();
  const updated = updater(current);
  saveDashboardData(updated);
  return updated;
};