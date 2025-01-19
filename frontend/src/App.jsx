import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHomepage from './components/AdminHomePage';
import CandidateHomepage from './components/CandidateHomepage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import SignupPage from './components/SignupPage';
import ProtectedRoute from "./components/ProtectedRoute.jsx";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><CandidateHomepage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminHomepage /></ProtectedRoute>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
