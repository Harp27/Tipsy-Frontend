import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBarById, updateBar, deleteBar } from '../Api'; 

function BarShowPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [bar, setBar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({}); 

  useEffect(() => {
    getBarById(id)
      .then(response => {
        setBar(response.data);
        setFormData(response.data); 
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
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating bar:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBar(id);
      navigate('/bars'); 
    } catch (error) {
      console.error("Error deleting bar:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <div className="bar-show-container">
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
          <p> {bar.drink_name}</p>
          <p className="drink-description"> {bar.drink_description}</p>
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