import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHomepage from './components/AdminHomePage';
import CandidateHomepage from './components/CandidateHomepage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import SignupPage from './components/SignupPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CandidateHomepage />} />
        <Route path="/admin" element={<AdminHomepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
