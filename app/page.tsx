'use client';

import { useEffect, useState } from 'react';

const images = [
  '/images/slide1.jpg', // Replace with your actual image paths
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

const products = [
  { id: 1, name: 'Product 1', price: '$19.99', image: '/images/product1.jpg' },
  { id: 2, name: 'Product 2', price: '$29.99', image: '/images/product2.jpg' },
  { id: 3, name: 'Product 3', price: '$39.99', image: '/images/product3.jpg' },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <button className="text-blue-600 font-semibold">Login</button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-gray-800">Site Name</span>
        </div>
      </header>

      {/* Image Slider */}
      <div className="w-full max-w-4xl mx-auto mt-6 overflow-hidden rounded-xl">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-64 object-cover transition-all duration-700"
        />
      </div>

      {/* Product Cards */}
      <section className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </section>
    </div>
  );
}