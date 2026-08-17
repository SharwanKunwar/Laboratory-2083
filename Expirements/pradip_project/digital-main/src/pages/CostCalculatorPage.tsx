import React, { useState } from 'react';
import { NavTab } from '../types';
import { Calculator, CheckCircle2, ShieldCheck, Sparkles, DollarSign, Clock, ArrowRight, RefreshCw, FileText, Check, HelpCircle } from 'lucide-react';

interface CostCalculatorPageProps {
  onOpenConsultationWithInquiry: (inquiryType: string, calculatedSummary?: string) => void;
}

interface FeatureOption {
  id: string;
  label: string;
  description: string;
  priceUsd: number;
  priceNpr: number;
  category: 'core' | 'pages' | 'design' | 'features' | 'support';
}

export const CostCalculatorPage: React.FC<CostCalculatorPageProps> = ({
  onOpenConsultationWithInquiry,
}) => {
  const [currency, setCurrency] = useState<'NPR' | 'USD'>('NPR');

  // Base Website / Platform Types
  const projectTypes = [
    {
      id: 'corporate',
      name: 'Corporate / Business Website',
      description: 'Professional website showcasing company services, team, portfolio & contact inquiry system.',
      priceUsd: 350,
      priceNpr: 45000,
      weeks: 2,
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce Online Store',
      description: 'Full online shopping store with product catalog, cart, checkout, payment gateway & inventory management.',
      priceUsd: 750,
      priceNpr: 98000,
      weeks: 3,
    },
    {
      id: 'portal',
      name: 'Web Portal / Custom Web App',
      description: 'High-concurrency web software with user logins, dashboard, database APIs & complex workflows.',
      priceUsd: 1100,
      priceNpr: 145000,
      weeks: 4,
    },
    {
      id: 'mobile',
      name: 'Mobile App (iOS & Android)',
      description: 'Cross-platform native mobile application built on React Native with cloud backend integration.',
      priceUsd: 1400,
      priceNpr: 185000,
      weeks: 5,
    },
  ];

  const [selectedTypeId, setSelectedTypeId] = useState<string>('corporate');

  // Page Count options
  const pageScales = [
    { id: '1-5', label: '1 - 5 Pages', priceUsd: 0, priceNpr: 0, extraWeeks: 0 },
    { id: '6-12', label: '6 - 12 Pages', priceUsd: 180, priceNpr: 24000, extraWeeks: 1 },
    { id: '13-25', label: '13 - 25 Pages', priceUsd: 380, priceNpr: 50000, extraWeeks: 2 },
    { id: '25+', label: '25+ Enterprise Pages', priceUsd: 750, priceNpr: 98000, extraWeeks: 3 },
  ];
  const [selectedPageId, setSelectedPageId] = useState<string>('1-5');

  // Design Levels
  const designLevels = [
    { id: 'standard', name: 'Clean Modern Layout', desc: 'Sleek, responsive typography & spacing aligned with brand guidelines.', priceUsd: 0, priceNpr: 0 },
    { id: 'custom', name: 'Custom Design System', desc: 'Bespoke UI/UX component library, unique visual assets & tailored icons.', priceUsd: 220, priceNpr: 29000 },
    { id: 'motion', name: 'Premium Interactive Motion', desc: 'Advanced micro-interactions, smooth scroll animations & 3D visual assets.', priceUsd: 420, priceNpr: 55000 },
  ];
  const [selectedDesignId, setSelectedDesignId] = useState<string>('standard');

  // Feature Checkboxes
  const featureOptions: FeatureOption[] = [
    {
      id: 'cms',
      label: 'Admin CMS Panel',
      description: 'Custom content dashboard to update pages, blogs, services, or products easily.',
      priceUsd: 180,
      priceNpr: 24000,
      category: 'features',
    },
    {
      id: 'payment',
      label: 'Nepali Payment Gateways',
      description: 'Integration with eSewa, Khalti, Fonepay, and international Credit Cards / Stripe.',
      priceUsd: 150,
      priceNpr: 20000,
      category: 'features',
    },
    {
      id: 'auth',
      label: 'User Portal & Auth System',
      description: 'Secure registration, login, profile management, and role-based access control.',
      priceUsd: 140,
      priceNpr: 18000,
      category: 'features',
    },
    {
      id: 'multilingual',
      label: 'Multi-Language (Nepali & English)',
      description: 'Seamless language switcher with dynamic localized content translation.',
      priceUsd: 110,
      priceNpr: 14000,
      category: 'features',
    },
    {
      id: 'seo',
      label: 'Technical SEO & Speed Package',
      description: 'Core Web Vitals optimization, schema markup, sitemaps & high Google Search ranking setup.',
      priceUsd: 130,
      priceNpr: 17000,
      category: 'features',
    },
    {
      id: 'ai_chatbot',
      label: 'AI Chatbot & Gemini Assistant',
      description: 'Smart AI assistant integrated into your site to answer client inquiries 24/7 automatically.',
      priceUsd: 220,
      priceNpr: 29000,
      category: 'features',
    },
    {
      id: 'api_db',
      label: 'Database & REST API Integration',
      description: 'High-speed PostgreSQL/MongoDB backend with secure REST or GraphQL endpoints.',
      priceUsd: 250,
      priceNpr: 33000,
      category: 'features',
    },
    {
      id: 'support_sla',
      label: '1-Year Priority Maintenance & SLA',
      description: '24/7 uptime monitoring, security updates, daily backups & dedicated phone support.',
      priceUsd: 200,
      priceNpr: 26000,
      category: 'support',
    },
  ];

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'cms',
    'seo',
    'payment',
  ]);

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculations
  const currentProjectType = projectTypes.find((p) => p.id === selectedTypeId) || projectTypes[0];
  const currentPageScale = pageScales.find((p) => p.id === selectedPageId) || pageScales[0];
  const currentDesign = designLevels.find((d) => d.id === selectedDesignId) || designLevels[0];

  const calculateTotal = () => {
    let totalUsd = currentProjectType.priceUsd + currentPageScale.priceUsd + currentDesign.priceUsd;
    let totalNpr = currentProjectType.priceNpr + currentPageScale.priceNpr + currentDesign.priceNpr;

    selectedFeatures.forEach((featureId) => {
      const feat = featureOptions.find((f) => f.id === featureId);
      if (feat) {
        totalUsd += feat.priceUsd;
        totalNpr += feat.priceNpr;
      }
    });

    return { totalUsd, totalNpr };
  };

  const calculateTimeline = () => {
    const totalWeeks = currentProjectType.weeks + currentPageScale.extraWeeks + (selectedFeatures.length > 4 ? 1 : 0);
    return `${totalWeeks} - ${totalWeeks + 1} Weeks`;
  };

  const { totalUsd, totalNpr } = calculateTotal();

  const [copied, setCopied] = useState(false);

  const getBreakdownText = () => {
    const featNames = selectedFeatures
      .map((fid) => featureOptions.find((f) => f.id === fid)?.label)
      .filter(Boolean)
      .join(', ');

    return `Website Requirement Quote (Apex Nova Digital):\n- Type: ${currentProjectType.name}\n- Page Scope: ${currentPageScale.label}\n- Design: ${currentDesign.name}\n- Selected Modules: ${featNames}\n- Estimated Delivery: ${calculateTimeline()}\n- Total Estimate: ${currency === 'NPR' ? `NPR Rs. ${totalNpr.toLocaleString()}` : `$${totalUsd.toLocaleString()} USD`}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getBreakdownText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendProposalRequest = () => {
    const summary = getBreakdownText();
    onOpenConsultationWithInquiry(`Cost Calculator Quote (${currency === 'NPR' ? `NPR ${totalNpr.toLocaleString()}` : `$${totalUsd.toLocaleString()}`})`, summary);
  };

  return (
    <div className="w-full pt-28 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0F3D59] text-white py-16 px-6 md:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#00C2E0]/20 text-[#00C2E0] text-xs font-['Inter'] font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#00C2E0]/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent Client Requirement Estimator</span>
          </div>
          <h1 className="font-['Montserrat'] font-bold text-4xl md:text-5xl text-white tracking-tight">
            Website & App <span className="text-[#00C2E0]">Cost Calculator</span>
          </h1>
          <p className="font-['Inter'] text-slate-300 mt-3 max-w-2xl mx-auto text-base leading-relaxed">
            Configure your technical requirements to generate a transparent, itemized project cost estimate for your business in Kathmandu or globally.
          </p>

          {/* Currency Toggle Switch */}
          <div className="inline-flex items-center bg-[#00273d] p-1.5 rounded-xl border border-white/20 mt-8">
            <span className="text-xs font-['Inter'] font-semibold text-slate-300 px-3">
              Currency:
            </span>
            <button
              onClick={() => setCurrency('NPR')}
              className={`px-4 py-2 rounded-lg font-['Montserrat'] font-bold text-xs transition-all cursor-pointer ${
                currency === 'NPR'
                  ? 'bg-[#00C2E0] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🇳🇵 NPR (Rs.)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-lg font-['Montserrat'] font-bold text-xs transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#00C2E0] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🇺🇸 USD ($)
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Estimator Layout */}
      <section className="py-16 px-6 md:px-8 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Requirement Options Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Project Type */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#0F3D59] text-white text-xs font-bold flex items-center justify-center font-['Montserrat']">
                  1
                </span>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F3D59]">
                  Select Platform / Project Category
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map((pt) => {
                  const isSelected = selectedTypeId === pt.id;
                  const priceLabel =
                    currency === 'NPR'
                      ? `NPR Rs. ${pt.priceNpr.toLocaleString()}`
                      : `$${pt.priceUsd.toLocaleString()} USD`;

                  return (
                    <div
                      key={pt.id}
                      onClick={() => setSelectedTypeId(pt.id)}
                      className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#00C2E0] bg-[#00C2E0]/5 shadow-md'
                          : 'border-[#E2E8F0] hover:border-[#00C2E0]/50 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-['Montserrat'] font-bold text-base text-[#0F3D59]">
                            {pt.name}
                          </h4>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-[#00C2E0] shrink-0" />}
                        </div>
                        <p className="font-['Inter'] text-xs text-slate-600 mb-4 leading-relaxed">
                          {pt.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0]/60 flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-['Inter']">Starting at</span>
                        <span className="font-['Montserrat'] font-bold text-[#0F3D59]">
                          {priceLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Page Scope */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#0F3D59] text-white text-xs font-bold flex items-center justify-center font-['Montserrat']">
                  2
                </span>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F3D59]">
                  Page Count & Navigation Scope
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pageScales.map((ps) => {
                  const isSelected = selectedPageId === ps.id;
                  const priceLabel =
                    ps.priceUsd === 0
                      ? 'Included'
                      : currency === 'NPR'
                      ? `+ Rs. ${ps.priceNpr.toLocaleString()}`
                      : `+ $${ps.priceUsd.toLocaleString()}`;

                  return (
                    <button
                      type="button"
                      key={ps.id}
                      onClick={() => setSelectedPageId(ps.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#00C2E0] bg-[#00C2E0]/10 shadow-sm'
                          : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="font-['Montserrat'] font-bold text-sm block text-[#0F3D59] mb-1">
                        {ps.label}
                      </span>
                      <span className="font-['Inter'] text-xs font-semibold text-[#00C2E0]">
                        {priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: UI/UX Design Level */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#0F3D59] text-white text-xs font-bold flex items-center justify-center font-['Montserrat']">
                  3
                </span>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F3D59]">
                  UI/UX Design & Brand Aesthetics
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {designLevels.map((dl) => {
                  const isSelected = selectedDesignId === dl.id;
                  const priceLabel =
                    dl.priceUsd === 0
                      ? 'Included'
                      : currency === 'NPR'
                      ? `+ Rs. ${dl.priceNpr.toLocaleString()}`
                      : `+ $${dl.priceUsd.toLocaleString()}`;

                  return (
                    <div
                      key={dl.id}
                      onClick={() => setSelectedDesignId(dl.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#00C2E0] bg-[#00C2E0]/5 shadow-sm'
                          : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-['Montserrat'] font-bold text-sm text-[#0F3D59]">
                            {dl.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#00C2E0]" />}
                        </div>
                        <p className="font-['Inter'] text-xs text-slate-600 mb-3 leading-relaxed">
                          {dl.desc}
                        </p>
                      </div>
                      <span className="font-['Inter'] text-xs font-bold text-[#00C2E0] pt-2 border-t border-[#E2E8F0]">
                        {priceLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Modules & Features */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#0F3D59] text-white text-xs font-bold flex items-center justify-center font-['Montserrat']">
                  4
                </span>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F3D59]">
                  Functional Modules & Integrations
                </h3>
              </div>

              <div className="space-y-3">
                {featureOptions.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  const priceLabel =
                    currency === 'NPR'
                      ? `+ Rs. ${feat.priceNpr.toLocaleString()}`
                      : `+ $${feat.priceUsd.toLocaleString()}`;

                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'border-[#00C2E0] bg-[#00C2E0]/5'
                          : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by parent div
                          className="mt-1 w-4 h-4 text-[#00C2E0] rounded border-slate-300 focus:ring-[#00C2E0]"
                        />
                        <div>
                          <h5 className="font-['Montserrat'] font-bold text-sm text-[#0F3D59]">
                            {feat.label}
                          </h5>
                          <p className="font-['Inter'] text-xs text-slate-600">
                            {feat.description}
                          </p>
                        </div>
                      </div>

                      <span className="font-['Montserrat'] font-bold text-xs text-[#00C2E0] shrink-0">
                        {priceLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cost Summary & Proposal Card Column */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#0F3D59] text-white rounded-2xl p-8 shadow-2xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-[#00C2E0] font-['Montserrat'] font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Apex Nova Estimated Quote</span>
                </div>
                <span className="text-xs text-slate-300 font-['Inter']">Kathmandu HQ</span>
              </div>

              {/* Price Display */}
              <div>
                <span className="text-xs uppercase text-slate-300 font-['Inter'] font-semibold block mb-1">
                  Total Estimated Investment
                </span>
                <div className="font-['Montserrat'] font-extrabold text-3xl sm:text-4xl text-[#00C2E0] tracking-tight">
                  {currency === 'NPR'
                    ? `NPR Rs. ${totalNpr.toLocaleString()}`
                    : `$${totalUsd.toLocaleString()} USD`}
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-300 font-['Inter']">
                  <Clock className="w-3.5 h-3.5 text-[#00C2E0]" />
                  <span>Target Delivery Timeline: <strong className="text-white">{calculateTimeline()}</strong></span>
                </div>
              </div>

              {/* Itemized Selected Summary */}
              <div className="bg-[#00273d] p-4 rounded-xl border border-white/10 text-xs space-y-2.5 font-['Inter'] max-h-56 overflow-y-auto">
                <span className="text-slate-400 uppercase font-semibold text-[10px] block mb-1">
                  Itemized Breakdown:
                </span>
                <div className="flex justify-between text-slate-200">
                  <span>{currentProjectType.name}</span>
                  <span className="font-medium text-white">
                    {currency === 'NPR' ? `Rs. ${currentProjectType.priceNpr.toLocaleString()}` : `$${currentProjectType.priceUsd}`}
                  </span>
                </div>
                {currentPageScale.priceUsd > 0 && (
                  <div className="flex justify-between text-slate-200">
                    <span>{currentPageScale.label}</span>
                    <span className="font-medium text-white">
                      {currency === 'NPR' ? `Rs. ${currentPageScale.priceNpr.toLocaleString()}` : `$${currentPageScale.priceUsd}`}
                    </span>
                  </div>
                )}
                {currentDesign.priceUsd > 0 && (
                  <div className="flex justify-between text-slate-200">
                    <span>{currentDesign.name}</span>
                    <span className="font-medium text-white">
                      {currency === 'NPR' ? `Rs. ${currentDesign.priceNpr.toLocaleString()}` : `$${currentDesign.priceUsd}`}
                    </span>
                  </div>
                )}

                {selectedFeatures.map((featId) => {
                  const feat = featureOptions.find((f) => f.id === featId);
                  if (!feat) return null;
                  return (
                    <div key={featId} className="flex justify-between text-slate-200">
                      <span>{feat.label}</span>
                      <span className="font-medium text-white">
                        {currency === 'NPR' ? `Rs. ${feat.priceNpr.toLocaleString()}` : `$${feat.priceUsd}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Guarantees Included */}
              <div className="space-y-2 text-xs text-slate-300 font-['Inter'] pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00C2E0]" />
                  <span>100% IP & Source Code Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2E0]" />
                  <span>Free Initial Deployment & Domain Setup</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSendProposalRequest}
                  className="w-full bg-[#00C2E0] text-white font-['Inter'] font-semibold py-3.5 px-6 rounded-lg hover:bg-[#00b0cb] transition-all duration-200 shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Official Proposal</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="w-full bg-white/10 text-slate-200 border border-white/20 font-['Inter'] font-semibold py-2.5 px-4 rounded-lg hover:bg-white/20 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{copied ? 'Quote Copied to Clipboard!' : 'Copy Quote Breakdown'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
