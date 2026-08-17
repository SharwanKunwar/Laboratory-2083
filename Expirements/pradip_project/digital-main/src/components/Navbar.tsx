import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { BRAND_ASSETS } from '../data/mockData';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenConsultation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { tab: NavTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'services', label: 'Services' },
    { tab: 'calculator', label: 'Cost Estimator' },
    { tab: 'about', label: 'About' },
    { tab: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onTabChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-[#00C2E0]/50 rounded-lg p-1 transition-all cursor-pointer"
        >
          <img
            src={BRAND_ASSETS.logo}
            alt="Apex Nova Digital Logo"
            className="h-11 w-11 md:h-12 md:w-12 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-['Montserrat'] font-bold text-xl md:text-2xl text-[#0F3D59] tracking-tight">
            Apex Nova <span className="text-[#00C2E0]">Digital</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => {
                  onTabChange(item.tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-['Inter'] font-semibold text-sm transition-all duration-200 relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#00C2E0]'
                    : 'text-[#0F3D59] hover:text-[#00C2E0]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C2E0] rounded-full animate-in fade-in zoom-in-50 duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="bg-[#00C2E0] text-white font-['Inter'] font-semibold text-sm py-2.5 px-6 rounded-md hover:bg-[#00b0cb] hover:shadow-[0_8px_20px_rgba(0,194,224,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 group min-w-[160px] justify-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            <span>Get a Consultation</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#0F3D59] p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  onTabChange(item.tab);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left font-['Inter'] font-semibold text-base py-2.5 px-4 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                  currentTab === item.tab
                    ? 'bg-[#00C2E0]/10 text-[#00C2E0]'
                    : 'text-[#0F3D59] hover:bg-slate-50 hover:text-[#00C2E0]'
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.tab && (
                  <span className="w-2 h-2 rounded-full bg-[#00C2E0]" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#00C2E0] text-white font-['Inter'] font-semibold py-3 px-6 rounded-md hover:bg-[#00b0cb] transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get a Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
