import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ChevronDown, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isLanding: boolean;
  isLoggedIn: boolean;
  onLoginClick?: () => void;
  onLogout?: () => void;
  onNavClick?: (section: string) => void;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  isLanding,
  isLoggedIn,
  onLoginClick,
  onLogout,
  onNavClick,
  userName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      applyTheme(savedTheme === 'dark');
    }
  }, []);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.remove('light-mode');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#FFFFFF';
    } else {
      document.documentElement.classList.add('light-mode');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#1E293B';
    }
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    applyTheme(newMode);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Features', id: 'features' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Testimonials', id: 'testimonials' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-dark-primary/80 border-b border-border-muted shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer transition-smooth">
            <div className="p-2 bg-gradient-to-br from-accent-teal to-accent-teal-hover rounded-lg transform group-hover:scale-110 transition-smooth">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text-dark">EcoFeast</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isLanding && navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-text-muted hover:text-accent-teal font-medium transition-smooth rounded-lg hover:bg-dark-tertiary/50"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLanding ? (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-6 py-2 text-white font-semibold hover:bg-dark-tertiary rounded-lg transition-smooth border border-border-muted"
                >
                  Sign In
                </button>
                <button
                  onClick={onLoginClick}
                  className="px-6 py-2 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white font-semibold rounded-lg hover-lift shadow-lg shadow-accent-teal/20"
                >
                  Get Started
                </button>
              </>
            ) : isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-muted">Welcome, <span className="font-semibold text-white">{userName}</span></span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-text-muted hover:text-white font-medium transition-smooth rounded-lg hover:bg-dark-tertiary"
                >
                  Sign Out
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-dark-tertiary transition-smooth border border-border-muted"
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDarkMode ? (
                    <Sun size={18} className="text-yellow-400" />
                  ) : (
                    <Moon size={18} className="text-blue-400" />
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white font-semibold rounded-lg hover-lift shadow-lg shadow-accent-teal/20"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-dark-tertiary rounded-lg transition-smooth border border-border-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in-down">
            {isLanding && (
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-text-muted hover:text-accent-teal hover:bg-dark-tertiary/50 rounded-lg font-medium"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-border-muted pt-2 mt-2 space-y-2">
                  <button
                    onClick={onLoginClick}
                    className="block w-full text-left px-4 py-2 text-white font-semibold"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onLoginClick}
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white font-semibold rounded-lg shadow-lg shadow-accent-teal/20"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
