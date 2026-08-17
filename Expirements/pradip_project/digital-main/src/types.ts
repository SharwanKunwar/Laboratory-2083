export type NavTab = 'home' | 'services' | 'calculator' | 'about' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  tags: string[];
  features: string[];
  deliverables: string[];
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface ConsultationFormData {
  firstName: string;
  lastName: string;
  email: string;
  inquiryType: string;
  projectDetails: string;
  budget?: string;
  timeline?: string;
}

export interface AIProposalResponse {
  summary: string;
  recommendedArchitecture: string[];
  keyDeliverables: string[];
  estimatedScope: string;
  nextSteps: string[];
}
