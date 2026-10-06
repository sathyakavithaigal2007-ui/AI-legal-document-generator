import React, { useState } from 'react';
import { Scale, Plus, Menu, X, FileText, LayoutDashboard, FolderOpen, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onNewDocument, isDemoMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'Generator', icon: Sparkles },
    { id: 'templates', label: 'Templates', icon: BookOpen },
    { id: 'history', label: 'Your Documents', icon: FolderOpen },
    { id: 'about', label: 'How It Works', icon: FileText },
    { id: 'security', label: 'Privacy & Security', icon: ShieldCheck },
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('landing')} 
          className="flex cursor-pointer items-center space-x-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">Legal<span className="text-indigo-400">Ease</span></span>
              {isDemoMode && (
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/30">
                  Demo Mode
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">AI-Powered Document Generator</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => {
              onNewDocument();
              setActiveTab('generator');
            }}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Create Document</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-800 text-left'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                onNewDocument();
                handleNav('generator');
              }}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 py-3 text-base font-semibold text-white shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Document</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
