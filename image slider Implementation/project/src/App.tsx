import React from 'react';
import TestimonialCarousel from './components/ImageCarousel';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how professionals from various backgrounds have transformed their careers 
            and achieved their goals through our programs.
          </p>
        </div>
        <TestimonialCarousel />
      </div>
    </div>
  );
}

export default App;