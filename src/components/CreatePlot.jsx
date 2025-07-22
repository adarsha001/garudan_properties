import React, { useState } from 'react';
import api from '../api';

const CreatePlot = () => {
  const [plot, setPlot] = useState({
    name: '',
    location: '',
    description: '',
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

  const [imagePreviews, setImagePreviews] = useState([]);

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
    } else if (name.includes('utilities.')) {
      const utilityField = name.split('.')[1];
      setPlot(prev => ({
        ...prev,
        utilities: {
          ...prev.utilities,
          [utilityField]: checked
        }
      }));
    } else {
      setPlot(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked :
                type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPlot(prev => ({
      ...prev,
      images: files
    }));

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(plot).forEach(key => {
      if (key !== 'images' && key !== 'dimensions' && key !== 'utilities') {
        formData.append(key, plot[key]);
      }
    });

    formData.append('dimensions', JSON.stringify(plot.dimensions));
    formData.append('utilities', JSON.stringify(plot.utilities));

    plot.images.forEach(image => {
      formData.append('images', image);
    });

    try {
      await api.post('/api/plots', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Plot created successfully!');
    } catch (error) {
      console.error('Error creating plot:', error);
      alert('Failed to create plot');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create New Plot</h1>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Basic Information</h2>

            <Input label="Plot Name" name="name" value={plot.name} onChange={handleChange} required />
            <Input label="Location" name="location" value={plot.location} onChange={handleChange} required />
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
              <textarea
                name="description"
                value={plot.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe this plot briefly..."
              />
            </div>

            <Select 
              label="Plot Type" 
              name="plot_type" 
              value={plot.plot_type} 
              onChange={handleChange} 
              options={['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed-Use']} 
            />

            <Input label="Price " name="price" type="number" value={plot.price} onChange={handleChange} required />
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Dimensions & Map</h2>

            <Input label="Length (m)" name="dimensions.length" type="number" value={plot.dimensions.length} onChange={handleChange} required />
            <Input label="Width (m)" name="dimensions.width" type="number" value={plot.dimensions.width} onChange={handleChange} required />
            <Input label="Area (sqm)" name="area" type="number" value={plot.area} onChange={handleChange} required />
            <Input label="Map URL" name="map_url" type="url" value={plot.map_url} onChange={handleChange} />
          </div>
        </div>

        {/* Ownership and Utilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Ownership Details</h2>

            <Select 
              label="Ownership Type" 
              name="ownership_type" 
              value={plot.ownership_type} 
              onChange={handleChange}
              options={['Freehold', 'Leasehold', 'Cooperative', 'Condominium']} 
            />

            <Input label="Zoning" name="zoning" value={plot.zoning} onChange={handleChange} />
            <Input label="Soil Type" name="soil_type" value={plot.soil_type} onChange={handleChange} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Access & Utilities</h2>

            <Checkbox name="access_road" checked={plot.access_road} onChange={handleChange} label="Access Road Available" />
            <Checkbox name="utilities.water" checked={plot.utilities.water} onChange={handleChange} label="Water" />
            <Checkbox name="utilities.electricity" checked={plot.utilities.electricity} onChange={handleChange} label="Electricity" />
            <Checkbox name="utilities.sewage" checked={plot.utilities.sewage} onChange={handleChange} label="Sewage" />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Plot Images</h2>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="h-32 w-full object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-md shadow transition"
        >
          Create Plot
        </button>
      </form>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, name, type = 'text', ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      name={name}
      type={type}
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable Select component
const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Reusable Checkbox component
const Checkbox = ({ name, checked, onChange, label }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label className="text-sm text-gray-700">{label}</label>
  </div>
);

export default CreatePlot;
