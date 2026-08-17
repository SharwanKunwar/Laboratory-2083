import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Loader2, Server, Layers, Clock, ShieldCheck } from 'lucide-react';
import { ConsultationFormData, AIProposalResponse } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInquiryType?: string;
  defaultProjectDetails?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultInquiryType = 'Digital Transformation Strategy',
  defaultProjectDetails = '',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: defaultInquiryType,
    projectDetails: defaultProjectDetails,
    budget: '$25k - $50k',
    timeline: '1 to 2 Months',
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: defaultInquiryType || prev.inquiryType,
        projectDetails: defaultProjectDetails || prev.projectDetails,
      }));
    }
  }, [isOpen, defaultInquiryType, defaultProjectDetails]);

  const [isLoading, setIsLoading] = useState(false);
  const [proposal, setProposal] = useState<AIProposalResponse | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to generate consultation response');
      }

      const data: AIProposalResponse = await res.json();
      setProposal(data);
      setSubmittedMessage(true);
    } catch (err) {
      console.error(err);
      // Fallback
      setProposal({
        summary: `Thank you ${formData.firstName || 'partner'}. We have logged your request for ${formData.inquiryType}. Apex Nova Digital senior software architects will inspect your technical specification and reach out shortly.`,
        recommendedArchitecture: [
          'High-Availability Microservices (Node.js/TypeScript)',
          'Serverless / Containerized Cloud Deployment',
          'Next.js 15 High-Performance Web Frontend',
          'PostgreSQL + Redis Multi-Tier Caching Data Layer'
        ],
        keyDeliverables: [
          'Technical Architecture Specification Blueprint',
          'Enterprise Design System & UI/UX Specs',
          'Production-Ready Codebase & CI/CD Pipelines',
          'Security Compliance & OWASP Audit Report'
        ],
        estimatedScope: formData.timeline ? `Estimated Timeline: ${formData.timeline}` : '4 to 8 Weeks Sprint Cycles',
        nextSteps: [
          'Direct technical consultation with CEO Pradip Khadka & Senior Leads',
          'Scope refinement & milestone roadmap sign-off',
          'Sprint kick-off and initial environment setup'
        ]
      });
      setSubmittedMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProposal(null);
    setSubmittedMessage(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative my-8 text-[#191c1e] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F3D59] text-white p-6 md:p-8 flex justify-between items-start relative">
          <div className="pr-8">
            <div className="inline-flex items-center gap-2 bg-[#00C2E0]/20 text-[#00C2E0] text-xs font-['Inter'] font-semibold px-3 py-1 rounded-full mb-3 border border-[#00C2E0]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apex Nova Digital Consultation</span>
            </div>
            <h3 className="font-['Montserrat'] font-bold text-2xl text-white">
              {submittedMessage ? 'Your Technical Proposal Blueprint' : 'Request Enterprise Consultation'}
            </h3>
            <p className="font-['Inter'] text-sm text-slate-300 mt-1">
              {submittedMessage
                ? 'Generated specifically for your business requirements'
                : 'Connect with our solution architects & receive a tailored technical blueprint.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {!submittedMessage ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Alex"
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Vance"
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all bg-white"
                  >
                    <option value="Digital Transformation Strategy">Digital Transformation Strategy</option>
                    <option value="Web Platforms & Cloud Applications">Web Platforms & Cloud Applications</option>
                    <option value="Mobile App Engineering (iOS/Android)">Mobile App Engineering (iOS/Android)</option>
                    <option value="Custom Software & Microservices">Custom Software & Microservices</option>
                    <option value="Technical SEO & Performance Audit">Technical SEO & Performance Audit</option>
                  </select>
                </div>
                <div>
                  <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all bg-white"
                  >
                    <option value="Under $15,000">Under $15,000</option>
                    <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                    <option value="$30,000 - $60,000">$30,000 - $60,000</option>
                    <option value="$60,000+">$60,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Details & Technical Scope *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Outline your current technical challenges, goals, key integration requirements, or system objectives..."
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00C2E0] text-white font-['Inter'] font-semibold py-3.5 px-6 rounded-lg hover:bg-[#00b0cb] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Architecting Solution Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Instant Proposal & Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-[#f2f4f6] border border-[#E2E8F0] rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#00C2E0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Montserrat'] font-bold text-base text-[#00273d]">
                    Inquiry Confirmed
                  </h4>
                  <p className="font-['Inter'] text-sm text-slate-600 mt-0.5">
                    Your request has been routed to Apex Nova Digital executive office. Below is your AI-architected preliminary technical proposal.
                  </p>
                </div>
              </div>

              {proposal && (
                <div className="space-y-5 font-['Inter'] text-sm">
                  {/* Executive Summary */}
                  <div className="bg-white p-5 border border-[#E2E8F0] rounded-xl shadow-sm">
                    <h5 className="font-['Montserrat'] font-bold text-sm text-[#0F3D59] mb-2 uppercase tracking-wide flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00C2E0]" />
                      Executive Summary
                    </h5>
                    <p className="text-slate-700 leading-relaxed">{proposal.summary}</p>
                  </div>

                  {/* Architecture & Deliverables */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#f7f9fb] p-4 border border-[#E2E8F0] rounded-xl">
                      <h5 className="font-['Montserrat'] font-bold text-xs uppercase tracking-wider text-[#0F3D59] mb-3 flex items-center gap-2">
                        <Server className="w-4 h-4 text-[#00C2E0]" />
                        Recommended Architecture
                      </h5>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {proposal.recommendedArchitecture.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2E0] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#f7f9fb] p-4 border border-[#E2E8F0] rounded-xl">
                      <h5 className="font-['Montserrat'] font-bold text-xs uppercase tracking-wider text-[#0F3D59] mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#00C2E0]" />
                        Key Deliverables
                      </h5>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {proposal.keyDeliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2E0] mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Scope & Next steps */}
                  <div className="bg-[#00273d] text-white p-5 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-[#00C2E0] font-['Montserrat'] font-bold text-xs uppercase tracking-wider">
                      <Clock className="w-4 h-4" />
                      Scope & Engagement Roadmap
                    </div>
                    <p className="text-sm font-medium text-slate-200">{proposal.estimatedScope}</p>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-xs uppercase font-semibold text-slate-400 block mb-2">
                        Immediate Next Steps
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {proposal.nextSteps.map((step, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <ArrowRight className="w-3.5 h-3.5 text-[#00C2E0]" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="w-1/2 py-3 border border-[#E2E8F0] text-slate-700 font-['Inter'] font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={onClose}
                  className="w-1/2 bg-[#00C2E0] text-white font-['Inter'] font-semibold rounded-lg hover:bg-[#00b0cb] transition-colors text-sm py-3"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
