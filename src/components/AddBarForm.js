import React, { useState } from 'react';
import { createBar } from '../Api'; 
import { useNavigate } from 'react-router-dom';

function AddBarForm() {
  const [formData, setFormData] = useState({
    name: '',
    drink_name: '',
    drink_description: '',
    drink_picture_url: '',
    city_walkability: '',
    city_crime_rate: ''
  });

  const navigate = useNavigate();

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
            await createBar(formData);
            navigate('/bars');
        } catch (error) {
            console.error("Error adding bar:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Drink Name:
                <input type="text" name="drink_name" value={formData.drink_name} onChange={handleChange} required />
            </label>
            <label>
                Drink Description:
                <input type="text" name="drink_description" value={formData.drink_description} onChange={handleChange} required />
            </label>
            <label>
                Drink Picture URL:
                <input type="url" name="drink_picture_url" value={formData.drink_picture_url} onChange={handleChange} />
            </label>
            <label>
                City Walkability:
                <input type="text" name="city_walkability" value={formData.city_walkability} onChange={handleChange} required />
            </label>
            <label>
                City Crime Rate:
                <input type="text" name="city_crime_rate" value={formData.city_crime_rate} onChange={handleChange} required />
            </label>
            <button type="submit">Add Bar</button>
        </form>
    );
}

export default AddBarForm;