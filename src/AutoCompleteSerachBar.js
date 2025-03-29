// import React, { useEffect, useState, useCallback } from 'react';

// const App = () => {
//   const [results, setResults] = useState([]);
//   const [input, setInput] = useState("");
//   const [showResults, setShowResults] = useState(false);
//   const [cache, setCache] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = useCallback(async () => {
//     if (!input.trim()) {
//       setResults([]);
//       return;
//     }

//     if (cache[input]) {
//       setResults(cache[input]);
//       console.log("CACHE RETURNED", input);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     console.log("API CALL", input);

//     try {
//       const data = await fetch(`https://dummyjson.com/recipes/search?q=${encodeURIComponent(input)}`);
      
//       if (!data.ok) {
//         throw new Error(`HTTP error! Status: ${data.status}`);
//       }
      
//       const json = await data.json();
//       setResults(json?.recipes || []);
//       setCache(prev => ({...prev, [input]: json?.recipes || []}));
//     } catch (err) {
//       console.error("Error fetching recipes:", err);
//       setError("Failed to fetch recipes. Please try again.");
//       setResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [input, cache]);

//   useEffect(() => {
//     const timer = setTimeout(fetchData, 300);
    
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [fetchData]);

//   const handleBlur = () => {
//     // Small delay to allow clicks on results to register
//     setTimeout(() => setShowResults(false), 200);
//   };

//   return (
//     <div className="App">
//       <h1>Autocomplete Search Bar</h1>
//       <div>
//         <input
//           type="text"
//           className="search-input"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onFocus={() => setShowResults(true)}
//           onBlur={handleBlur}
//           placeholder="Search for recipes..."
//         />
//       </div>

//       {showResults && (
//         <div className="results-container">
//           {isLoading && <div className="loading">Loading...</div>}
//           {error && <div className="error">{error}</div>}
//           {!isLoading && !error && results.length === 0 && input.trim() !== "" && (
//             <div className="no-results">No recipes found</div>
//           )}
//           {results.map((r) => (
//             <div 
//               className="results"
//               key={r.id}
//               onClick={() => {
//                 setInput(r.name);
//                 setShowResults(false);
//               }}
//             >
//               {r.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export default function AutocompleteSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [cache, setCache] = useState({});
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Debounced search function
  const fetchResults = useCallback(
    async (searchTerm) => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      // Check cache first
      if (cache[searchTerm]) {
        setResults(cache[searchTerm]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const recipes = data?.recipes || [];
        
        // Update cache
        setCache((prev) => ({ ...prev, [searchTerm]: recipes }));
        setResults(recipes);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to load results. Please try again.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [cache]
  );

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchResults]);

  // Handle clicks outside the component
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;
    
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    }
    // Up arrow
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
    // Enter key
    else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (results[selectedIndex]) {
        setQuery(results[selectedIndex].name);
        setIsOpen(false);
        inputRef.current.blur ();
      }
    }
    // Escape key
    else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Select a result
  const selectResult = (result) => {
    setQuery(result.name);
    setIsOpen(false);
    inputRef.current.blur();
  };

  // Clear the input
  const clearInput = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    inputRef.current.focus();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Recipe Search</h1>
      
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for recipes..."
            className="w-full p-4 pl-10 pr-12 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
          {query && (
            <button 
              onClick={clearInput}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Results Dropdown */}
        {isOpen && (
          <div 
            ref={resultsRef}
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex justify-center items-center p-4 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Searching...</span>
              </div>
            ) : error ? (
              <div className="p-4 text-red-500 text-center">{error}</div>
            ) : results.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">
                {query.trim() ? "No recipes found" : "Start typing to search"}
              </div>
            ) : (
              <ul className="py-2">
                {results.map((result, index) => (
                  <li 
                    key={result.id}
                    onClick={() => selectResult(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`px-4 py-2 cursor-pointer flex items-center ${
                      selectedIndex === index
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{result.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {result.tags?.slice(0, 3).join(", ")}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}