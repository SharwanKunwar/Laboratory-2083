import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/mockData';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle2, Sparkles, Share2, Globe, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  onOpenConsultation: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenConsultation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: 'Digital Transformation Strategy',
    projectDetails: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full pt-28 pb-20">
      {/* Hero Header */}
      <section className="bg-[#0F3D59] text-white py-20 px-6 md:px-8 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#00C2E0]/20 text-[#00C2E0] text-xs font-['Inter'] font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#00C2E0]/30">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Communication & Support</span>
          </div>
          <h1 className="font-['Montserrat'] font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Let's Build the <span className="text-[#00C2E0]">Future Together</span>
          </h1>
          <p className="font-['Inter'] text-lg text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Reach out directly to Apex Nova Digital to discuss your custom project requirements, schedule an executive consultation, or explore strategic partnerships.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 px-6 md:px-8 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="mb-8">
              <h2 className="font-['Montserrat'] font-bold text-2xl text-[#0F3D59]">
                Send a Message
              </h2>
              <p className="font-['Inter'] text-sm text-slate-600 mt-1">
                Fill out the form below and an Apex Nova Digital software architect will respond within 24 business hours.
              </p>
            </div>

            {!submitted ? (
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
                      placeholder="e.g. Sarah"
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
                      placeholder="e.g. Jenkins"
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

                <div>
                  <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all bg-white"
                  >
                    <option value="Digital Transformation Strategy">Digital Transformation Strategy</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Web Platforms & Engineering">Web Platforms & Engineering</option>
                    <option value="Technical SEO & Performance Audit">Technical SEO & Performance Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block font-['Inter'] text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Provide a brief summary of your project scope, timeline, or technical challenges..."
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg font-['Inter'] text-sm focus:outline-none focus:border-[#00C2E0] focus:ring-2 focus:ring-[#00C2E0]/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F3D59] text-white font-['Inter'] font-semibold py-4 px-6 rounded-lg hover:bg-[#00273d] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="p-8 bg-[#f2f4f6] border border-[#E2E8F0] rounded-xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#00C2E0] mx-auto" />
                <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F3D59]">
                  Inquiry Received!
                </h3>
                <p className="font-['Inter'] text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {formData.firstName}. Your message regarding {formData.inquiryType} has been dispatched to Apex Nova Digital executive team.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-['Inter'] font-semibold text-[#0F3D59] hover:underline"
                  >
                    Send another message
                  </button>
                  <span>•</span>
                  <button
                    onClick={onOpenConsultation}
                    className="text-xs font-['Inter'] font-semibold text-[#00C2E0] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate AI Proposal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contact Details & Hours Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Contact Card */}
            <div className="bg-[#0F3D59] text-white rounded-2xl p-8 shadow-lg space-y-6">
              <h3 className="font-['Montserrat'] font-bold text-xl text-white border-b border-white/10 pb-4">
                Direct Contact
              </h3>

              <div className="space-y-4 font-['Inter'] text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#00C2E0]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-300 font-semibold block">
                      Direct Hotline
                    </span>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="font-bold text-lg text-white hover:text-[#00C2E0] transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#00C2E0]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-300 font-semibold block">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="font-semibold text-sm text-slate-200 hover:text-[#00C2E0] transition-colors break-all"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-[#00C2E0]">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-300 font-semibold block">
                      Social Presence
                    </span>
                    <span className="font-semibold text-sm text-slate-200 capitalize">
                      {CONTACT_INFO.social}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#0F3D59]">
                <Clock className="w-5 h-5 text-[#00C2E0]" />
                <h3 className="font-['Montserrat'] font-bold text-lg">Business Hours</h3>
              </div>

              <div className="space-y-3 font-['Inter'] text-sm text-slate-700 divide-y divide-[#E2E8F0]">
                <div className="flex justify-between pt-2">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-[#0F3D59] font-bold">{CONTACT_INFO.hours.weekdays}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-medium">Saturday</span>
                  <span className="text-slate-600 text-xs">{CONTACT_INFO.hours.saturday}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-medium">Sunday</span>
                  <span className="text-rose-600 font-semibold text-xs">{CONTACT_INFO.hours.sunday}</span>
                </div>
              </div>
            </div>

            {/* Interactive Location Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#0F3D59]">
                <MapPin className="w-5 h-5 text-[#00C2E0]" />
                <h3 className="font-['Montserrat'] font-bold text-lg">Headquarters</h3>
              </div>
              <p className="font-['Inter'] text-sm text-slate-600 leading-relaxed">
                {CONTACT_INFO.address}
              </p>

              {/* Map Canvas Preview */}
              <div className="w-full h-40 bg-[#0F3D59] rounded-xl overflow-hidden relative flex items-center justify-center text-white border border-[#E2E8F0]">
                <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=Kathmandu,Nepal&zoom=11&size=600x300&maptype=roadmap')` }} />
                <div className="relative z-10 text-center p-4">
                  <Globe className="w-8 h-8 text-[#00C2E0] mx-auto mb-1 animate-bounce" />
                  <span className="font-['Montserrat'] font-bold text-xs uppercase tracking-wider block">
                    Global Tech Hub
                  </span>
                  <span className="font-['Inter'] text-[11px] text-slate-300">
                    Kathmandu • Nepal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
