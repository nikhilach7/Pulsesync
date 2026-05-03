import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    colors: {
      // Background colors
      bgPrimary: 'bg-white',
      bgSecondary: 'bg-gray-50',
      bgTertiary: 'bg-gray-100',
      bgCard: 'bg-white',
      
      // Text colors
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textTertiary: 'text-gray-600',
      textMuted: 'text-gray-500',
      textInverse: 'text-white',
      
      // Border colors
      borderPrimary: 'border-gray-200',
      borderSecondary: 'border-gray-300',
      borderFocus: 'border-blue-500',
      
      // Brand colors
      brandPrimary: 'bg-blue-600',
      brandPrimaryHover: 'hover:bg-blue-700',
      brandSecondary: 'bg-gray-800',
      brandSecondaryHover: 'hover:bg-gray-900',
      
      // Status colors
      success: 'bg-green-50 text-green-800 border-green-200',
      warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      error: 'bg-red-50 text-red-800 border-red-200',
      info: 'bg-blue-50 text-blue-800 border-blue-200',
      
      // Shadow colors
      shadow: 'shadow-sm',
      shadowHover: 'shadow-md',
    },
    gradient: 'from-blue-50 to-indigo-100',
  },
  dark: {
    name: 'dark',
    colors: {
      // Background colors
      bgPrimary: 'bg-gray-900',
      bgSecondary: 'bg-gray-800',
      bgTertiary: 'bg-gray-700',
      bgCard: 'bg-gray-800',
      
      // Text colors
      textPrimary: 'text-gray-100',
      textSecondary: 'text-gray-300',
      textTertiary: 'text-gray-400',
      textMuted: 'text-gray-500',
      textInverse: 'text-gray-900',
      
      // Border colors
      borderPrimary: 'border-gray-700',
      borderSecondary: 'border-gray-600',
      borderFocus: 'border-blue-400',
      
      // Brand colors
      brandPrimary: 'bg-blue-600',
      brandPrimaryHover: 'hover:bg-blue-700',
      brandSecondary: 'bg-gray-700',
      brandSecondaryHover: 'hover:bg-gray-600',
      
      // Status colors
      success: 'bg-green-900 text-green-200 border-green-700',
      warning: 'bg-yellow-900 text-yellow-200 border-yellow-700',
      error: 'bg-red-900 text-red-200 border-red-700',
      info: 'bg-blue-900 text-blue-200 border-blue-700',
      
      // Shadow colors
      shadow: 'shadow-lg shadow-gray-900/50',
      shadowHover: 'shadow-xl shadow-gray-900/70',
    },
    gradient: 'from-gray-800 to-gray-900',
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or default to light
    const saved = localStorage.getItem('ims_theme');
    if (saved && themes[saved]) {
      return saved;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('ims_theme', theme);
    
    // Update document class for Tailwind dark mode
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
