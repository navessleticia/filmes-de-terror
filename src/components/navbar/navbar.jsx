// navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className='logo'>
          <img src="src/assets/ScareFlix (1).png" alt="ScareFlix Logo" />
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/filmes" className="nav-link">Filmes</Link>
        </li>
        <li className="nav-item">
          <Link to="/warren" className="nav-link">Warren</Link>
        </li>
        <li className="nav-item">
          <Link to="/slasher" className="nav-link">Slasher</Link>
        </li>
      </ul>
    </nav>
  );
}
