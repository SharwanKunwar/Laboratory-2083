import React, { useState } from 'react';
import { NavTab } from '../types';
import { SERVICES_DATA } from '../data/mockData';
import { Code, Smartphone, Search, Terminal, CheckCircle2, ArrowRight, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onTabChange: (tab: NavTab) => void;
  onOpenConsultationWithInquiry: (inquiryType: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onTabChange,
  onOpenConsultationWithInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Interactive Scope Estimator State
  const [estType, setEstType] = useState('web');
  const [estScale, setEstScale] = useState('enterprise');
  const [estSla, setEstSla] = useState(true);

  const categories = ['All', 'Web Engineering', 'Mobile Engineering', 'Digital Strategy', 'Enterprise Solutions'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'web':
        return <Code className="w-6 h-6 text-[#00C2E0]" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-[#00C2E0]" />;
      case 'search_insights':
        return <Search className="w-6 h-6 text-[#00C2E0]" />;
      default:
        return <Terminal className="w-6 h-6 text-[#00C2E0]" />;
    }
  };

  // Calculate scope estimate
  const calculateEstimate = () => {
    let weeks = 6;
    if (estType === 'mobile') weeks += 2;
    if (estType === 'enterprise') weeks += 4;
    if (estScale === 'startup') weeks -= 2;
    if (estScale === 'global') weeks += 3;
    if (estSla) weeks += 1;
    return `${weeks} - ${weeks + 3} Weeks`;
  };

  return (
    <div className="w-full pt-28 pb-20">
      {/* Hero Header */}
      <section className="bg-[#0F3D59] text-white py-20 px-6 md:px-8 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#00C2E0]/20 text-[#00C2E0] text-xs font-['Inter'] font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#00C2E0]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Software & Strategy</span>
          </div>
          <h1 className="font-['Montserrat'] font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Our Core <span className="text-[#00C2E0]">Services</span>
          </h1>
          <p className="font-['Inter'] text-lg text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            We engineer scalable, high-performance digital solutions designed to accelerate your business growth and establish lasting competitive advantages.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-['Inter'] font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00C2E0] text-white shadow-md'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services List */}
      <section className="py-20 px-6 md:px-8 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0F3D59]/10 flex items-center justify-center shrink-0">
                      {getIcon(service.icon)}
                    </div>
                    <span className="font-['Inter'] font-semibold text-xs text-[#00C2E0] bg-[#00C2E0]/10 px-3 py-1 rounded-full border border-[#00C2E0]/20">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59] mb-3">
                    {service.title}
                  </h3>
                  <p className="font-['Inter'] text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 space-y-2">
                    <span className="font-['Montserrat'] font-semibold text-xs text-[#0F3D59] uppercase tracking-wider block mb-2">
                      Key Capabilities:
                    </span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-['Inter']">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2E0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <span className="font-['Montserrat'] font-semibold text-xs text-[#0F3D59] uppercase tracking-wider block mb-2">
                      Core Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((del, idx) => (
                        <span
                          key={idx}
                          className="bg-[#f2f4f6] text-slate-700 font-['Inter'] text-xs font-medium px-2.5 py-1 rounded-md border border-[#E2E8F0]"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Tags & Action */}
                <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-['Inter'] font-semibold text-[11px] text-[#0F3D59] bg-[#0F3D59]/5 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenConsultationWithInquiry(service.title)}
                    className="w-full sm:w-auto bg-[#0F3D59] text-white hover:bg-[#00C2E0] font-['Inter'] font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>Inquire Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Estimator Tool */}
      <section className="py-20 px-6 md:px-8 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto bg-[#0F3D59] text-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-3 text-[#00C2E0] mb-2 font-['Montserrat'] font-bold text-sm uppercase tracking-wider">
            <Sliders className="w-5 h-5" />
            <span>Interactive Scope Calculator</span>
          </div>
          <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-white mb-3">
            Estimate Your Project Timeline
          </h2>
          <p className="font-['Inter'] text-slate-300 text-sm mb-8">
            Select your architectural goals and scale requirements to calculate target engineering cycles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-2 font-['Inter']">
                Solution Domain
              </label>
              <select
                value={estType}
                onChange={(e) => setEstType(e.target.value)}
                className="w-full bg-[#00273d] text-white border border-white/20 rounded-lg p-3 text-sm font-['Inter'] focus:outline-none focus:border-[#00C2E0]"
              >
                <option value="web">Web Platform (React/Next.js)</option>
                <option value="mobile">Mobile Application (iOS/Android)</option>
                <option value="enterprise">Custom Microservices Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-2 font-['Inter']">
                Deployment Scale
              </label>
              <select
                value={estScale}
                onChange={(e) => setEstScale(e.target.value)}
                className="w-full bg-[#00273d] text-white border border-white/20 rounded-lg p-3 text-sm font-['Inter'] focus:outline-none focus:border-[#00C2E0]"
              >
                <option value="startup">Growth MVP (Fast Track)</option>
                <option value="enterprise">Enterprise Scaled Platform</option>
                <option value="global">Global Multi-Region High Availability</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-2 font-['Inter']">
                SLA & Security Audit
              </label>
              <button
                type="button"
                onClick={() => setEstSla(!estSla)}
                className={`w-full p-3 rounded-lg border text-sm font-['Inter'] font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  estSla
                    ? 'bg-[#00C2E0] border-[#00C2E0] text-white'
                    : 'bg-[#00273d] border-white/20 text-slate-300'
                }`}
              >
                <span>{estSla ? 'Included (SOC2/OWASP)' : 'Standard Build'}</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-[#00273d] p-6 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase text-slate-400 font-['Inter'] font-semibold block">
                Estimated Sprint Cycle Duration
              </span>
              <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#00C2E0]">
                {calculateEstimate()}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  onTabChange('calculator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#00C2E0] text-white font-['Inter'] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#00b0cb] transition-colors flex items-center gap-2 cursor-pointer shrink-0 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Interactive Cost Calculator</span>
              </button>
              <button
                onClick={() => onOpenConsultationWithInquiry('Custom Scope Calculation')}
                className="border border-white/30 text-white font-['Inter'] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Get Detailed Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Module */}
      <section className="py-16 px-6 md:px-8 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#0F3D59] mb-4">
            Ready to transform your digital presence?
          </h2>
          <p className="font-['Inter'] text-slate-600 mb-6 text-sm max-w-xl mx-auto">
            Contact Apex Nova Digital to discuss your custom project requirements directly with our technical leads.
          </p>
          <button
            onClick={() => onOpenConsultationWithInquiry('General Digital Transformation')}
            className="bg-[#00C2E0] text-white font-['Inter'] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#00b0cb] transition-colors shadow-lg cursor-pointer"
          >
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
};
