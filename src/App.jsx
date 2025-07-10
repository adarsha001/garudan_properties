import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import ImageSlider from '../src/components/ImageSlider';
import PropertyGrid from "../src/components/PropertyGrid"
const App = () => {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      title: 'Luxury Waterfront Properties',
      description: 'Exclusive collection of homes with private beach access and stunning ocean views',
      buttonText: 'View Listings',
      badge: 'Premium'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      title: 'Modern City Apartments',
      description: 'Sophisticated urban living with premium amenities in prime locations',
      buttonText: 'Explore',
      badge: 'New Developments'
    },
    {
      url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
      title: 'Countryside Retreats',
      description: 'Peaceful estates with large acreage just outside the city',
      buttonText: 'Discover',
      badge: 'Limited Availability'
    },
    {
      url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00',
      title: 'Investment Properties',
      description: 'High-yield rental opportunities with proven ROI track records',
      buttonText: 'Invest Now',
      badge: 'Hot Deal'
    },
    {
      url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
      title: 'Smart Home Villas',
      description: 'Cutting-edge automated homes with energy-efficient designs',
      buttonText: 'Tour Homes',
      badge: 'Tech Ready'
    }
  ];

  const sampleProperties = [
    {
      id: 1,
      title: "Modern Villa with Ocean View",
      type: "Villa",
      price: 1250000,
      location: "Malibu, California",
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
    },
    {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    },
    {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    }, {
      id: 2,
      title: "Downtown Luxury Apartment",
      type: "Apartment",
      price: 750000,
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    },
    // Add more properties...
  ];

  return (
    <BrowserRouter>
      <Navbar />
     <ImageSlider slides={slides} />;
      <div className="pt-20 text-white bg-gray-950 min-h-screen px-4">

      <PropertyGrid properties={sampleProperties} />;
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
