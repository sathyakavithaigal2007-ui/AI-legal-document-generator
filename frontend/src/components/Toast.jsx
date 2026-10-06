import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 rounded-xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md animate-bounce-short">
      {isError ? (
        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
      ) : isInfo ? (
        <Info className="h-5 w-5 text-indigo-400 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
      )}
      <div className="text-sm font-medium text-slate-200">
        {toast.message}
      </div>
      <button
        onClick={onClose}
        className="ml-2 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
