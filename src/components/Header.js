// Header.js
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Tipsy.png'; // Change the path to wherever you store the logo image

function Header() {
    const sayings = ["Pour decisions ahead!", "Sip, sip, hooray!", "Cheers to good times!", "Bottoms up!"];
  const [currentSaying, setCurrentSaying] = useState(sayings[0]);
    
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSaying(sayings[Math.floor(Math.random() * sayings.length)]);
    }, 4000); // change every 5 seconds
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-header justify-content-between">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Tipsy Traveler Logo" width="170" />
      </Link>

      <div className="saying">{currentSaying}</div>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="nav-container">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <Link className="nav-link custom-btn" to="/dummy-login">Login</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link custom-btn" to="/dummy-signup">Signup</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
}

export default Header;