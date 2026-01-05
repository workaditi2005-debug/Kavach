import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';

/** -------------------------
 * Temporary mock data
 * (replace with API later)
 * ------------------------*/
const MOCK_LOCATIONS = [
  {
    id: 1,
    name: 'Himachal Pradesh',
    coordinates: { lat: 31.7, lng: 77.1 },
    riskLevel: 'high',
  },
  {
    id: 2,
    name: 'Uttarakhand',
    coordinates: { lat: 30.0, lng: 79.0 },
    riskLevel: 'moderate',
  },
  {
    id: 3,
    name: 'Arunachal Pradesh',
    coordinates: { lat: 28.0, lng: 94.0 },
    riskLevel: 'moderate',
  },
  {
    id: 4,
    name: 'Manipur',
    coordinates: { lat: 24.6, lng: 93.9 },
    riskLevel: 'high',
  },
];

const LocationSearch = ({ onLocationSelect }) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  const handleSearch = (value) => {
    setSearchInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = MOCK_LOCATIONS.filter((loc) =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleSelect = (location) => {
    setSearchInput(location.name);
    setSuggestions([]);
    onLocationSelect?.(location);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
    if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleBlur = (e) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setSuggestions([]);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onBlur={handleBlur}
    >
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search location..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100
            border border-slate-200 text-slate-900 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          {suggestions.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 hover:bg-slate-50
                border-b border-slate-100 last:border-b-0 text-sm"
            >
              <div className="font-medium text-slate-900">
                {loc.name}
              </div>
              <div className="text-xs text-slate-500">
                Risk level: {loc.riskLevel}
              </div>
            </button>
          ))}
        </div>
      )}

      {searchInput && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border
          border-slate-200 rounded-lg shadow-lg z-50 px-4 py-3 text-sm text-slate-500">
          No matching locations found
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
