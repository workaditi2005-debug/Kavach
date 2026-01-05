import React, { useState } from 'react';
import { Search } from 'lucide-react';

const LocationSearch = ({ onLocationSelect }) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const mockLocations = [
    { id: 1, name: 'Himachal Pradesh', lat: 31.7, lng: 77.1, risk: 'high' },
    { id: 2, name: 'Uttarakhand', lat: 30.0, lng: 79.0, risk: 'medium' },
    { id: 3, name: 'Arunachal Pradesh', lat: 28.0, lng: 94.0, risk: 'medium' },
    { id: 4, name: 'Manipur', lat: 24.6, lng: 93.9, risk: 'high' },
  ];

  const handleSearch = (value) => {
    setSearchInput(value);
    if (value.length > 0) {
      const filtered = mockLocations.filter(loc =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (location) => {
    setSearchInput(location.name);
    setSuggestions([]);
    if (onLocationSelect) onLocationSelect(location);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search location..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          {suggestions.map(loc => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 text-sm"
            >
              <div className="font-medium text-slate-900">{loc.name}</div>
              <div className="text-xs text-slate-500">Risk: {loc.risk}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
