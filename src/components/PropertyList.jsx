import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FiHeart,
  FiMapPin,
  FiDollarSign,
  FiHome,
  FiLayers
} from 'react-icons/fi';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, []);

  const handlenavigate =(id)=>{
    // e.preventDefault();
    navigate(`/property/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-teal-700">All Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" onClick={()=>handlenavigate(property._id)}>
              <div className="relative ">
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
                  <p className="text-sm font-medium text-teal-600">{property.building_age || 'New'}</p>
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
                    <span className="text-xs text-gray-600">-</span>
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

      {/* Optional: Pagination */}
      <div className="flex justify-center mt-10">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                page === 1 ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
