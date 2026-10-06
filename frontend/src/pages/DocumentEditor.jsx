import React, { useState, useEffect } from 'react';
import { 
  Download, Save, Edit3, Eye, Sparkles, Tag, Clock, FileText, CheckCircle2, 
  HelpCircle, AlertTriangle, Search, Undo, Redo, Copy, Globe, RefreshCw, ChevronRight, X
} from 'lucide-react';
import { saveDocument, updateDocument, downloadExport, aiAssist } from '../services/api';

export default function DocumentEditor({ currentDocument, onSaveComplete, showToast }) {
  const [doc, setDoc] = useState(currentDocument);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableContent, setEditableContent] = useState(doc?.content || '');
  const [editableTitle, setEditableTitle] = useState(doc?.title || 'Legal Document');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  // Search & Replace
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');

  // AI Assist Sidebar state
  const [selectedClause, setSelectedClause] = useState('');
  const [aiActionLoading, setAiActionLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [targetLang, setTargetLang] = useState('Spanish');

  useEffect(() => {
    if (currentDocument) {
      setDoc(currentDocument);
      setEditableContent(currentDocument.content || '');
      setEditableTitle(currentDocument.title || 'Legal Document');
    }
  }, [currentDocument]);

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const payload = {
        ...doc,
        title: editableTitle,
        content: editableContent
      };
      
      let saved;
      if (doc.id && !doc.id.startsWith('temp-')) {
        saved = await updateDocument(doc.id, { title: editableTitle, content: editableContent });
      } else {
        saved = await saveDocument(payload);
      }
      
      setDoc(saved);
      setSavedSuccess(true);
      showToast({ message: 'Changes saved successfully!', type: 'success' });
      if (onSaveComplete) onSaveComplete(saved);
    } catch (err) {
      console.error(err);
      showToast({ message: 'Failed to save changes.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async (format) => {
    try {
      showToast({ message: `Preparing ${format.toUpperCase()} download...`, type: 'info' });
      await downloadExport({ ...doc, title: editableTitle, content: editableContent }, format);
      showToast({ message: `${format.toUpperCase()} downloaded successfully!`, type: 'success' });
    } catch (err) {
      console.error(err);
      showToast({ message: err.message || `Download failed.`, type: 'error' });
    }
  };

  const handleReplaceAll = () => {
    if (!searchQuery) return;
    const regex = new RegExp(searchQuery, 'gi');
    const updated = editableContent.replace(regex, replaceQuery);
    setEditableContent(updated);
    showToast({ message: `Replaced occurrences of "${searchQuery}"`, type: 'success' });
  };

  const runAiAssist = async (action) => {
    const textToProcess = selectedClause.trim() || editableContent.slice(0, 500);
    setAiActionLoading(true);
    setAiResult(null);

    try {
      const res = await aiAssist({
        clause_text: textToProcess,
        action: action,
        target_language: targetLang,
        document_context: editableContent.slice(0, 1000)
      });
      setAiResult(res);
    } catch (err) {
      console.error(err);
      showToast({ message: 'AI Assist request failed.', type: 'error' });
    } finally {
      setAiActionLoading(false);
    }
  };

  const scrollToClauseSnippet = (snippet) => {
    if (!snippet) return;
    const element = document.getElementById('document-paper-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!doc) return null;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Action & Export Bar */}
      <div className="sticky top-16 z-30 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl backdrop-blur-md">
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              isEditMode
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isEditMode ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            <span>{isEditMode ? 'Preview Mode' : 'Edit Document'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>

          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Changes saved</span>
            </span>
          )}
        </div>

        {/* Multi-Format Export Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium mr-1 hidden lg:inline">Download:</span>
          
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center space-x-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-all"
          >
            <Download className="h-3.5 w-3.5 text-red-400" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => handleExport('docx')}
            className="flex items-center space-x-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 transition-all"
          >
            <Download className="h-3.5 w-3.5 text-blue-400" />
            <span>Download DOCX</span>
          </button>

          <button
            onClick={() => handleExport('txt')}
            className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-all"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Download TXT</span>
          </button>
        </div>

      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDEBAR: Key Clause Highlighting & Navigation */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Document Summary Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileText className="h-4 w-4 text-indigo-400" />
              <span>Document Summary</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Document Type</span>
                <span className="font-semibold text-white truncate max-w-[120px]">{doc.document_type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Effective Date</span>
                <span className="font-semibold text-white">{doc.effective_date}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Parties Involved</span>
                <span className="font-semibold text-white">{doc.summary?.party_count || doc.parties?.length || 2}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Total Clauses</span>
                <span className="font-semibold text-white">{doc.summary?.clause_count || 9}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400">Est. Reading Time</span>
                <span className="font-semibold text-indigo-400">{doc.summary?.estimated_read_time || '3 min read'}</span>
              </div>
            </div>
          </div>

          {/* Key Clauses Navigation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Tag className="h-4 w-4 text-indigo-400" />
              <span>Key Clause Navigator</span>
            </h3>
            <p className="text-[11px] text-slate-400">Click a clause tag to scroll directly to the provision.</p>

            <div className="flex flex-wrap gap-2">
              {(doc.key_clauses || []).map((kc, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToClauseSnippet(kc.snippet)}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <span>{kc.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search & Replace Tool */}
          {isEditMode && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Search className="h-4 w-4 text-indigo-400" />
                <span>Search & Replace</span>
              </h3>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find text..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                value={replaceQuery}
                onChange={(e) => setReplaceQuery(e.target.value)}
                placeholder="Replace with..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
              />
              <button
                onClick={handleReplaceAll}
                className="w-full rounded-lg bg-indigo-600 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Replace All
              </button>
            </div>
          )}

        </div>

        {/* CENTER / MAIN: Document Viewer Paper or Editor */}
        <div className="lg:col-span-6 space-y-6">
          
          {isEditMode ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase">Document Editor</span>
                <span className="text-[11px] text-slate-400">Directly modify clauses and text below</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  value={editableTitle}
                  onChange={(e) => setEditableTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contract Content</label>
                <textarea
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  rows={26}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs sm:text-sm font-mono text-slate-200 focus:border-indigo-500 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          ) : (
            <div id="document-paper-container" className="legal-paper p-8 sm:p-12 rounded-2xl border shadow-2xl space-y-6 text-slate-900">
              
              {/* Header Branding */}
              {doc.branding?.company_name && (
                <div className="text-right text-xs font-bold text-indigo-800 uppercase tracking-wider font-sans border-b pb-2">
                  {doc.branding.company_name}
                </div>
              )}

              {/* Title Header */}
              <div className="text-center space-y-2 border-b pb-6">
                <h1 className="text-xl sm:text-2xl font-bold font-serif uppercase tracking-tight text-slate-950">
                  {editableTitle}
                </h1>
                <p className="text-xs font-serif text-slate-600 italic">
                  EFFECTIVE DATE: {doc.effective_date}  •  JURISDICTION: {doc.jurisdiction}
                </p>
              </div>

              {/* Body Text */}
              <div className="text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-wrap text-slate-800">
                {editableContent}
              </div>

              {/* Footer */}
              <div className="text-center text-[10px] font-sans text-slate-400 pt-8 border-t">
                {doc.branding?.footer_text || 'Generated via LegalEase AI Document Engine'}  •  Page 1
              </div>

            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR: AI Assistant Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>AI Assist Panel</span>
              </h3>
              <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Gemini 2.5
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Select a action to refine clauses, simplify language, or translate content.
            </p>

            {/* Target Language for Translation */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Translation Language</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white"
              >
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => runAiAssist('explain')}
                disabled={aiActionLoading}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
              >
                <span>Explain Clause (Plain Language)</span>
                <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
              </button>

              <button
                onClick={() => runAiAssist('simplify')}
                disabled={aiActionLoading}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
              >
                <span>Simplify Language</span>
                <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
              </button>

              <button
                onClick={() => runAiAssist('improve')}
                disabled={aiActionLoading}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
              >
                <span>Improve & Legalize Clause</span>
                <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
              </button>

              <button
                onClick={() => runAiAssist('suggest_missing')}
                disabled={aiActionLoading}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
              >
                <span>Suggest Missing Provisions</span>
                <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
              </button>

              <button
                onClick={() => runAiAssist('translate')}
                disabled={aiActionLoading}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
              >
                <span>Translate Clause</span>
                <Globe className="h-3.5 w-3.5 text-indigo-400" />
              </button>
            </div>

            {/* AI Action Result Output Card */}
            {aiActionLoading && (
              <div className="py-6 text-center text-xs text-indigo-400 flex items-center justify-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Processing AI response...</span>
              </div>
            )}

            {aiResult && !aiActionLoading && (
              <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-4 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-indigo-300 uppercase tracking-wider">{aiResult.action} Result</span>
                  <button onClick={() => setAiResult(null)} className="text-slate-500 hover:text-white">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="text-slate-200 leading-relaxed font-sans">{aiResult.result_text}</p>

                {aiResult.potential_concerns && aiResult.potential_concerns.length > 0 && (
                  <div className="space-y-1 text-amber-300 pt-2 border-t border-slate-800">
                    <strong className="block text-[10px] uppercase font-semibold">Potential Concerns / Risks:</strong>
                    {aiResult.potential_concerns.map((c, i) => (
                      <p key={i} className="text-[11px]">• {c}</p>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-slate-500 italic pt-1">{aiResult.disclaimer}</p>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
