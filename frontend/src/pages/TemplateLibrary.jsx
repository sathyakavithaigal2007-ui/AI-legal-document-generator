import React, { useState } from 'react';
import { BookOpen, ArrowRight, ShieldCheck, Search, Sparkles } from 'lucide-react';
import { DOCUMENT_TEMPLATES } from '../data/templates';

export default function TemplateLibrary({ onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Employment', 'Business', 'Real Estate', 'Freelance', 'Confidentiality', 'Partnership', 'General'];

  const filteredTemplates = DOCUMENT_TEMPLATES.filter((tpl) => {
    if (selectedCategory !== 'All' && tpl.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return tpl.name.toLowerCase().includes(q) || tpl.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Legal Template Marketplace</span>
        </span>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Smart Template Library</h1>
        <p className="text-sm text-slate-400">
          Select a legal template below to launch the step-by-step generator with pre-configured clauses.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-slate-900/95 transition-all shadow-md group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-indigo-500/10 px-3 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
                  {template.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{template.difficulty}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                {template.name}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {template.description}
              </p>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800/80 mb-6 text-xs text-slate-300 space-y-1">
                <strong className="block text-[10px] uppercase font-semibold text-slate-400">Recommended Use:</strong>
                <p className="text-slate-300">{template.recommendedUse}</p>
              </div>
            </div>

            <button
              onClick={() => onSelectTemplate(template)}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-colors"
            >
              <span>Use Template</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
