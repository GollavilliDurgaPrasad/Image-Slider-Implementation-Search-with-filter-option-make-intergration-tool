import React, { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import TestimonialCard from './components/TestimonialCard';
import { testimonials } from './data/testimonials';
import { searchTestimonials, sortTestimonials } from './utils/searchUtils';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Process testimonials based on search term
  const processedTestimonials = useMemo(() => {
    const searchResults = searchTestimonials(testimonials, searchTerm);
    return sortTestimonials(searchResults);
  }, [searchTerm]);

  // Count matching testimonials
  const matchingCount = useMemo(() => {
    return processedTestimonials.filter(t => t.matches).length;
  }, [processedTestimonials]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Filter in real time with search Bar
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
         
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClear={handleClear}
          resultCount={searchTerm ? matchingCount : testimonials.length}
          totalCount={testimonials.length}
        />

        {/* Results Info */}
        {searchTerm && (
          <div className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Matching Results ({matchingCount})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Other Results ({testimonials.length - matchingCount})
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Search term: "<span className="font-medium">{searchTerm}</span>"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {processedTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              searchTerm={searchTerm}
              isMatched={searchTerm ? testimonial.matches : false}
            />
          ))}
        </div>

        {/* No Results */}
        {searchTerm && matchingCount === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinecap="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-4">
                Try searching for different keywords like "programming", "TCS", "Mechanical", or "coding"
              </p>
              <button
                onClick={handleClear}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;