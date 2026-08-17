import React from 'react';
import { NavTab } from '../types';
import { BRAND_ASSETS, CONTACT_INFO } from '../data/mockData';
import { Phone, Mail, ShieldCheck, FileText, Cookie, HelpCircle } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: NavTab) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookie' | 'support') => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onTabChange,
  onOpenLegal,
  onOpenConsultation,
}) => {
  return (
    <footer className="bg-[#00273d] border-t border-white/10 text-white pt-16 pb-12 px-6 md:px-8 mt-auto">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_ASSETS.logo}
                alt="Apex Nova Digital"
                className="h-11 w-11 object-contain drop-shadow-md"
              />
              <span className="font-['Montserrat'] font-bold text-2xl tracking-tight text-white">
                Apex Nova <span className="text-[#00C2E0]">Digital</span>
              </span>
            </div>
            <p className="font-['Inter'] text-sm text-slate-300 max-w-md leading-relaxed">
              Architecting high-performance enterprise software, intuitive web platforms, and custom digital solutions designed to accelerate growth and establish market authority.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-sm text-slate-300 font-['Inter']">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00C2E0]" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#00C2E0] transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00C2E0]" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#00C2E0] transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-['Montserrat'] font-semibold text-sm uppercase tracking-wider text-[#00C2E0]">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 font-['Inter'] text-sm text-slate-300">
              <button
                onClick={() => {
                  onTabChange('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left hover:text-[#00C2E0] transition-colors py-0.5"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onTabChange('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left hover:text-[#00C2E0] transition-colors py-0.5"
              >
                Our Services
              </button>
              <button
                onClick={() => {
                  onTabChange('calculator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left hover:text-[#00C2E0] transition-colors py-0.5"
              >
                Website Cost Estimator
              </button>
              <button
                onClick={() => {
                  onTabChange('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left hover:text-[#00C2E0] transition-colors py-0.5"
              >
                Leadership & About Us
              </button>
              <button
                onClick={() => {
                  onTabChange('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left hover:text-[#00C2E0] transition-colors py-0.5"
              >
                Contact & Location
              </button>
              <button
                onClick={onOpenConsultation}
                className="text-left text-[#00C2E0] hover:underline transition-all py-0.5 font-medium"
              >
                Schedule Consultation →
              </button>
            </div>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-['Montserrat'] font-semibold text-sm uppercase tracking-wider text-[#00C2E0]">
              Governance & Support
            </h4>
            <div className="grid grid-cols-2 gap-3 font-['Inter'] text-sm text-slate-300">
              <button
                onClick={() => onOpenLegal('privacy')}
                className="flex items-center gap-2 text-left hover:text-[#00C2E0] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#00C2E0]" />
                <span>Privacy Policy</span>
              </button>
              <button
                onClick={() => onOpenLegal('terms')}
                className="flex items-center gap-2 text-left hover:text-[#00C2E0] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#00C2E0]" />
                <span>Terms of Service</span>
              </button>
              <button
                onClick={() => onOpenLegal('cookie')}
                className="flex items-center gap-2 text-left hover:text-[#00C2E0] transition-colors"
              >
                <Cookie className="w-4 h-4 text-[#00C2E0]" />
                <span>Cookie Policy</span>
              </button>
              <button
                onClick={() => onOpenLegal('support')}
                className="flex items-center gap-2 text-left hover:text-[#00C2E0] transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#00C2E0]" />
                <span>Enterprise Support</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-['Inter'] text-slate-400">
          <p>© 2024 Apex Nova Digital. All rights reserved.</p>
          <p className="text-slate-400">
            Founded by CEO <span className="text-slate-200 font-semibold">Pradip Khadka</span> • Kathmandu, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};
