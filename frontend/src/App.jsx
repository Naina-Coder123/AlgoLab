import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import VisualizerPage from "./pages/VisualizerPage";
import Race from "./pages/Race";
import Analyzer from "./pages/Analyzer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visualizer"
          element={
            <ProtectedRoute>
              <VisualizerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/race"
          element={
            <ProtectedRoute>
              <Race />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analyzer"
          element={
            <ProtectedRoute>
              <Analyzer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;