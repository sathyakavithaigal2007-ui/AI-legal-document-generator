import React, { useState } from 'react';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-2 pr-4">
          <ShieldAlert className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong className="font-semibold text-amber-300">Legal Disclaimer:</strong> LegalEase is an AI document generation tool, NOT a replacement for a attorney. All generated contracts should be reviewed by qualified legal counsel.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="rounded p-1 text-amber-300 hover:bg-amber-500/20 transition-colors"
          title="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
