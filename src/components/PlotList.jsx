import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiLayers, FiHome, FiHeart } from 'react-icons/fi';
import api from '../api';

const PlotList = () => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await api.get(`/api/plots`);
        setPlots(res.data);
      } catch (err) {
        console.error('Error fetching plots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlots();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/plots/${id}`);
  };

  if (loading) return <div className="text-center py-20">Loading plots...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">All Plots</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plots.map((plot) => (
          <div
            key={plot._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleNavigate(plot._id)}
          >
            <div className="relative">
              <img
                src={plot.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={plot.name}
                className="w-full h-48 sm:h-56 object-cover"
              />

             

           
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plot.name}</h3>

              <div className="flex items-center text-gray-600 mb-3">
                <FiMapPin className="mr-1" size={14} />
                <span className="text-sm">{plot.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col items-center">
                  <FiLayers className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{plot.plot_type}</span>
                </div>
                <div className="flex flex-col items-center">
                  <FiHome className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-600">{plot.ownership_type}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1 text-sm">SQM</span>
                  <span className="text-xs text-gray-600">{plot.area}</span>
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

export default PlotList;
