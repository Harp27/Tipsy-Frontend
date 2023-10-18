import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBars } from '../Api'; // Make sure the path is correct

function BarsPage() {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch bars when component mounts
    getBars()
      .then(response => {
        setBars(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  }, []); // The empty dependency array means this useEffect runs once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Pick Your Poison!</h1>
  
      {/* Display Bars in Grid */}
      <div className="grid-container">
        {bars.map(bar => (
          <div key={bar.id} className="grid-item">
            {/* Drink Image */}
            <Link to={`/bars/show/${bar.id}`}>
              <img 
                src={bar.drink_picture_url} 
                alt={bar.drink_name} 
                className="drink-image" 
              />
            </Link>
            <p>{bar.drink_name}</p>
          </div>
        ))}
      </div>
      <Link to="/bars/add">
        <button>Add a New Bar</button>
      </Link>
    </div>

    
  );
}

export default BarsPage;