import React from 'react';
import { 
  Sparkles, ShieldCheck, FileCheck2, ArrowRight, Download, Sliders, Lock, 
  CheckCircle2, FileText, Briefcase, Building2, Code2, Users, Handshake, Scale 
} from 'lucide-react';
import { DOCUMENT_TEMPLATES } from '../data/templates';

export default function LandingPage({ onStartGenerator, onSelectTemplate, setActiveTab }) {
  const popularTemplates = DOCUMENT_TEMPLATES.slice(0, 6);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Generate structured legal contracts and tailored agreements from basic party details and simple term requirements."
    },
    {
      icon: FileCheck2,
      title: "Smart Templates",
      description: "Access curated legal templates designed by professionals for NDAs, leases, software contracts, and employment terms."
    },
    {
      icon: Sliders,
      title: "Editable Documents",
      description: "Review, customize, and refine generated content in our rich paper editor before saving or exporting."
    },
    {
      icon: Download,
      title: "Multi-Format Export",
      description: "Export instantly to PDF, DOCX (Microsoft Word), or TXT formats with crisp typography and custom branding."
    },
    {
      icon: Scale,
      title: "Professional Formatting",
      description: "Maintain clear section numbers, definitions, terms tables, custom company headers, and legal signature blocks."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your sensitive contractual data is processed with strict security and environment-based key isolation."
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        {/* Glow background accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 mb-8 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>AI-assisted • Editable • Exportable • Secure</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight">
            Create Legal Documents. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Simplified by AI.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Generate professional, customizable legal documents in minutes — without starting from scratch. Formatted, branded, and ready for execution.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartGenerator()}
              className="w-full sm:w-auto flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-600 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              <span>Create a Document</span>
              <ArrowRight className="h-5 w-5 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
            >
              <span>Explore Templates</span>
            </button>
          </div>

          {/* Realistic Legal Document Mockup Graphic */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3 sm:p-6 shadow-2xl backdrop-blur-xl relative">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">LegalEase Workspace — Non-Disclosure Agreement.docx</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                    Live Preview
                  </span>
                  <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-300 border border-indigo-500/20">
                    PDF / DOCX Ready
                  </span>
                </div>
              </div>

              {/* Realistic Paper Container */}
              <div className="legal-paper text-left p-6 sm:p-10 rounded-xl max-w-3xl mx-auto text-slate-900 text-xs sm:text-sm shadow-xl space-y-4">
                <div className="text-right font-sans text-indigo-700 font-bold text-xs uppercase tracking-widest">
                  TECHNOVA SOLUTIONS INC.
                </div>

                <div className="text-center border-b pb-4">
                  <h2 className="text-base sm:text-lg font-bold tracking-tight font-serif text-slate-950">
                    MUTUAL NON-DISCLOSURE AGREEMENT
                  </h2>
                  <p className="text-xs text-slate-600 italic mt-1 font-serif">
                    EFFECTIVE DATE: APRIL 15, 2026  •  JURISDICTION: STATE OF DELAWARE
                  </p>
                </div>

                <p className="font-serif leading-relaxed text-slate-800">
                  THIS AGREEMENT is made by and between <strong>TechNova Solutions Inc.</strong> ("Disclosing Party") and <strong>Acme Innovations Corp</strong> ("Receiving Party").
                </p>

                <div className="space-y-2 font-serif text-slate-800">
                  <h3 className="font-bold text-xs text-slate-900">1. CONFIDENTIALITY COVENANTS</h3>
                  <p className="text-xs leading-relaxed text-slate-700">
                    Receiving Party covenants and agrees that it shall maintain all proprietary disclosures in strict confidence and shall not disclose code, financials, or customer records without prior express authorization.
                  </p>
                </div>

                <div className="space-y-2 font-serif text-slate-800">
                  <h3 className="font-bold text-xs text-slate-900">2. TERM & TERMINATION</h3>
                  <p className="text-xs leading-relaxed text-slate-700">
                    This Agreement commences on April 15, 2026 and shall remain in force for a period of two (2) years. Either party may terminate disclosures with 15 days written notice.
                  </p>
                </div>

                {/* Simulated Signature Block */}
                <div className="pt-6 grid grid-cols-2 gap-8 text-xs font-serif border-t mt-4">
                  <div>
                    <p className="font-bold">BY: Jane Doe</p>
                    <p className="text-slate-600">TITLE: VP Corporate Development</p>
                  </div>
                  <div>
                    <p className="font-bold">BY: Marcus Vance</p>
                    <p className="text-slate-600">TITLE: Managing Director</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Feature Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Everything You Need to Draft & Export Legal Contracts
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Engineered specifically for business professionals, founders, and teams requiring structured, reliable legal document generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Template Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Popular Legal Templates</h2>
            <p className="mt-2 text-slate-400">Start with a pre-configured template or customize your own from scratch.</p>
          </div>
          <button
            onClick={() => setActiveTab('templates')}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-indigo-400 font-semibold hover:text-indigo-300"
          >
            <span>View All Templates</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
                    {template.category}
                  </span>
                  <span className="text-xs text-slate-400">{template.difficulty}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {template.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {template.description}
                </p>
              </div>

              <button
                onClick={() => onSelectTemplate(template)}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <span>Use Template</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Disclaimer CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Generate Your Legal Document?
          </h2>
          <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto">
            Create structured, editable, and exportable contracts in under 3 minutes.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onStartGenerator()}
              className="flex items-center space-x-3 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-indigo-500 transition-all hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              <span>Get Started Free</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
