import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import MySkillsPage from './pages/MySkillsPage';
import DiscoverPeersPage from './pages/DiscoverPeersPage';
import SwapRequestsPage from './pages/SwapRequestsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-offwhite">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/skills" element={<ProtectedRoute><MySkillsPage /></ProtectedRoute>} />
            <Route path="/discover" element={<ProtectedRoute><DiscoverPeersPage /></ProtectedRoute>} />
            <Route path="/requests" element={<ProtectedRoute><SwapRequestsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/chat/:requestId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
