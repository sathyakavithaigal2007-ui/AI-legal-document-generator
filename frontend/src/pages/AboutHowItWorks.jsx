import React from 'react';
import { Sparkles, FileText, Sliders, Download, CheckCircle2, ShieldCheck, Scale } from 'lucide-react';

export default function AboutHowItWorks({ onStartGenerator }) {
  const steps = [
    {
      num: '01',
      title: 'Select Document Type',
      desc: 'Choose from structured presets like NDAs, Employment Contracts, Leases, or launch a custom legal document prompt.'
    },
    {
      num: '02',
      title: 'Input Party Information & Terms',
      desc: 'Enter involved party names, legal capacities, jurisdiction, effective date, and key covenants or clauses.'
    },
    {
      num: '03',
      title: 'AI Synthesis via Google Gemini',
      desc: 'Our backend processes parameters through structured prompt engineering, outputting formal legal sections.'
    },
    {
      num: '04',
      title: 'Preview, Edit & Enhance',
      desc: 'Review document output, refine wording in edit mode, and use AI Assist to explain or simplify complex clauses.'
    },
    {
      num: '05',
      title: 'Export in PDF, DOCX, or TXT',
      desc: 'Download your finalized agreement complete with custom branding, headers, terms tables, and signature blocks.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <FileText className="h-3.5 w-3.5" />
          <span>Platform Workflow</span>
        </span>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">About LegalEase & How It Works</h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          LegalEase bridges advanced artificial intelligence with legal technology to make contract creation fast, structured, and accessible.
        </p>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.num} className="flex items-start space-x-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-extrabold text-lg flex-shrink-0">
              {step.num}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-950 p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Scale className="h-5 w-5 text-indigo-400" />
          <span>Our AI & Legal Philosophy</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          We believe artificial intelligence should streamline legal drafting, reduce repetitive boilerplate creation, and clarify complex legalese for non-lawyers. However, AI software does not replace legal professionals. We advise all users to have important agreements reviewed by qualified attorneys before signing.
        </p>
        <button
          onClick={onStartGenerator}
          className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          <span>Start Generator Now</span>
        </button>
      </div>

    </div>
  );
}
