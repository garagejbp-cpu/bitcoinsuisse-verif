import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Landing from './pages/kyc/Landing';
import AdminDashboard from './pages/AdminDashboard';
import PasswordGate from './components/PasswordGate';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App smooth-scroll">
        <Routes>
          {/* Site vitrine public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Page KYC protégée par mot de passe */}
          <Route 
            path="/validation" 
            element={
              <PasswordGate>
                <Landing />
              </PasswordGate>
            } 
          />
          
          {/* Page Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
