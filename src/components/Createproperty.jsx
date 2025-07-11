import axios from 'axios';
import React, { useState } from 'react';

const CreateProperty = () => {
    const fields = ['name', 'location', 'building_age', 'price', 'beds', 'squarefeet', 'map_url'];


  const [property, setProperty] = useState({
    name: '',
    location: '',
    building_age: '',
    price: '',
    beds: '',
    squarefeet: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Sending property:", property);
 const res=await axios.post("http://localhost:8080/api/properties",property)
 
 alert("added sucessfully")
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Property</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">
                {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
              <input
          type={field === 'map_url' ? 'url' : ['price', 'beds', 'squarefeet'].includes(field) ? 'number' : 'text'}
                name={field}
                value={property[field]}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md transition duration-200"
            >
              Submit Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProperty;
