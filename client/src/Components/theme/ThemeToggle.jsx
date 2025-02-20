import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'react-feather';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? 
        <Moon className="w-6 h-6 text-foreground" /> : 
        <Sun className= "w-6 h-6 text-foreground" /> 
      
    }
    </button>
  );
};

export default ThemeToggle;
