import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li className="nav-item">
          <Link to="/">홈</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">소개</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">연락처</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
