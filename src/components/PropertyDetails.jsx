import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error('Error fetching property:', err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      {property.map_url && (
        <iframe
          src={property.map_url}
          width="100%"
          height="300"
          className="mb-6"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{property.name}</h2>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {property.location}</p>
      <p className="text-gray-600 mb-2"><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
      <p className="text-gray-600 mb-2"><strong>Beds:</strong> {property.beds}</p>
      <p className="text-gray-600 mb-2"><strong>Area:</strong> {property.squarefeet} sq.ft</p>
      <p className="text-gray-600"><strong>Building Age:</strong> {property.building_age}</p>
    </div>
  );
};

export default PropertyDetails;
