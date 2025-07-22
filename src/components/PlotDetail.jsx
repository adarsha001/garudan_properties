import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import {
  FiMapPin,
  FiNavigation,
  FiLayers,
  FiDollarSign,
  FiHome,
  FiImage,
  FiClock
} from 'react-icons/fi';
import UserPromptModal from '../main/UserPromptModal';

const PlotDetail = () => {
  const { id } = useParams();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await api.get(`/api/plots/${id}`);
        setPlot(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlot();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!plot) return <div className="text-gray-500 text-center p-4">Plot not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-teal-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" viewBox="0 0 6 10" fill="none">
                <path stroke="currentColor" d="M1 9L5 5L1 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Link to="/plots" className="ml-1 text-sm font-medium text-gray-500 md:ml-2 hover:text-teal-600">Plots</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" viewBox="0 0 6 10" fill="none">
                <path stroke="currentColor" d="M1 9L5 5L1 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2 truncate max-w-[120px]">{plot.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Title & Price */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{plot.name}</h1>
        
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-700 mb-8">
        <FiMapPin className="mr-2 text-teal-500" />
        <span>{plot.location}</span>
      </div>

      {/* Image Gallery */}
      {plot.images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {plot.images.map((img, index) => (
            <img key={index} src={img.url} alt={`Plot ${index + 1}`} className="rounded-lg w-full h-48 object-cover shadow" />
          ))}
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Plot Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiHome className="text-teal-500 mr-2" />
                  <span className="font-medium">Plot Type</span>
                </div>
                <p className="text-gray-700">{plot.plot_type}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiLayers className="text-teal-500 mr-2" />
                  <span className="font-medium">Area</span>
                </div>
                <p className="text-gray-700">{plot.area} sqm</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiImage className="text-teal-500 mr-2" />
                  <span className="font-medium">Dimensions</span>
                </div>
                <p className="text-gray-700">{plot.dimensions.length}m × {plot.dimensions.width}m</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiClock className="text-teal-500 mr-2" />
                  <span className="font-medium">Ownership</span>
                </div>
                <p className="text-gray-700">{plot.ownership_type}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {plot.description && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{plot.description}</p>
            </div>
          )}

          {/* Additional Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Zoning:</span> {plot.zoning || 'Not specified'}</p>
              <p><span className="font-medium">Soil Type:</span> {plot.soil_type || 'Not specified'}</p>
              <p><span className="font-medium">Access Road:</span> {plot.access_road ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Utilities */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Utilities</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Water:</span> {plot.utilities?.water ? 'Available' : 'Not available'}</p>
              <p><span className="font-medium">Electricity:</span> {plot.utilities?.electricity ? 'Available' : 'Not available'}</p>
              <p><span className="font-medium">Sewage:</span> {plot.utilities?.sewage ? 'Available' : 'Not available'}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Agent */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                <span className="text-teal-600 font-medium text-lg">A</span>
              </div>
              <div>
                <p className="font-medium">Agent Name</p>
                <p className="text-sm text-gray-500">Land Specialist</p>
              </div>
            </div>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Request Info
            </button>
          </div>

          {/* Map Embed */}
          {plot.map_url && (
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <FiNavigation className="text-teal-500 mr-2" />
                Location
              </h3>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src={plot.map_url}
                  width="100%"
                  height="250"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <a 
                href={plot.map_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-3 text-teal-600 hover:text-teal-800 text-sm font-medium"
              >
                View larger map
              </a>
            </div>
          )}
        </div>
      </div>
            <div><UserPromptModal/></div>
    </div>
  );
};

export default PlotDetail;
