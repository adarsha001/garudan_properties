import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiHeart,
  FiMapPin,
  FiDollarSign,
  FiHome,
  FiLayers
} from 'react-icons/fi';
import api from '../api';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get(`/properties/`);
        setProperties(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, []);

  // Handle filtering and sorting
  useEffect(() => {
    let result = [...properties];

    // Search filter
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())||
        p.price.toString().includes(searchTerm)
      );
    }

    // Sorting
    if (sortOption === 'priceLowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'locationAZ') {
      result.sort((a, b) => a.location.localeCompare(b.location));
    }

    setFiltered(result);
  }, [searchTerm, sortOption, properties]);

  const handleNavigate = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">All Properties</h2>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="locationAZ">Location A-Z</option>
        </select>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleNavigate(property._id)}
          >
            <div className="relative">
              <img
                src={property.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={property.name}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
                <FiHeart className="text-gray-600 hover:text-red-500 cursor-pointer" />
              </div>
              <div className="absolute bottom-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                ₹{property.price.toLocaleString()}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{property.name}</h3>
              
              </div>

              <div className="flex items-center text-gray-600 mt-2">
                <FiMapPin className="mr-1" size={14} />
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col items-center">
                  <FiHome className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{property.beds} Beds</span>
                </div>
                <div className="flex flex-col items-center">
                  <FiLayers className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{property.building_age}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1 text-sm">SQFT</span>
                  <span className="text-xs text-gray-600">{property.squarefeet.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
