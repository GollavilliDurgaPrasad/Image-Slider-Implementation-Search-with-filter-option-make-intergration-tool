import React from 'react';
import { highlightText } from '../utils/searchUtils';

const TestimonialCard = ({ testimonial, searchTerm, isMatched }) => {
  const highlightedContent = highlightText(testimonial.content, searchTerm);
  const highlightedAuthor = highlightText(testimonial.author, searchTerm);
  const highlightedRole = highlightText(testimonial.role, searchTerm);

  const renderHighlightedText = (parts) => {
    return parts.map((part, index) => (
      <span
        key={index}
        className={part.highlight ? 'bg-yellow-200 font-medium px-1 rounded' : ''}
      >
        {part.text}
      </span>
    ));
  };

  // Generate geometric design based on testimonial ID
  const getGeometricDesign = (id) => {
    const designs = [
      // Teal with red triangle
      { bg: 'bg-teal-200', shape: 'bg-red-500', type: 'triangle' },
      // Teal with red triangle
      { bg: 'bg-teal-200', shape: 'bg-red-500', type: 'triangle' },
      // Pink with purple/yellow
      { bg: 'bg-pink-200', shape: 'bg-purple-600', type: 'circle' },
      // Pink with purple/yellow
      { bg: 'bg-pink-200', shape: 'bg-purple-600', type: 'circle' },
      // Pink with purple/yellow
      { bg: 'bg-pink-200', shape: 'bg-purple-600', type: 'circle' },
      // Teal with orange
      { bg: 'bg-teal-200', shape: 'bg-orange-500', type: 'diamond' },
      // Pink with green
      { bg: 'bg-pink-200', shape: 'bg-green-500', type: 'circle' },
      // Blue with yellow
      { bg: 'bg-blue-200', shape: 'bg-yellow-400', type: 'triangle' },
      // Purple with orange
      { bg: 'bg-purple-200', shape: 'bg-orange-400', type: 'circle' },
      // Green with red
      { bg: 'bg-green-200', shape: 'bg-red-400', type: 'diamond' }
    ];
    
    const index = parseInt(id.replace('T', '')) - 1;
    return designs[index] || designs[0];
  };

  const design = getGeometricDesign(testimonial.id);

  const renderGeometricShape = () => {
    const baseClasses = `${design.shape} absolute`;
    
    switch (design.type) {
      case 'triangle':
        return (
          <div className={`${baseClasses} w-8 h-8 transform rotate-45 top-4 left-4`}></div>
        );
      case 'circle':
        return (
          <div className={`${baseClasses} w-6 h-6 rounded-full top-5 right-5`}></div>
        );
      case 'diamond':
        return (
          <div className={`${baseClasses} w-6 h-6 transform rotate-45 top-5 left-5`}></div>
        );
      default:
        return (
          <div className={`${baseClasses} w-8 h-8 transform rotate-45 top-4 left-4`}></div>
        );
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
      isMatched ? 'ring-2 ring-blue-300 shadow-md' : ''
    }`}>
      {/* Geometric Header */}
      <div className={`${design.bg} h-24 relative`}>
        {renderGeometricShape()}
        {isMatched && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            Match
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* ID and Title */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            {testimonial.id}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>2019</div>
            <div className="font-medium">
              {renderHighlightedText(highlightedRole)}
            </div>
            <div className="text-xs">
              {renderHighlightedText(highlightedAuthor)}
            </div>
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
            "{renderHighlightedText(highlightedContent)}"
          </p>
        </div>

        {/* Category */}
        <div className="border-t border-gray-100 pt-3">
          <span className="text-xs font-medium text-gray-800">
            Student Success Story
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;