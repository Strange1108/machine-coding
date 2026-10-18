import React, { useState, useEffect, useRef } from "react";

export default function AutocompleteSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Use ref for cache so updating it doesn't re-trigger effects
  const cacheRef = useRef({});
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounced fetch with AbortController to prevent race conditions
  useEffect(() => {
    const trimmed = query.trim();

    // Reset immediately if input is empty
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Check in-memory cache first
    if (cacheRef.current[trimmed]) {
      setResults(cacheRef.current[trimmed]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://dummyjson.com/recipes/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const items = data.recipes || [];

        cacheRef.current[trimmed] = items;
        setResults(items);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch results");
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort(); // Cancel pending network request
    };
  }, [query]);

  // Click outside to dismiss
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Scroll active item into view when navigating with keyboard
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const activeItem = dropdownRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      activeItem?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      if (results[selectedIndex]) {
        selectItem(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const selectItem = (item) => {
    setQuery(item.name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={containerRef} style={{ width: "320px", margin: "40px auto", position: "relative" }}>
      <input
        type="text"
        value={query}
        placeholder="Search recipes..."
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedIndex(-1); // Reset selected index on query change
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        style={{ width: "100%", padding: "8px 12px", boxSizing: "border-box" }}
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            background: "#fff",
            maxHeight: "220px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {isLoading && <div style={{ padding: "8px" }}>Loading...</div>}
          {error && <div style={{ padding: "8px", color: "red" }}>{error}</div>}
          {!isLoading && !error && results.length === 0 && query.trim() && (
            <div style={{ padding: "8px" }}>No results found</div>
          )}

          {!isLoading &&
            results.map((item, index) => (
              <div
                key={item.id}
                data-index={index}
                onClick={() => selectItem(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background: selectedIndex === index ? "#eef2ff" : "#fff",
                }}
              >
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
