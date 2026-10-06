import React from 'react';
import { AlertTriangle, FileCheck, Scale } from 'lucide-react';

export default function TermsDisclaimer() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Terms & Legal Disclaimer</span>
        </span>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Platform Terms of Use</h1>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
        
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">1. NOT LEGAL ADVICE</h2>
          <p>
            LegalEase provides automated AI document generation software and legal information templates. The content produced by the platform does NOT constitute formal legal advice, legal representation, or a substitute for a licensed attorney in your jurisdiction.
          </p>
        </div>

        <div className="space-y-2 border-b border-slate-800 pb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">2. NO ATTORNEY-CLIENT RELATIONSHIP</h2>
          <p>
            Use of LegalEase, including generation or modification of contracts through AI prompts, does not establish an attorney-client relationship between you and LegalEase Inc. or any of its officers or affiliates.
          </p>
        </div>

        <div className="space-y-2 border-b border-slate-800 pb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">3. USER RESPONSIBILITY FOR REVIEW</h2>
          <p>
            Laws and statutory requirements vary across jurisdictions and change frequently. Users are solely responsible for reviewing all generated content, ensuring compliance with local statutes, and consulting appropriate legal counsel before executing important documents.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">4. LIMITATION OF LIABILITY</h2>
          <p>
            To the maximum extent permitted by law, LegalEase shall not be liable for any direct, indirect, incidental, or consequential damages resulting from reliance on generated documents or platform software.
          </p>
        </div>

      </div>

    </div>
  );
}
