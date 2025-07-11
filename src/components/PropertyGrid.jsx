import React from 'react';
import { FiHeart, FiMapPin, FiDollarSign, FiHome, FiLayers } from 'react-icons/fi';

const PropertyGrid = () => {
  const properties = [
    {
      id: 1,
      title: 'Modern Family Home',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      price: 12500000,
      location: 'Bangalore, India',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
    },
    {
      id: 2,
      title: 'Luxury Villa Retreat',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
      price: 27500000,
      location: 'Goa, India',
      type: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      area: 3800,
    },
    {
      id: 3,
      title: 'Downtown Apartment',
      image: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 8200000,
      location: 'Mumbai, India',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
    },
    {
      id: 4,
      title: 'Cozy Smart Home',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      price: 9800000,
      location: 'Hyderabad, India',
      type: 'House',
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters/Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Available Properties</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>All Types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Villa</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
                <FiHeart className="text-gray-600 hover:text-red-500 cursor-pointer" />
              </div>
              <div className="absolute bottom-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {property.type}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
                <p className="text-lg font-semibold text-teal-600 flex items-center">
                  <FiDollarSign className="mr-1" />
                  {property.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center text-gray-600 mt-2">
                <FiMapPin className="mr-1" size={14} />
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col items-center">
                  <FiHome className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{property.bedrooms} Beds</span>
                </div>
                <div className="flex flex-col items-center">
                  <FiLayers className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{property.bathrooms} Baths</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1 text-sm">SQFT</span>
                  <span className="text-xs text-gray-600">{property.area.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

export default PropertyGrid;
