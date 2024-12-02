import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Upload, Bell, User as UserIcon, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useSidebarStore } from '../store/sidebar';
import { VideoUpload } from './VideoUpload';
import { ThemeToggle } from './ThemeToggle';
import { auth } from '../lib/firebase';

export function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const [showUpload, setShowUpload] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-1">
              <span className="text-xl font-semibold">YourTube</span>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => setShowUpload(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <Upload className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <Bell className="w-6 h-6" />
                </button>
                <ThemeToggle />
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="relative"
                  >
                    <img
                      src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 transition-colors">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Your Channel</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          auth.signOut();
                          navigate('/');
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-blue-600 border border-blue-600 rounded-full px-4 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Sign in</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {showUpload && <VideoUpload onClose={() => setShowUpload(false)} />}
    </>
  );
}