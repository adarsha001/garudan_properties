import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Animatedslider from './components/Animatedslider';

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

        {/* Hero + Properties */}
        <Animatedslider properties={sampleProperties} />

        {/* Routes (Optional pages) */}
        <Routes>
          <Route path="/" element={<div className="text-center mt-10 text-2xl font-semibold">Home Page</div>} />
          <Route path="/about" element={<div className="text-center mt-10 text-2xl font-semibold">About Page</div>} />
          <Route path="/services" element={<div className="text-center mt-10 text-2xl font-semibold">Services Page</div>} />
          <Route path="/contact" element={<div className="text-center mt-10 text-2xl font-semibold">Contact Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
