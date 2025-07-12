import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Createproperty from './components/Createproperty';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import Home from './main/home';

const App = () => {
  const sampleProperties = [
    {
      id: 1,
      title: "Modern Villa with Ocean View",
      location: "Malibu, California",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "New York, NY",
      price: 750000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    },
  ];

  return (
    <BrowserRouter>
      <div className="relative bg-gray-100 min-h-screen overflow-x-hidden">
        <Navbar />

       



        <Routes>
 
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<div className="text-center pt-20 mt-10 text-2xl font-semibold">About Page</div>} />
          <Route path="/services" element={<div className="text-center mt-10 text-2xl font-semibold">Services Page</div>} />
          
          <Route path="/create" element={<Createproperty/>} />
          <Route path="/property/:id" element={<PropertyDetails/>} />
         
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
