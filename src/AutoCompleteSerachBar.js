import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';

// Fake API service using JSONPlaceholder
const fetchUserSuggestions = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?username_like=${query}`);
    const users = await response.json();
    
    return users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username
    }));
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};

const AutocompleteSearchbar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
  // Cache to store previous search results
  const [suggestionCache, setSuggestionCache] = useState({});

  // Debounced fetch with caching
  const debouncedFetchSuggestions = useCallback(async (searchQuery) => {
    // Trim and validate query
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setSuggestions([]);
      return;
    }

    // Check cache first
    if (suggestionCache[trimmedQuery]) {
      setSuggestions(suggestionCache[trimmedQuery]);
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Fetch suggestions
      const result = await fetchUserSuggestions(trimmedQuery);
      
      // Update cache
      setSuggestionCache(prevCache => ({
        ...prevCache,
        [trimmedQuery]: result
      }));
      
      // Set suggestions
      setSuggestions(result);
    } catch (error) {
      console.error('Error in suggestion fetch:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [suggestionCache]);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) debouncedFetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, debouncedFetchSuggestions]);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedSuggestionIndex(-1);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
  };
  
  // Keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : -1
      );
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
      const selectedSuggestion = suggestions[selectedSuggestionIndex];
      setQuery(selectedSuggestion.name);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input 
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search users..."
          className="w-full p-2 pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search 
          className="absolute left-2 top-3 text-gray-400" 
          size={20} 
        />
        {loading && (
          <div className="absolute right-2 top-3 text-gray-400">
            Loading...
          </div>
        )}
      </div>
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li 
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                index === selectedSuggestionIndex ? 'bg-gray-100' : ''
              }`}
            >
              <div className="font-semibold">{suggestion.name}</div>
              <div className="text-sm text-gray-500">@{suggestion.username}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearchbar;