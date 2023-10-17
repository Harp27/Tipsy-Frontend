import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBarById, updateBar, deleteBar } from '../Api'; // Assuming you have a function like this in your Api.js

function BarShowPage() {
  const { id } = useParams(); // Get the bar ID from the route parameters
  const navigate = useNavigate();
  const [bar, setBar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state for toggling the edit mode
  const [formData, setFormData] = useState({}); // Form state for editing

  useEffect(() => {
    getBarById(id)
      .then(response => {
        setBar(response.data);
        setFormData(response.data); // Set the initial form data to the fetched bar details
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBar(formData);
      setBar(formData);
      setIsEditing(false); // Close the edit form after updating
    } catch (error) {
      console.error("Error updating bar:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBar(id);
      navigate('/bars'); // Navigate to the bars listing page after deletion
    } catch (error) {
      console.error("Error deleting bar:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
          </label>
          <label>
            Drink Name:
            <input type="text" name="drink_name" value={formData.drink_name || ''} onChange={handleChange} required />
          </label>
          <label>
            Drink Description:
            <input type="text" name="drink_description" value={formData.drink_description || ''} onChange={handleChange} required />
          </label>
          <label>
            Drink Picture URL:
            <input type="url" name="drink_picture_url" value={formData.drink_picture_url || ''} onChange={handleChange} />
          </label>
          <label>
            City Walkability:
            <input type="text" name="city_walkability" value={formData.city_walkability || ''} onChange={handleChange} required />
          </label>
          <label>
            City Crime Rate:
            <input type="text" name="city_crime_rate" value={formData.city_crime_rate || ''} onChange={handleChange} required />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <>
          {bar.drink_picture_url && <img src={bar.drink_picture_url} alt="Drink" style={{width: "300px"}} />}
          <h1>{bar.name}</h1>
          <p><strong>Drink Name:</strong> {bar.drink_name}</p>
          <p><strong>Drink Description:</strong> {bar.drink_description}</p>
          <p><strong>Walkability:</strong> {bar.city_walkability}</p>
          <p><strong>Crime Rate:</strong> {bar.city_crime_rate}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}


export default BarShowPage;