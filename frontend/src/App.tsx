import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { FlightsPage } from './pages/FlightsPage';
import { AirlinesPage } from './pages/AirlinesPage';
import { PassengersPage } from './pages/PassengersPage';
import { GatesPage } from './pages/GatesPage';
import { StaffPage } from './pages/StaffPage';
import { WeatherPage } from './pages/WeatherPage';
import { BaggagePage } from './pages/BaggagePage';
import { MaintenancePage } from './pages/MaintenancePage';
import { SecurityPage } from './pages/SecurityPage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/airlines" element={<AirlinesPage />} />
            <Route path="/passengers" element={<PassengersPage />} />
            <Route path="/gates" element={<GatesPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/baggage" element={<BaggagePage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/security" element={<SecurityPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
