import React, { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenLogin: (role?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenLogin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Attend<span className="text-indigo-400">X</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                College Live System
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#demo-live" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              Live Demo
            </a>
            <a href="#roles" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              Portals
            </a>
            <a href="#security" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              Security
            </a>
            <a href="#analytics" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              Analytics
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => onOpenLogin()}
              className="text-sm font-semibold text-slate-200 hover:text-white px-4 py-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-all"
            >
              Portal Login
            </button>
            <button
              onClick={onOpenDemo}
              className="btn btn-primary"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-slate-800/80 bg-slate-950/95 rounded-2xl p-4 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 py-2 hover:text-indigo-400 font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 py-2 hover:text-indigo-400 font-medium"
            >
              How It Works
            </a>
            <a
              href="#demo-live"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 py-2 hover:text-indigo-400 font-medium"
            >
              Live Demo
            </a>
            <a
              href="#roles"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 py-2 hover:text-indigo-400 font-medium"
            >
              Role Portals
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 py-2 hover:text-indigo-400 font-medium"
            >
              Security
            </a>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full text-center py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 font-semibold"
              >
                Portal Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full btn btn-primary py-2.5"
              >
                Request a Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
