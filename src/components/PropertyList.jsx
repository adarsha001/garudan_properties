import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const PropertyList = () => {
  const [properties, setProperties] = useState([]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-teal-700">All Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {properties.map((property) => (
            <Link to={`/property/${property._id}`} key={property._id}>

          <div
            key={property._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
            {property.map_url && (
                <iframe
                src={property.map_url}
                width="100%"
                height="200"
                className="border-none"
                loading="lazy"
                ></iframe>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{property.location}</p>
              <p className="text-gray-700">
                <strong>Price:</strong> ₹{property.price.toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Beds:</strong> {property.beds}
              </p>
              <p className="text-gray-700">
                <strong>Area:</strong> {property.squarefeet} sq.ft
              </p>
              <p className="text-gray-700">
                <strong>Age:</strong> {property.building_age}
              </p>
            </div>
          </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
