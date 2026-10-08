import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenResume: () => void;
}

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Skills', to: '/skills' },
  { name: 'Projects', to: '/projects' },
  { name: 'Experience', to: '/experience' },
  { name: 'Contact', to: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  setIsDarkMode,
  onOpenResume
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile drawer whenever the route changes (i.e. a link was tapped)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isLinkActive = (to: string) => location.pathname === to;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDarkMode
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-purple-950/10'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-2.5">
            <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hamza<span className={isDarkMode ? 'text-slate-100' : 'text-slate-900'}>.</span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-blue-600 dark:text-indigo-400 uppercase bg-blue-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full border border-blue-100 dark:border-indigo-800/50">
              AI Engineer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-1 rounded-full p-1.5 border backdrop-blur-xl ${
            isDarkMode 
              ? 'border-slate-800/80 bg-slate-900/60 shadow-lg' 
              : 'border-slate-200/80 bg-white/70 shadow-sm'
          }`}>
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.to);
              return (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-white'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className={`absolute inset-0 rounded-full ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/40'
                          : 'bg-white shadow-sm border border-slate-200/80'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions Right */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full transition-all border ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume / Download CV Button */}
            <button
              onClick={onOpenResume}
              className="px-5 py-2 bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-lg hover:scale-[1.03] active:scale-[0.98] flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme Mobile"
              className={`p-2 rounded-xl border ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className={`p-2 rounded-xl border ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-200'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-b px-4 pt-2 pb-6 ${
              isDarkMode
                ? 'bg-slate-950/95 border-slate-800 text-slate-200'
                : 'bg-white/95 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isLinkActive(link.to)
                      ? 'bg-purple-600/10 text-purple-400 font-semibold border border-purple-500/20'
                      : isDarkMode
                      ? 'hover:bg-slate-900'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center space-x-2 text-sm font-semibold px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25"
                >
                  <FileText className="w-4 h-4" />
                  <span>View / Download CV</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
