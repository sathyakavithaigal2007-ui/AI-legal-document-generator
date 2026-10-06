import React, { useState, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Plus, Trash2, ShieldCheck, 
  Building2, Users, Calendar, MapPin, FileText, Sliders, AlertCircle, Loader2 
} from 'lucide-react';
import { DOCUMENT_TEMPLATES } from '../data/templates';
import { generateDocument } from '../services/api';

export default function GeneratorWizard({ selectedTemplate, onDocumentGenerated, showToast }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    document_type: selectedTemplate ? selectedTemplate.name : 'Non-Disclosure Agreement (NDA)',
    title: selectedTemplate ? selectedTemplate.name : 'Mutual Non-Disclosure Agreement',
    effective_date: new Date().toISOString().split('T')[0],
    expiry_date: '',
    jurisdiction: selectedTemplate?.defaultJurisdiction || 'State of Delaware, USA',
    company_name: '',
    parties: [
      { name: '', role: 'Disclosing Party', organization: '', address: '', email: '' },
      { name: '', role: 'Receiving Party', organization: '', address: '', email: '' }
    ],
    terms: selectedTemplate?.defaultTerms ? [...selectedTemplate.defaultTerms] : [
      'Confidentiality must be maintained for a minimum of two (2) years.',
      'Information may only be disclosed on a strict need-to-know basis.'
    ],
    special_notes: '',
    branding: {
      company_name: '',
      logo_url: '',
      footer_text: 'Generated via LegalEase AI Platform',
      author_name: ''
    }
  });

  const [newClauseText, setNewClauseText] = useState('');

  // Update form if selected template changes
  useEffect(() => {
    if (selectedTemplate) {
      setFormData(prev => ({
        ...prev,
        document_type: selectedTemplate.name,
        title: selectedTemplate.name,
        jurisdiction: selectedTemplate.defaultJurisdiction || 'State of Delaware, USA',
        terms: selectedTemplate.defaultTerms ? [...selectedTemplate.defaultTerms] : prev.terms
      }));
    }
  }, [selectedTemplate]);

  // Loading animation phases
  const loadingMessages = [
    "Analyzing your requirements...",
    "Structuring legal clauses...",
    "Synthesizing contract provisions...",
    "Formatting final legal draft..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStage(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 1200);
    } else {
      setLoadingStage(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSelectTemplateCard = (template) => {
    setFormData(prev => ({
      ...prev,
      document_type: template.name,
      title: template.name,
      jurisdiction: template.defaultJurisdiction || 'State of Delaware, USA',
      terms: template.defaultTerms ? [...template.defaultTerms] : prev.terms
    }));
  };

  const handlePartyChange = (index, field, value) => {
    const updated = [...formData.parties];
    updated[index][field] = value;
    setFormData({ ...formData, parties: updated });
  };

  const addParty = () => {
    setFormData({
      ...formData,
      parties: [
        ...formData.parties,
        { name: '', role: `Party ${formData.parties.length + 1}`, organization: '', address: '', email: '' }
      ]
    });
  };

  const removeParty = (index) => {
    if (formData.parties.length <= 1) {
      showToast({ message: 'At least one party is required', type: 'error' });
      return;
    }
    const updated = formData.parties.filter((_, i) => i !== index);
    setFormData({ ...formData, parties: updated });
  };

  const addClause = () => {
    if (!newClauseText.trim()) return;
    setFormData({
      ...formData,
      terms: [...formData.terms, newClauseText.trim()]
    });
    setNewClauseText('');
  };

  const removeClause = (index) => {
    const updated = formData.terms.filter((_, i) => i !== index);
    setFormData({ ...formData, terms: updated });
  };

  const generateSuggestedClauses = () => {
    const suggestions = [
      "Either party may terminate this agreement with 15 days written notice.",
      "All invoices shall be settled within thirty (30) calendar days of receipt.",
      "This agreement is governed by the laws specified in the Jurisdiction section.",
      "Neither party shall be liable for indirect, consequential, or punitive damages."
    ];

    const uniqueNew = suggestions.filter(s => !formData.terms.includes(s));
    setFormData(prev => ({ ...prev, terms: [...prev.terms, ...uniqueNew] }));
    showToast({ message: 'Added 4 suggested clauses!', type: 'success' });
  };

  const handleGenerate = async () => {
    // Basic validation
    if (!formData.document_type) {
      showToast({ message: 'Please select a document type.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await generateDocument(formData);
      
      const fullDocumentObject = {
        title: formData.title || formData.document_type,
        document_type: formData.document_type,
        effective_date: formData.effective_date,
        expiry_date: formData.expiry_date,
        jurisdiction: formData.jurisdiction,
        company_name: formData.company_name,
        parties: formData.parties,
        terms: formData.terms,
        branding: formData.branding,
        content: response.content,
        summary: response.summary,
        key_clauses: response.key_clauses,
        is_demo: response.is_demo,
        status: 'Draft'
      };

      onDocumentGenerated(fullDocumentObject);
    } catch (err) {
      console.error(err);
      showToast({ message: err.message || 'Something went wrong while generating your document.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: 'Select Template' },
    { number: 2, label: 'Basic Info' },
    { number: 3, label: 'Parties' },
    { number: 4, label: 'Terms & Clauses' },
    { number: 5, label: 'Branding' },
    { number: 6, label: 'Review & Generate' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Legal Document Generator</span>
        </span>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Document Builder</h1>
        <p className="text-sm text-slate-400">Complete the guided wizard steps to generate your tailored agreement.</p>
      </div>

      {/* Step Indicator Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            return (
              <button
                key={step.number}
                onClick={() => !loading && setCurrentStep(step.number)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all text-xs font-medium ${
                  isCurrent
                    ? 'bg-indigo-600 text-white font-bold shadow-md'
                    : isCompleted
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-slate-950/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-1">
                  {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span>{step.number}.</span>}
                  <span className="truncate max-w-[80px] sm:max-w-none">{step.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Content Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-xl relative min-h-[420px] flex flex-col justify-between">
        
        {/* STEP 1: Select Document */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Step 1 — Select Legal Document Type</h2>
              <p className="text-xs text-slate-400 mt-1">Choose a pre-built legal document template or start with a custom agreement.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCUMENT_TEMPLATES.map((tpl) => {
                const isSelected = formData.document_type === tpl.name;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplateCard(tpl)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-600/15 ring-2 ring-indigo-500/50'
                        : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {tpl.category}
                        </span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
                      </div>
                      <h3 className="text-sm font-bold text-white">{tpl.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{tpl.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Basic Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Step 2 — Basic Document Details</h2>
              <p className="text-xs text-slate-400 mt-1">Specify title, effective date, jurisdiction, and primary company entity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Document Type</label>
                <input
                  type="text"
                  value={formData.document_type}
                  onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Non-Disclosure Agreement"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Document Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Mutual Non-Disclosure Agreement"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Effective Date</label>
                <input
                  type="date"
                  value={formData.effective_date}
                  onChange={(e) => setFormData({ ...formData, effective_date: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Expiry / Expiration Date (Optional)</label>
                <input
                  type="date"
                  value={formData.expiry_date}
                  onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Governing Jurisdiction / Location</label>
                <input
                  type="text"
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. State of Delaware, USA"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Organization / Company Name</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. TechNova Solutions Inc."
                />
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: Parties */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white">Step 3 — Parties Involved</h2>
                <p className="text-xs text-slate-400 mt-1">Define names, roles, organizations, and contact details for all parties.</p>
              </div>
              <button
                onClick={addParty}
                className="inline-flex items-center space-x-1.5 rounded-lg bg-indigo-600/20 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>+ Add Party</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.parties.map((party, index) => (
                <div key={index} className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      Party {index + 1} Details
                    </span>
                    {formData.parties.length > 1 && (
                      <button
                        onClick={() => removeParty(index)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={party.name}
                        onChange={(e) => handlePartyChange(index, 'name', e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                        placeholder="e.g. Jane Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Role / Capacity</label>
                      <input
                        type="text"
                        value={party.role}
                        onChange={(e) => handlePartyChange(index, 'role', e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                        placeholder="e.g. Employer, Service Provider, Disclosing Party"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Organization / Entity</label>
                      <input
                        type="text"
                        value={party.organization}
                        onChange={(e) => handlePartyChange(index, 'organization', e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                        placeholder="e.g. TechNova Inc."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Physical Address</label>
                      <input
                        type="text"
                        value={party.address}
                        onChange={(e) => handlePartyChange(index, 'address', e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                        placeholder="e.g. 100 Corporate Blvd, Suite 400, Wilmington, DE"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={party.email}
                        onChange={(e) => handlePartyChange(index, 'email', e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                        placeholder="e.g. jane@example.com"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Terms & Conditions */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white">Step 4 — Terms & Specific Clauses</h2>
                <p className="text-xs text-slate-400 mt-1">Add individual clauses or click "Generate Suggested Clauses".</p>
              </div>
              <button
                onClick={generateSuggestedClauses}
                className="inline-flex items-center space-x-1.5 rounded-lg bg-indigo-600/20 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Suggested Clauses</span>
              </button>
            </div>

            {/* Clause Input Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newClauseText}
                onChange={(e) => setNewClauseText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addClause()}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                placeholder="Enter a new clause requirement (e.g. Payment due within 30 days)..."
              />
              <button
                onClick={addClause}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                + Add Clause
              </button>
            </div>

            {/* Clauses List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {formData.terms.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No custom clauses added yet. Type a clause above or use suggested clauses.
                </div>
              ) : (
                formData.terms.map((term, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-200">
                    <span className="flex-1 pr-3"><strong className="text-indigo-400 mr-2">Clause {i + 1}:</strong> {term}</span>
                    <button
                      onClick={() => removeClause(i)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Branding */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Step 5 — Optional Document Branding</h2>
              <p className="text-xs text-slate-400 mt-1">Customize headers, footers, logo display, and author metadata for exported files.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Branded Company Name</label>
                  <input
                    type="text"
                    value={formData.branding.company_name}
                    onChange={(e) => setFormData({
                      ...formData,
                      branding: { ...formData.branding, company_name: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. TechNova Solutions Inc."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Document Footer Text</label>
                  <input
                    type="text"
                    value={formData.branding.footer_text}
                    onChange={(e) => setFormData({
                      ...formData,
                      branding: { ...formData.branding, footer_text: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Generated via LegalEase AI Platform"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Prepared By / Author Title</label>
                  <input
                    type="text"
                    value={formData.branding.author_name}
                    onChange={(e) => setFormData({
                      ...formData,
                      branding: { ...formData.branding, author_name: e.target.value }
                    })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Office of Legal Counsel"
                  />
                </div>
              </div>

              {/* Live Branding Preview Thumbnail */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 block">
                    Live Branding Thumbnail Preview
                  </span>
                  <div className="bg-white rounded-lg p-4 text-slate-900 text-[10px] space-y-2 border">
                    <div className="text-right text-indigo-700 font-bold uppercase border-b pb-1">
                      {formData.branding.company_name || 'YOUR BRAND NAME HERE'}
                    </div>
                    <div className="font-bold text-center text-xs pt-1">
                      {formData.title || 'DOCUMENT TITLE'}
                    </div>
                    <div className="text-slate-500 text-center italic text-[9px]">
                      Effective Date: {formData.effective_date}
                    </div>
                    <div className="pt-4 border-t text-center text-slate-400 text-[8px]">
                      {formData.branding.footer_text || 'Document Footer Text'} • Page 1
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 6: Review & AI Generation */}
        {currentStep === 6 && (
          <div className="space-y-6 text-center py-4">
            
            {loading ? (
              <div className="py-12 space-y-6">
                <Loader2 className="h-12 w-12 text-indigo-400 animate-spin mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Generating Your Legal Document</h3>
                  <p className="text-sm text-indigo-400 font-medium transition-all">
                    {loadingMessages[loadingStage]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 mx-auto">
                  <Sparkles className="h-8 w-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">Ready to Generate Document</h2>
                  <p className="text-xs text-slate-400 mt-1">Review your selections below before starting AI synthesis.</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-left text-xs space-y-2 text-slate-300">
                  <p><strong className="text-white">Document Type:</strong> {formData.document_type}</p>
                  <p><strong className="text-white">Title:</strong> {formData.title}</p>
                  <p><strong className="text-white">Effective Date:</strong> {formData.effective_date}</p>
                  <p><strong className="text-white">Jurisdiction:</strong> {formData.jurisdiction}</p>
                  <p><strong className="text-white">Parties Count:</strong> {formData.parties.length} ({formData.parties.map(p => p.name || 'Unnamed').join(', ')})</p>
                  <p><strong className="text-white">Clauses Count:</strong> {formData.terms.length}</p>
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-600 transition-all hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Legal Document</span>
                </button>
              </div>
            )}

          </div>
        )}

        {/* Bottom Navigation Control Buttons */}
        {!loading && (
          <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentStep < 6 && (
              <button
                onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
