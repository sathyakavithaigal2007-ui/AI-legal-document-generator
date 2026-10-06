import React from 'react';
import { ShieldCheck, Lock, Key, Server, EyeOff, FileCode } from 'lucide-react';

export default function SecurityPrivacy() {
  const pillars = [
    {
      icon: Key,
      title: "Environment Key Isolation",
      desc: "API credentials like GEMINI_API_KEY are strictly contained in secure server environment variables and never exposed to client-side code."
    },
    {
      icon: EyeOff,
      title: "No AI Model Training on User Data",
      desc: "Contract disclosures and party information processed through API requests are not used to train public foundation models."
    },
    {
      icon: Server,
      title: "Secure API Communication",
      desc: "All traffic between the React frontend and FastAPI backend moves over encrypted HTTPS channels."
    },
    {
      icon: Lock,
      title: "Local & Controlled Persistence",
      desc: "Your saved document records reside strictly within your designated database workspace with full CRUD deletion control."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Security & Privacy First</span>
        </span>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Data Protection Architecture</h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We maintain transparent technical safeguards for processing sensitive corporate and individual contractual information.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Honest Compliance Disclaimer */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-2 text-xs text-slate-400">
        <h4 className="font-bold text-white uppercase text-xs">Security Standards & Transparency</h4>
        <p>
          LegalEase employs standard encryption and environment protection practices. We do not claim third-party certifications (e.g. SOC2, ISO27001) unless specifically audited. Users remain responsible for evaluating data sensitivity before uploading proprietary records.
        </p>
      </div>

    </div>
  );
}
