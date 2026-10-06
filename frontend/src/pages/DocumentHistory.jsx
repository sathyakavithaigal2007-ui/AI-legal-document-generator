import React, { useState } from 'react';
import { 
  Search, FolderOpen, FileText, Download, Edit3, Trash2, Copy, Filter, Calendar, Building2, Plus 
} from 'lucide-react';
import { deleteDocument, downloadExport } from '../services/api';

export default function DocumentHistory({ documents, onOpenDocument, onDuplicateDocument, onStartGenerator, showToast, refreshDocuments }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Contracts', 'NDAs', 'Leases', 'Employment', 'Other'];

  const filteredDocs = documents.filter((doc) => {
    const dType = (doc.document_type || '').toLowerCase();
    const title = (doc.title || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    // Filter by Category
    if (selectedCategory !== 'All') {
      const cat = selectedCategory.toLowerCase();
      if (cat === 'contracts' && !dType.includes('contract') && !dType.includes('agreement')) return false;
      if (cat === 'ndas' && !dType.includes('nda') && !dType.includes('disclosure')) return false;
      if (cat === 'leases' && !dType.includes('lease')) return false;
      if (cat === 'employment' && !dType.includes('employment') && !dType.includes('offer')) return false;
    }

    // Filter by Search Query
    if (query && !title.includes(query) && !dType.includes(query)) {
      return false;
    }

    return true;
  });

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteDocument(id);
      showToast({ message: 'Document deleted successfully', type: 'success' });
      if (refreshDocuments) refreshDocuments();
    } catch (err) {
      console.error(err);
      showToast({ message: 'Failed to delete document', type: 'error' });
    }
  };

  const handleExport = async (doc, format) => {
    try {
      showToast({ message: `Preparing ${format.toUpperCase()} download...`, type: 'info' });
      await downloadExport(doc, format);
      showToast({ message: `${format.toUpperCase()} downloaded!`, type: 'success' });
    } catch (err) {
      console.error(err);
      showToast({ message: 'Export failed.', type: 'error' });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Documents</h1>
          <p className="text-xs text-slate-400 mt-1">Manage, search, edit, and export all your generated legal drafts.</p>
        </div>

        <button
          onClick={onStartGenerator}
          className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Document</span>
        </button>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by name or type..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
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

      {/* Document Grid / Table */}
      {filteredDocs.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 space-y-4">
          <FolderOpen className="h-12 w-12 mx-auto text-slate-600" />
          <h3 className="text-lg font-bold text-white">No matching documents found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or create a new legal document using our AI generator.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-sm group"
            >
              <div>
                {/* Header Tag & Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300 border border-indigo-500/20">
                    {doc.document_type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {doc.effective_date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2 line-clamp-1">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed font-serif bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                  {doc.content}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Status</span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-400 border border-emerald-500/20">
                    {doc.status || 'Draft'}
                  </span>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between gap-1 pt-1">
                  <button
                    onClick={() => onOpenDocument(doc)}
                    className="flex-1 flex items-center justify-center space-x-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Open / Edit</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleExport(doc, 'pdf')}
                      title="Download PDF"
                      className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => onDuplicateDocument(doc)}
                      title="Duplicate Document"
                      className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(doc.id, doc.title)}
                      title="Delete Document"
                      className="rounded-lg bg-slate-800 p-2 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
