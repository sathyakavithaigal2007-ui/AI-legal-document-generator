export const DOCUMENT_TEMPLATES = [
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement (NDA)',
    category: 'Confidentiality',
    icon: 'ShieldLock',
    description: 'Protect sensitive proprietary trade secrets, business metrics, and code before sharing with third parties.',
    recommendedUse: 'Startups, Freelancers, Vendors, and M&A discussions',
    difficulty: 'Beginner',
    defaultJurisdiction: 'State of Delaware, USA',
    defaultTerms: [
      'Confidentiality must be maintained for a minimum of two (2) years.',
      'Information may only be disclosed to employees on a strict need-to-know basis.',
      'Either party may terminate the exchange of disclosures with 15 days written notice.',
      'Excludes information that becomes public knowledge through no breach of this agreement.'
    ]
  },
  {
    id: 'employment',
    name: 'Employment Contract',
    category: 'Employment',
    icon: 'Briefcase',
    description: 'Comprehensive employment agreement covering roles, compensation, benefits, IP ownership, and termination terms.',
    recommendedUse: 'Full-time and part-time employee hiring',
    difficulty: 'Intermediate',
    defaultJurisdiction: 'State of Delaware, USA',
    defaultTerms: [
      'Employee shall devote full-time efforts to the discharge of assigned duties.',
      'Base annual salary payable in semi-monthly installments subject to tax withholdings.',
      'All work product and inventions belong strictly to employer under work-for-hire rules.',
      'Either party may terminate employment at-will with 14 days advance notice.'
    ]
  },
  {
    id: 'freelance',
    name: 'Freelance Work Contract',
    category: 'Freelance',
    icon: 'Code2',
    description: 'Agreement for independent contractors, software developers, designers, and agency projects.',
    recommendedUse: 'Contractors, consultants, and milestone projects',
    difficulty: 'Beginner',
    defaultJurisdiction: 'State of California, USA',
    defaultTerms: [
      'Payment must be completed within 30 days of monthly invoice.',
      'Provider delivers source code and deliverables by agreed milestone deadlines.',
      'Confidentiality must be maintained at all times.',
      'Either party may terminate the agreement with 15 days written notice.'
    ]
  },
  {
    id: 'lease',
    name: 'Lease Agreement',
    category: 'Real Estate',
    icon: 'Building2',
    description: 'Commercial or residential property lease agreement detailing rent, security deposits, and maintenance covenants.',
    recommendedUse: 'Property owners, tenants, and commercial office spaces',
    difficulty: 'Intermediate',
    defaultJurisdiction: 'State of New York, USA',
    defaultTerms: [
      'Monthly rent due on the 1st of each calendar month.',
      'Security deposit refundable within 30 days of lease termination less damage repairs.',
      'Tenant shall not make structural alterations without prior written consent.',
      'No subletting without landlord prior approval.'
    ]
  },
  {
    id: 'offer-letter',
    name: 'Employment Offer Letter',
    category: 'Employment',
    icon: 'FileText',
    description: 'Formal job offer letter outlining start date, base compensation, equity grants, and contingency conditions.',
    recommendedUse: 'Hiring managers & HR professionals',
    difficulty: 'Beginner',
    defaultJurisdiction: 'State of Delaware, USA',
    defaultTerms: [
      'Offer is contingent upon successful background check and authorization to work.',
      'Includes participation in company healthcare and 401(k) benefits plans.',
      'Employment remains at-will.'
    ]
  },
  {
    id: 'service-agreement',
    name: 'Service Agreement',
    category: 'Business',
    icon: 'Handshake',
    description: 'B2B agreement defining service level agreements (SLAs), scope, billing rates, and liabilities.',
    recommendedUse: 'SaaS providers, consulting agencies, and service businesses',
    difficulty: 'Intermediate',
    defaultJurisdiction: 'State of Delaware, USA',
    defaultTerms: [
      'Service provider warrants 99.9% monthly service uptime.',
      'Client retains full ownership of all data ingested into the system.',
      'Net 30 billing terms with 1.5% monthly late fee for overdue accounts.'
    ]
  },
  {
    id: 'partnership',
    name: 'Partnership Agreement',
    category: 'Partnership',
    icon: 'Users',
    description: 'Establishes equity split, capital contributions, profit sharing, and dispute resolution for co-founders.',
    recommendedUse: 'Co-founders establishing new ventures',
    difficulty: 'Advanced',
    defaultJurisdiction: 'State of Delaware, USA',
    defaultTerms: [
      'Net profits and losses distributed according to ownership percentages.',
      'Major operational capital expenditures require unanimous partner consent.',
      'Buy-sell clause triggered upon partner withdrawal or voluntary departure.'
    ]
  },
  {
    id: 'general-agreement',
    name: 'General Agreement',
    category: 'General',
    icon: 'FileCheck',
    description: 'Versatile legal agreement template suitable for general business transactions and memorandums.',
    recommendedUse: 'General business covenants and standard commitments',
    difficulty: 'Beginner',
    defaultJurisdiction: 'State of Delaware, USA',
    defaultTerms: [
      'Mutual covenants and responsibilities effective as of execution date.',
      'Disputes subject to mediation before formal arbitration.',
      'Written amendments required for any modification.'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Legal Document',
    category: 'General',
    icon: 'Sparkles',
    description: 'Prompt AI to generate a highly tailored legal document according to your custom specifications.',
    recommendedUse: 'Niche contracts, multi-party instruments, and special deals',
    difficulty: 'Advanced',
    defaultJurisdiction: 'State of Delaware, USA',
    defaultTerms: [
      'Custom terms defined during generation step.',
      'Standard confidentiality and governing law clauses included by default.'
    ]
  }
];
