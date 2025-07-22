import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const EditPlot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plot, setPlot] = useState({
    name: '',
    location: '',
    plot_type: 'Residential',
    price: '',
    map_url: '',
    dimensions: { length: '', width: '' },
    area: '',
    ownership_type: 'Freehold',
    zoning: '',
    soil_type: '',
    access_road: false,
    utilities: {
      water: false,
      electricity: false,
      sewage: false
    },
    images: []
  });
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await api.get(`/api/plots/${id}`);
        setPlot(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlot();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('dimensions.')) {
      const dimField = name.split('.')[1];
      setPlot(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimField]: type === 'number' ? parseFloat(value) : value
        }
      }));
    } 
    else if (name.includes('utilities.')) {
      const utilityField = name.split('.')[1];
      setPlot(prev => ({
        ...prev,
        utilities: {
          ...prev.utilities,
          [utilityField]: checked
        }
      }));
    }
    else {
      setPlot(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all fields to formData
    Object.keys(plot).forEach(key => {
      if (key !== 'images' && key !== 'dimensions' && key !== 'utilities' && key !== '_id') {
        formData.append(key, plot[key]);
      }
    });

    // Append nested objects as JSON strings
    formData.append('dimensions', JSON.stringify(plot.dimensions));
    formData.append('utilities', JSON.stringify(plot.utilities));

    // Append new images
    newImages.forEach(image => {
      formData.append('images', image);
    });

    try {
      await api.put(`/api/plots/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Plot updated successfully!');
      navigate(`/plots/${id}`);
    } catch (error) {
      console.error('Error updating plot:', error);
      alert('Failed to update plot');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Plot</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Same form fields as CreatePlot component */}
        {/* ... */}
        
        {/* Current Images */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Current Images</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {plot.images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image.url} 
                  alt={`Plot ${index + 1}`} 
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* New Images */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Add New Images</h2>
          <input
            type="file"
            name="newImages"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Update Plot
          </button>
          <button
            type="button"
            onClick={() => navigate(`/plots/${id}`)}
            className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlot;