import React from 'react';
import { NavTab } from '../types';
import { BRAND_ASSETS, STATS_DATA, FAQ_DATA } from '../data/mockData';
import { Rocket, ArrowRight, Code, Smartphone, Search, Terminal, Sparkles, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

interface HomePageProps {
  onTabChange: (tab: NavTab) => void;
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onTabChange, onOpenConsultation }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-8 bg-[#0F3D59] text-white min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: `url('${BRAND_ASSETS.patternBg}')` }}
        />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#00C2E0]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-[#00C2E0]/15 text-[#00C2E0] px-4 py-1.5 rounded-full w-fit border border-[#00C2E0]/30">
              <Rocket className="w-4 h-4" />
              <span className="font-['Inter'] font-semibold text-xs tracking-wider uppercase">
                Digital Ascension & Authority
              </span>
            </div>

            <h1 className="font-['Montserrat'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              Building Digital Experiences That <span className="text-[#00C2E0]">Move Your Business Forward</span>
            </h1>

            <p className="font-['Inter'] text-lg text-slate-300 max-w-2xl leading-relaxed">
              We architect high-performance software, intuitive web platforms, and mobile solutions designed to accelerate growth and establish market authority.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  onTabChange('calculator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#00C2E0] text-white font-['Inter'] font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-[#00b0cb] transition-all duration-200 shadow-lg hover:shadow-[0_10px_25px_rgba(0,194,224,0.3)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Website Cost</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-white/30 text-white font-['Inter'] font-semibold text-sm px-6 py-3.5 rounded-md hover:border-[#00C2E0] hover:text-[#00C2E0] transition-all duration-200 backdrop-blur-sm cursor-pointer"
              >
                <span>Explore Services</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="border border-white/30 text-white font-['Inter'] font-semibold text-sm px-6 py-3.5 rounded-md hover:border-[#00C2E0] hover:text-[#00C2E0] transition-all duration-200 backdrop-blur-sm cursor-pointer"
              >
                Talk to an Expert
              </button>
            </div>
          </div>

          {/* Hero Dashboard Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square bg-[#0f3d59]/80 rounded-2xl p-2 border border-white/20 shadow-2xl overflow-hidden group">
              <img
                src={BRAND_ASSETS.dashboardHero}
                alt="Apex Nova Digital Analytics Dashboard"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00273d]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0F3D59]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white flex items-center justify-between">
                <div>
                  <p className="font-['Montserrat'] font-bold text-sm text-white">
                    Apex Enterprise Platform
                  </p>
                  <p className="font-['Inter'] text-xs text-[#00C2E0]">
                    99.99% Availability • Sub-Second Latency
                  </p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#00C2E0] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid Section */}
      <section className="py-24 px-6 md:px-8 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#0F3D59]">
              Engineered for Excellence
            </h2>
            <p className="font-['Inter'] text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored for enterprise scale and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Web Platforms */}
            <div
              onClick={() => {
                onTabChange('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 bg-[#0f3d59]/10 rounded-xl flex items-center justify-center mb-6 text-[#0F3D59] group-hover:text-[#00C2E0] transition-colors">
                  <Code className="w-7 h-7" />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59] mb-3">
                  Web Platforms
                </h3>
                <p className="font-['Inter'] text-slate-600 mb-6 leading-relaxed">
                  Scalable, secure, and blazingly fast web applications built on modern architectures to handle complex business logic and high concurrency.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'].map((tag) => (
                  <span
                    key={tag}
                    className="font-['Inter'] font-semibold text-xs text-[#0F3D59] bg-[#0F3D59]/5 px-3 py-1.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Solutions */}
            <div
              onClick={() => {
                onTabChange('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 bg-[#0f3d59]/10 rounded-xl flex items-center justify-center mb-6 text-[#0F3D59] group-hover:text-[#00C2E0] transition-colors">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59] mb-3">
                  Mobile Solutions
                </h3>
                <p className="font-['Inter'] text-slate-600 mb-6 leading-relaxed">
                  Native and cross-platform mobile experiences that engage users seamlessly across iOS and Android ecosystems.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                {['iOS', 'Android', 'React Native', 'Swift'].map((tag) => (
                  <span
                    key={tag}
                    className="font-['Inter'] font-semibold text-xs text-[#0F3D59] bg-[#0F3D59]/5 px-3 py-1.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* SEO & Performance Audit */}
            <div
              onClick={() => {
                onTabChange('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 bg-[#0f3d59]/10 rounded-xl flex items-center justify-center mb-6 text-[#0F3D59] group-hover:text-[#00C2E0] transition-colors">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59] mb-3">
                  Technical SEO
                </h3>
                <p className="font-['Inter'] text-slate-600 mb-6 leading-relaxed">
                  Data-driven optimization strategies to ensure your platform dominates search visibility and Core Web Vitals rankings.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                {['Technical SEO', 'Content Strategy', 'Analytics'].map((tag) => (
                  <span
                    key={tag}
                    className="font-['Inter'] font-semibold text-xs text-[#0F3D59] bg-[#0F3D59]/5 px-3 py-1.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Software Engineering */}
            <div
              onClick={() => {
                onTabChange('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center group cursor-pointer"
            >
              <div className="flex-grow">
                <div className="w-14 h-14 bg-[#0f3d59]/10 rounded-xl flex items-center justify-center mb-6 text-[#0F3D59] group-hover:text-[#00C2E0] transition-colors">
                  <Terminal className="w-7 h-7" />
                </div>
                <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59] mb-3">
                  Custom Software Engineering
                </h3>
                <p className="font-['Inter'] text-slate-600 mb-4 leading-relaxed">
                  Bespoke system architecture and API integrations designed specifically to streamline your unique operational workflows.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Python', 'Java', 'Cloud Architecture', 'Docker'].map((tag) => (
                    <span
                      key={tag}
                      className="font-['Inter'] font-semibold text-xs text-[#0F3D59] bg-[#0F3D59]/5 px-3 py-1.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-2/5 aspect-video bg-[#00273d] rounded-xl overflow-hidden border border-slate-200 relative shrink-0 shadow-md">
                <img
                  src={BRAND_ASSETS.codeSnippet}
                  alt="Apex Nova Digital Engineering Code Environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trust Metric Banner */}
      <section className="py-20 bg-[#00273d] text-white border-y border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-['Montserrat'] font-extrabold text-4xl lg:text-5xl text-[#00C2E0]">
                  {stat.value}
                </span>
                <span className="font-['Inter'] text-xs md:text-sm text-slate-300 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Montserrat'] font-bold text-3xl text-[#0F3D59]">
              Frequently Asked Questions
            </h2>
            <p className="font-['Inter'] text-slate-600 mt-2 text-sm">
              Learn how Apex Nova Digital handles technical discovery, security, and project delivery.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <div
                key={index}
                className="bg-[#f7f9fb] border border-[#E2E8F0] rounded-xl p-6 transition-all hover:border-[#00C2E0]/40"
              >
                <h3 className="font-['Montserrat'] font-semibold text-base text-[#0F3D59] mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00C2E0] shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="font-['Inter'] text-sm text-slate-600 pl-7 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 px-6 md:px-8 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto text-center bg-[#0F3D59] text-white p-12 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2E0]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-white mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="font-['Inter'] text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Partner with Apex Nova Digital to build solutions that not only look incredible but perform reliably at scale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="bg-[#00C2E0] text-white font-['Inter'] font-semibold px-8 py-4 rounded-lg hover:bg-[#00b0cb] transition-all duration-200 shadow-xl hover:-translate-y-0.5 active:translate-y-0 min-w-[180px] cursor-pointer"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
