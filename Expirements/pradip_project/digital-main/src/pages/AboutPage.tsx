import React, { useState } from 'react';
import { NavTab } from '../types';
import { BRAND_ASSETS, CORE_VALUES, CONTACT_INFO } from '../data/mockData';
import { Award, ShieldCheck, Sparkles, Target, ArrowRight, CheckCircle2, ChevronRight, Mail, Phone, X } from 'lucide-react';

interface AboutPageProps {
  onTabChange: (tab: NavTab) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onTabChange, onOpenConsultation }) => {
  const [showCharterModal, setShowCharterModal] = useState(false);

  return (
    <div className="w-full pt-28 pb-20">
      {/* Hero Header */}
      <section className="bg-[#0F3D59] text-white py-20 px-6 md:px-8 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#00C2E0]/20 text-[#00C2E0] text-xs font-['Inter'] font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#00C2E0]/30">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Vision & Leadership</span>
          </div>
          <h1 className="font-['Montserrat'] font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Driving <span className="text-[#00C2E0]">Digital Ascension</span>
          </h1>
          <p className="font-['Inter'] text-lg text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Apex Nova Digital was founded on the conviction that enterprise software must pair unyielding technical precision with visionary agility.
          </p>
        </div>
      </section>

      {/* CEO & Leadership Bento Showcase */}
      <section className="py-20 px-6 md:px-8 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          {/* Main CEO Profile Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
            {/* CEO Photo Column */}
            <div className="lg:col-span-5 bg-[#00273d] relative min-h-[380px] flex items-center justify-center p-6">
              <div className="relative w-full max-w-xs aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#00C2E0]/40 shadow-2xl group">
                <img
                  src={BRAND_ASSETS.ceoPhoto}
                  alt="Pradip Khadka - Founder & CEO of Apex Nova Digital"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D59]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-[#00C2E0] text-white font-['Inter'] font-semibold text-[10px] uppercase px-2.5 py-1 rounded-md block w-fit mb-1">
                    Chief Executive Officer
                  </span>
                  <p className="font-['Montserrat'] font-bold text-xl">Pradip Khadka</p>
                </div>
              </div>
            </div>

            {/* CEO Executive Statement Column */}
            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[#00C2E0] font-['Montserrat'] font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  Executive Office
                </div>
                <h2 className="font-['Montserrat'] font-bold text-3xl text-[#0F3D59] mb-4">
                  Pradip Khadka
                </h2>
                <p className="font-['Inter'] font-semibold text-sm text-[#00C2E0] mb-6">
                  Founder & CEO • Apex Nova Digital
                </p>

                <div className="space-y-4 font-['Inter'] text-slate-700 text-sm leading-relaxed">
                  <p>
                    Under Mr. Pradip Khadka's leadership, Apex Nova Digital has established itself as an authoritative force in enterprise web development, mobile solutions, and digital strategy.
                  </p>
                  <p>
                    He combines deep engineering precision with visionary business strategy, guiding growth-oriented companies through seamless digital ascension and sustainable technology modernizations.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#E2E8F0] mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs font-['Inter'] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#00C2E0]" />
                    <span>{CONTACT_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#00C2E0]" />
                    <span>{CONTACT_INFO.phone}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenConsultation}
                  className="bg-[#00C2E0] text-white font-['Inter'] font-semibold text-xs px-5 py-2.5 rounded-lg hover:bg-[#00b0cb] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Connect with CEO Pradip Khadka</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bento Grid: Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Our Mission Card */}
            <div className="md:col-span-5 bg-[#0F3D59] text-white rounded-2xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#00C2E0]/20 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-[#00C2E0]">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-2xl text-white mb-3">
                  Our Mission
                </h3>
                <p className="font-['Inter'] text-slate-300 text-sm leading-relaxed mb-6">
                  To empower growth-oriented businesses with transformative digital engineering, delivering robust web platforms, high-performance mobile apps, and technical SEO strategies that drive measurable enterprise value.
                </p>
              </div>

              <button
                onClick={() => setShowCharterModal(true)}
                className="inline-flex items-center gap-2 text-[#00C2E0] font-['Inter'] font-semibold text-sm hover:underline cursor-pointer"
              >
                <span>Read Full Corporate Charter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Core Values Columns */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CORE_VALUES.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#0F3D59]/10 text-[#00C2E0] flex items-center justify-center mb-4">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-['Montserrat'] font-bold text-base text-[#0F3D59] mb-2">
                      {val.title}
                    </h4>
                    <p className="font-['Inter'] text-xs text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Philosophy */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 md:p-12 shadow-sm">
            <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59] mb-6 text-center">
              Our Architectural Philosophy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="font-['Montserrat'] font-bold text-lg text-[#00C2E0] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>01. Uncompromising Quality</span>
                </div>
                <p className="font-['Inter'] text-xs text-slate-600 leading-relaxed">
                  We write type-safe, maintainable TypeScript code with strict linting, robust testing, and clean modular boundaries.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-['Montserrat'] font-bold text-lg text-[#00C2E0] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>02. Scalable Cloud First</span>
                </div>
                <p className="font-['Inter'] text-xs text-slate-600 leading-relaxed">
                  Engineered from day one for sub-second responses, auto-scaling concurrency, and multi-tier caching architectures.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-['Montserrat'] font-bold text-lg text-[#00C2E0] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>03. Client Partnership</span>
                </div>
                <p className="font-['Inter'] text-xs text-slate-600 leading-relaxed">
                  Direct access to engineering leads and executive oversight from CEO Pradip Khadka throughout the project lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Charter Modal */}
      {showCharterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-xl w-full border border-[#E2E8F0] shadow-2xl relative">
            <button
              onClick={() => setShowCharterModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-[#00C2E0] font-['Montserrat'] font-bold text-xs uppercase mb-2">
              <Target className="w-4 h-4" />
              Official Corporate Charter
            </div>
            <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59] mb-4">
              Apex Nova Digital Mandate
            </h3>
            <div className="font-['Inter'] text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                Apex Nova Digital operates as an elite software engineering organization dedicated to technological supremacy and executive integrity.
              </p>
              <p>
                Under CEO Pradip Khadka, we guarantee that every software deployment adheres to zero-trust security standards, high-throughput efficiency, and total IP ownership for our enterprise partners.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex justify-end">
              <button
                onClick={() => setShowCharterModal(false)}
                className="bg-[#0F3D59] text-white px-6 py-2.5 rounded-lg text-sm font-['Inter'] font-semibold hover:bg-[#00273d]"
              >
                Close Charter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
