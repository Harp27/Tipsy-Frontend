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
      <h1>Bars</h1>
      
      {/* Link to Add Bar Form */}
      <Link to="/bars/add">
        <button>Add a New Bar</button>
      </Link>
  
      {/* Display Bars */}
      <ul>
    {bars.map(bar => (
        <li key={bar.id}>
            <Link to={`/bars/show/${bar.id}`}>{bar.name}</Link>
        </li>
    ))}
</ul>
    </div>
  );

}

export default BarsPage;