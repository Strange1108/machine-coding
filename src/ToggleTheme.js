import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <ThemeProvider>
      <Layout currentPage={currentPage} navigateTo={navigateTo} />
    </ThemeProvider>
  );
};

const Layout = ({ currentPage, navigateTo }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <nav className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow  `}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Theme Demo</h1>
          <div className="flex gap-6">
            <button 
              onClick={() => navigateTo('home')} 
              className={`hover:underline ${currentPage === 'home' ? 'font-bold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('about')} 
              className={`hover:underline ${currentPage === 'about' ? 'font-bold' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => navigateTo('settings')} 
              className={`hover:underline ${currentPage === 'settings' ? 'font-bold' : ''}`}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>
      
      <div className="p-6 max-w-6xl mx-auto">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </div>
    </div>
  );
};

  // Home page
  const HomePage = () => {
    const { theme } = useTheme();
    
    return (
      <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Home Page</h2>
        <p className="mb-4">Welcome to our multi-page theme demonstration.</p>
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <p>This content adapts to your theme preference across all pages.</p>
        </div>
      </div>
    );
  };

  // About page
  const AboutPage = () => {
    const { theme } = useTheme();
    
    return (
      <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">About Page</h2>
        <p className="mb-4">This is the about page with theme consistency.</p>
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <p>Notice how the theme persists as you navigate between pages.</p>
        </div>
      </div>
    );
  };

  // Settings page with theme toggle
  const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();
    
    return (
      <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Settings Page</h2>
        <p className="mb-6">
          Current theme: <span className="font-semibold">{theme}</span>
        </p>
        
        <button 
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    );
  };

  export default App;