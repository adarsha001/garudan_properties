import React, { useState } from 'react';
import CreatePlot from './CreatePlot';         // Adjust path if needed
import CreateProperty from './Createproperty'; // Adjust path if needed

const CreateListing = () => {
  const [view, setView] = useState('property'); // 'property' or 'plot'

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 rounded-l border ${view === 'property' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          onClick={() => setView('property')}
        >
          Create Property
        </button>
        <button
          className={`px-4 py-2 rounded-r border ${view === 'plot' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          onClick={() => setView('plot')}
        >
          Create Plot
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        {view === 'property' ? <CreateProperty /> : <CreatePlot />}
      </div>
    </div>
  );
};

export default CreateListing;
