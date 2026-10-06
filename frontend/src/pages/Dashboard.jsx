import React from 'react';
import { 
  Plus, FileText, Clock, Sparkles, FolderOpen, ArrowRight, ShieldCheck, Download, Trash2, Edit3, BookOpen
} from 'lucide-react';
import { DOCUMENT_TEMPLATES } from '../data/templates';

export default function Dashboard({ documents, onStartGenerator, onOpenDocument, onSelectTemplate, setActiveTab }) {
  const recentDocs = documents.slice(0, 5);

  const stats = [
    { label: 'Documents Created', value: documents.length, icon: FileText, change: '+12% from last month' },
    { label: 'Documents This Month', value: Math.min(documents.length, 3), icon: Clock, change: 'Active workspace' },
    { label: 'Saved Templates', value: DOCUMENT_TEMPLATES.length, icon: BookOpen, change: 'Ready for use' },
    { label: 'Formats Supported', value: 'PDF / DOCX / TXT', icon: Download, change: 'Branded exports' }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Good day, Legal Tech Specialist 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            What legal contract or agreement would you like to create today?
          </p>
        </div>

        <button
          onClick={() => onStartGenerator()}
          className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-600 transition-all hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>+ Create New Document</span>
        </button>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-2 text-xs text-indigo-400 font-medium">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch & Recent Documents Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Documents Table/Cards */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Recent Documents</h2>
                <p className="text-xs text-slate-400">Access and edit your generated legal drafts</p>
              </div>
              <button
                onClick={() => setActiveTab('history')}
                className="text-xs text-indigo-400 font-semibold hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>View All ({documents.length})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {recentDocs.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-3">
                <FolderOpen className="h-10 w-10 mx-auto text-slate-600" />
                <p className="text-sm">No documents generated yet.</p>
                <button
                  onClick={() => onStartGenerator()}
                  className="text-xs text-indigo-400 font-semibold underline"
                >
                  Create your first contract
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 hover:border-indigo-500/40 transition-all group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {doc.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5">
                          <span>{doc.document_type}</span>
                          <span>•</span>
                          <span>Effective: {doc.effective_date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="hidden sm:inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        {doc.status || 'Draft'}
                      </span>
                      <button
                        onClick={() => onOpenDocument(doc)}
                        className="flex items-center space-x-1.5 rounded-lg bg-indigo-600/20 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Open</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Popular Templates Quick Start */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Quick Templates</h2>
            <button
              onClick={() => setActiveTab('templates')}
              className="text-xs text-indigo-400 font-semibold hover:text-indigo-300"
            >
              Browse All
            </button>
          </div>

          <div className="space-y-3">
            {DOCUMENT_TEMPLATES.slice(0, 4).map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => onSelectTemplate(tpl)}
                className="cursor-pointer rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {tpl.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{tpl.category}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
