import React, { useState } from 'react';
import { NavTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { CostCalculatorPage } from './pages/CostCalculatorPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalModal } from './components/LegalModal';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultInquiryType, setDefaultInquiryType] = useState('Digital Transformation Strategy');
  const [defaultProjectDetails, setDefaultProjectDetails] = useState('');
  
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms' | 'cookie' | 'support' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const handleOpenConsultationWithInquiry = (inquiryType: string, calculatedSummary?: string) => {
    setDefaultInquiryType(inquiryType);
    setDefaultProjectDetails(calculatedSummary || '');
    setIsConsultationOpen(true);
  };

  const handleOpenLegal = (type: 'privacy' | 'terms' | 'cookie' | 'support') => {
    setLegalModalState({
      isOpen: true,
      type,
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-['Inter'] selection:bg-[#00C2E0] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenConsultation={() => handleOpenConsultationWithInquiry('Digital Transformation Strategy')}
      />

      {/* Main Screen Router with Motion Animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <HomePage
                onTabChange={setCurrentTab}
                onOpenConsultation={() => handleOpenConsultationWithInquiry('Digital Transformation Strategy')}
              />
            </motion.div>
          )}

          {currentTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ServicesPage
                onTabChange={setCurrentTab}
                onOpenConsultationWithInquiry={handleOpenConsultationWithInquiry}
              />
            </motion.div>
          )}

          {currentTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <CostCalculatorPage
                onOpenConsultationWithInquiry={handleOpenConsultationWithInquiry}
              />
            </motion.div>
          )}

          {currentTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <AboutPage
                onTabChange={setCurrentTab}
                onOpenConsultation={() => handleOpenConsultationWithInquiry('Executive Leadership Consultation')}
              />
            </motion.div>
          )}

          {currentTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ContactPage
                onOpenConsultation={() => handleOpenConsultationWithInquiry('Direct Project Inquiry')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onTabChange={setCurrentTab}
        onOpenLegal={handleOpenLegal}
        onOpenConsultation={() => handleOpenConsultationWithInquiry('Footer Consultation Request')}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultInquiryType={defaultInquiryType}
        defaultProjectDetails={defaultProjectDetails}
      />

      {/* Governance & Legal Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={() => setLegalModalState({ isOpen: false, type: null })}
      />
    </div>
  );
}
