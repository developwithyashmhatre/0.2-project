import React, { useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '../store/theme';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function applyTheme() {
      const isDark = 
        theme === 'dark' || 
        (theme === 'system' && mediaQuery.matches);
      
      document.documentElement.classList.toggle('dark', isDark);
    }

    // Initial theme application
    applyTheme();

    // Listen for system theme changes
    mediaQuery.addEventListener('change', applyTheme);

    // Listen for keyboard shortcuts
    function handleKeyPress(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }
    }
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [theme, setTheme]);

  return (
    <div className="relative group">
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        title="Toggle theme (Ctrl+Shift+L)"
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5" />
        ) : theme === 'dark' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Monitor className="w-5 h-5" />
        )}
      </button>
      
      <div className="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {[
          { value: 'light', label: 'Light', icon: Sun },
          { value: 'dark', label: 'Dark', icon: Moon },
          { value: 'system', label: 'System', icon: Monitor },
        ].map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value as 'light' | 'dark' | 'system')}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
              theme === value
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}