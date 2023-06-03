import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import the CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pasien">Pasien</Link>
        </li>
        <li>
          <Link to="/dokter">Dokter</Link>
        </li>
        <li>
          <Link to="/pemeriksaan">Pemeriksaan</Link>
        </li>
        <li>
          <Link to="/obat">Obat</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
