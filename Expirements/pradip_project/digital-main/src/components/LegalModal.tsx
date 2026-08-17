import React from 'react';
import { X, ShieldCheck, FileText, Cookie, HelpCircle, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'cookie' | 'support' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const titleMap = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookie: 'Cookie Policy',
    support: 'Enterprise Support',
  };

  const iconMap = {
    privacy: <ShieldCheck className="w-5 h-5 text-[#00C2E0]" />,
    terms: <FileText className="w-5 h-5 text-[#00C2E0]" />,
    cookie: <Cookie className="w-5 h-5 text-[#00C2E0]" />,
    support: <HelpCircle className="w-5 h-5 text-[#00C2E0]" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative my-8 text-[#191c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0F3D59] text-white p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            {iconMap[type]}
            <h3 className="font-['Montserrat'] font-bold text-xl">{titleMap[type]}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto font-['Inter'] text-sm text-slate-700 leading-relaxed space-y-4">
          {type === 'privacy' && (
            <>
              <p className="font-medium text-[#0F3D59]">
                Effective Date: January 1, 2024 • Apex Nova Digital
              </p>
              <p>
                At Apex Nova Digital, we respect your confidentiality and data privacy. This policy details how we handle information collected across our web platforms and client software environments.
              </p>
              <h4 className="font-['Montserrat'] font-semibold text-base text-[#0F3D59] pt-2">
                1. Data Collection & Processing
              </h4>
              <p>
                We only collect corporate consultation inputs, business emails, and technical specifications provided willingly through our contact channels. We never sell, lease, or monetize client project information.
              </p>
              <h4 className="font-['Montserrat'] font-semibold text-base text-[#0F3D59] pt-2">
                2. Enterprise Encryption Standards
              </h4>
              <p>
                All transmitted consultation inquiries and technical credentials utilize TLS 1.3 encryption at rest and in transit.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p className="font-medium text-[#0F3D59]">
                Terms & Conditions of Service • Apex Nova Digital
              </p>
              <p>
                By engaging Apex Nova Digital for web platforms, mobile software engineering, custom architecture, or technical SEO, you agree to the following terms:
              </p>
              <h4 className="font-['Montserrat'] font-semibold text-base text-[#0F3D59] pt-2">
                1. Intellectual Property
              </h4>
              <p>
                Upon project completion and final settlement, all custom source code, documentation, and technical architecture specifications belong 100% to the client.
              </p>
              <h4 className="font-['Montserrat'] font-semibold text-base text-[#0F3D59] pt-2">
                2. Service Level Guarantees
              </h4>
              <p>
                Our production environments operate under a 99.99% uptime target with dedicated SLA response frameworks for critical enterprise software deployments.
              </p>
            </>
          )}

          {type === 'cookie' && (
            <>
              <p className="font-medium text-[#0F3D59]">
                Cookie & Storage Policy
              </p>
              <p>
                Apex Nova Digital uses strictly essential cookies and local session states to maintain navigation state, accessibility settings, and secure form submissions.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Essential Session State: Remembers navigation tabs and open modals</li>
                <li>Performance Metrics: Anonymous speed and load diagnostic tracking</li>
              </ul>
            </>
          )}

          {type === 'support' && (
            <>
              <p className="font-medium text-[#0F3D59]">
                24/7 Apex Nova Digital Enterprise Support Desk
              </p>
              <p>
                Active enterprise platform clients receive dedicated SLA monitoring and rapid technical dispatch from our engineering team.
              </p>
              <div className="bg-[#f7f9fb] p-4 border border-[#E2E8F0] rounded-xl space-y-3 font-medium text-[#0F3D59]">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#00C2E0]" />
                  <span>Direct Hotline: {CONTACT_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#00C2E0]" />
                  <span>Support Email: {CONTACT_INFO.email}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-[#f2f4f6] border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0F3D59] text-white font-['Inter'] font-semibold text-sm rounded-lg hover:bg-[#00273d] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
