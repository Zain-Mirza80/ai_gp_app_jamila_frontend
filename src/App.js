import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PatientChat from './pages/PatientChat';
import DoctorLogin from './pages/DoctorLogin';
import './App.css';  // Make sure this import is correct
import DoctorDashboard from './pages/DoctorDashboard';

// test comment

function App() {
  return (
    <Router>
      <Header />
      <div className="content">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient-chat" element={<PatientChat />} />
          <Route path="/doctor-login" element={<DoctorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


//test ting