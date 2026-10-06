import React from 'react';
import { Scale, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Scale className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">LegalEase</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered legal document generator helping teams, businesses, and individuals draft customizable contracts in minutes.
            </p>
            <div className="flex items-center space-x-2 text-xs text-indigo-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>AI-assisted • Editable • Exportable • Secure</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('generator')} className="hover:text-indigo-400 transition-colors">Document Generator</button></li>
              <li><button onClick={() => setActiveTab('templates')} className="hover:text-indigo-400 transition-colors">Template Library</button></li>
              <li><button onClick={() => setActiveTab('history')} className="hover:text-indigo-400 transition-colors">Your Documents</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-indigo-400 transition-colors">User Dashboard</button></li>
            </ul>
          </div>

          {/* Document Types */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Popular Documents</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Non-Disclosure Agreements (NDA)</li>
              <li>Employment Contracts</li>
              <li>Freelance Work Agreements</li>
              <li>Commercial Lease Agreements</li>
              <li>Employment Offer Letters</li>
              <li>B2B Service Agreements</li>
            </ul>
          </div>

          {/* Security & Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal & Safety</h3>
            <ul className="space-y-2.5 text-sm mb-4">
              <li><button onClick={() => setActiveTab('about')} className="hover:text-indigo-400 transition-colors">How It Works</button></li>
              <li><button onClick={() => setActiveTab('security')} className="hover:text-indigo-400 transition-colors">Security Architecture</button></li>
              <li><button onClick={() => setActiveTab('terms')} className="hover:text-indigo-400 transition-colors">Terms & Disclaimer</button></li>
            </ul>
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 text-xs text-slate-400 space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold text-amber-400">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Legal Information Tool</span>
              </div>
              <p>LegalEase provides document generation software. We are not a law firm and do not provide formal legal advice.</p>
            </div>
          </div>

        </div>

        {/* Legal Advice Notice */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 text-xs text-slate-400 leading-relaxed mb-8 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">PROFESSIONAL DISCLAIMER:</strong> LegalEase provides AI-assisted document generation and legal information tools. Generated documents may contain errors or omissions and should not be considered binding legal advice. Before executing or relying on any contract for critical legal matters, review the output with a licensed legal professional in your jurisdiction.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-900 pt-6 text-xs text-slate-400 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} LegalEase Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => setActiveTab('terms')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => setActiveTab('security')} className="hover:text-slate-300">Security</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
