import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20 text-white bg-gray-950 min-h-screen px-4">
        <Routes>
          <Route path="/home" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/services" element={<h1>Services Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
