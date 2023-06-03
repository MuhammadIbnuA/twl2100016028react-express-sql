import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './component/navbar.css'; // Import the CSS file
import HomeContent from './component/home'
import PasienContent from './component/Tpasien'
import DokterContent from './component/Tdokter'
import PemeriksaanContent from './component/Tpemeriksaan'
import ObatContent from './component/Tobat'

const Home = () => {
  return (
    <div>
      <h1>                             </h1>
      <HomeContent /> {/* Render the imported HomeContent component */}
    </div>
  );
}

const Pasien = () => {
  return (
    <div>
      <h1>                             </h1>
      <PasienContent />{/* Your Pasien page content */}
    </div>
  );
}

const Dokter = () => {
  return (
    <div>
      <h1>                             </h1>
      <DokterContent />{/* Your Dokter page content */}
    </div>
  );
}

const Pemeriksaan = () => {
  return (
    <div>
      <h1>                             </h1>
      <PemeriksaanContent />{/* Your Pemeriksaan page content */}
    </div>
  );
}

const Obat = () => {
  return (
    <div>
      <h1>                             </h1>
      <ObatContent />{/* Your Obat page content */}
    </div>
  );
}

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

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pasien" element={<Pasien />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/pemeriksaan" element={<Pemeriksaan />} />
        <Route path="/obat" element={<Obat />} />
      </Routes>
    </Router>
  );
}

export default App;
