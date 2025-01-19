import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // External CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">E-Voting</div>
      <ul className="menu">
        <li><Link to="/">Home</Link></li> {/* Updated with Link */}
        <li><Link to="/about">About</Link></li> {/* Updated with Link */}
        <li><Link to="/contact">Contact</Link></li> {/* Updated with Link */}
      </ul>
      <div className="signup-section">
        <button onClick={() => window.location.href = '/signup?voter'}>Sign Up</button>
        {/* <button onClick={() => window.location.href = '/signup?admin'}>Sign Up as Admin</button> */}
        <button onClick={() => window.location.href = '/login'}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
