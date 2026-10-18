import React, { useEffect, useState } from 'react';
import './DarkModeToggle.css';

function DarkModeToggle() {
  // Initialize state (persists with localStorage using useEffect)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  // Persist theme choice across reloads (uses the imported useEffect)
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h1>Dark Mode Toggle</h1>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <span className="mode-text">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
    </div>
  );
}

export default DarkModeToggle;
