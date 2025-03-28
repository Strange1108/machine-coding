import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, UserCircle, Mail, Phone, Globe } from 'lucide-react';

// Custom hook to handle clicks outside of a component
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Comprehensive API service for users
const fetchUserDetails = async (query) => {
  if (!query) return [];

  try {
    // Fetch users matching the query
    const usersResponse = await fetch(`https://jsonplaceholder.typicode.com/users?username_like=${query}`);
    const users = await usersResponse.json();
    
    // Fetch additional details for matched users
    const detailedUsers = await Promise.all(
      users.map(async (user) => {
        // Fetch posts for the user
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
        
        // Fetch albums for the user
        const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);
        const albums = await albumsResponse.json();
        
        return {
          ...user,
          posts: posts.length,
          albums: albums.length,
          company: user.company,
          address: user.address
        };
      })
    );
    
    return detailedUsers;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};

const AutocompleteSearchbar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
  // Refs
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  
  // Cache to store previous search results
  const [suggestionCache, setSuggestionCache] = useState({});

  // Use click outside hook
  useClickOutside(searchContainerRef, () => {
    setSuggestions([]);
    setIsFocused(false);
  });

  // Debounced fetch with caching
  const debouncedFetchSuggestions = useCallback(async (searchQuery) => {
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

    setLoading(true);

    try {
      const result = await fetchUserDetails(trimmedQuery);
      
      setSuggestionCache(prevCache => ({
        ...prevCache,
        [trimmedQuery]: result
      }));
      
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
    setIsFocused(true);
    setSelectedUser(null);
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsFocused(true);
    if (query && suggestions.length === 0) {
      debouncedFetchSuggestions(query);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (user) => {
    setQuery(user.name);
    setSuggestions([]);
    setIsFocused(false);
    setSelectedUser(user);
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
    } else if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0) {
        const selectedSuggestion = suggestions[selectedSuggestionIndex];
        setQuery(selectedSuggestion.name);
        setSuggestions([]);
        setIsFocused(false);
        setSelectedUser(selectedSuggestion);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4">
      <div 
        ref={searchContainerRef} 
        className="relative w-full"
      >
        <div className="relative">
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
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
        
        {isFocused && suggestions.length > 0 && (
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

      {/* User Details Card */}
      {selectedUser && (
        <div className="w-full bg-white border rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <UserCircle className="w-16 h-16 text-blue-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold">{selectedUser.name}</h2>
              <p className="text-gray-600">@{selectedUser.username}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="flex items-center mb-1">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{selectedUser.email}</span>
              </div>
              <div className="flex items-center mb-1">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{selectedUser.phone}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-gray-500" />
                <span>{selectedUser.website}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Company Details</h3>
              <p>{selectedUser.company.name}</p>
              <p className="text-sm text-gray-600">{selectedUser.company.catchPhrase}</p>
              <p className="text-sm text-gray-600">{selectedUser.company.bs}</p>
            </div>
          </div>
          
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Activity</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Posts</p>
                <p className="font-bold">{selectedUser.posts}</p>
              </div>
              <div>
                <p className="text-gray-600">Albums</p>
                <p className="font-bold">{selectedUser.albums}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearchbar;