import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <h1>Welcome to Tipsy Traveler!</h1>
      <p>Discover the best bars in town.</p>
      <Link to="/bars">
        <button>View Bars</button>
      </Link>
    </div>
  );
}

export default Homepage;