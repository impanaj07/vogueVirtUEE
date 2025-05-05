import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ShirtIcon, MenuIcon, X, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShirtIcon className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              StyleAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/wardrobe" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  My Wardrobe
                </Link>
              </>
            ) : null}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center">
                <div className="group relative">
                  <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <User className="w-5 h-5 text-gray-700" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      </div>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Dashboard
                      </Link>
                      <Link to="/wardrobe" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Wardrobe
                      </Link>
                      <Link to="/style-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Style Profile
                      </Link>
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen bg-white shadow-md' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <nav className="flex flex-col space-y-3 pb-4">
            <Link to="/" className="text-gray-700 py-2 border-b border-gray-100">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 py-2 border-b border-gray-100">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 py-2 border-b border-gray-100">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 py-2 border-b border-gray-100">
                  Dashboard
                </Link>
                <Link to="/wardrobe" className="text-gray-700 py-2 border-b border-gray-100">
                  My Wardrobe
                </Link>
                <Link to="/style-profile" className="text-gray-700 py-2 border-b border-gray-100">
                  Style Profile
                </Link>
                <button 
                  onClick={logout}
                  className="text-red-600 py-2 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link 
                  to="/signin" 
                  className="bg-transparent border border-indigo-600 text-indigo-600 text-center py-2 px-4 rounded-md"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 text-white text-center py-2 px-4 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;