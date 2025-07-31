import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>Task Manager</h1>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/DashboardPage" className="nav-link" onClick={closeMenu}>
            <i className="fas fa-home"></i>
            Dashboard
          </Link>
          <Link to="/TaskPage" className="nav-link" onClick={closeMenu}>
            <i className="fas fa-tasks"></i>
            Tasks
          </Link>
          <Link to="/SettingsPage" className="nav-link" onClick={closeMenu}>
            <i className="fas fa-cog"></i>
            Settings
          </Link>
        </div>
        
        <div 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;