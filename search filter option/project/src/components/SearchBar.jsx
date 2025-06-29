import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, onClear, resultCount, totalCount }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search testimonials... (e.g., 'Mechanical', 'programming', 'TCS')"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm placeholder-slate-400"
        />
        {searchTerm && (
          <button
            onClick={onClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-3 text-center">
          <p className="text-slate-600">
            Found <span className="font-semibold text-blue-600">{resultCount}</span> of {totalCount} testimonials
            {resultCount > 0 && <span className="text-slate-500 ml-2">• Matching results shown first</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;