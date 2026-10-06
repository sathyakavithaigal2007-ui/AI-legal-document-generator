import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DisclaimerBanner from './components/DisclaimerBanner';
import Toast from './components/Toast';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import GeneratorWizard from './pages/GeneratorWizard';
import DocumentEditor from './pages/DocumentEditor';
import DocumentHistory from './pages/DocumentHistory';
import TemplateLibrary from './pages/TemplateLibrary';
import AboutHowItWorks from './pages/AboutHowItWorks';
import SecurityPrivacy from './pages/SecurityPrivacy';
import TermsDisclaimer from './pages/TermsDisclaimer';

import { getDocuments, fetchHealth } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [toast, setToast] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Load documents & health check on startup
  const loadDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.warn('Could not load documents from API:', err);
    }
  };

  useEffect(() => {
    loadDocuments();
    fetchHealth().then(res => {
      if (res.status === 'ok') {
        setIsDemoMode(false);
      }
    });
  }, []);

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  const handleStartGenerator = (template = null) => {
    setSelectedTemplate(template);
    setActiveTab('generator');
  };

  const handleDocumentGenerated = (newDoc) => {
    setCurrentDocument(newDoc);
    setDocuments(prev => [newDoc, ...prev]);
    setActiveTab('editor');
    showToast({ message: 'Document generated successfully!', type: 'success' });
  };

  const handleOpenDocument = (doc) => {
    setCurrentDocument(doc);
    setActiveTab('editor');
  };

  const handleDuplicateDocument = (doc) => {
    const dup = {
      ...doc,
      id: `temp-${Date.now()}`,
      title: `${doc.title} (Copy)`,
      created_at: new Date().toISOString()
    };
    setCurrentDocument(dup);
    setActiveTab('editor');
    showToast({ message: 'Document duplicated for editing', type: 'info' });
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setActiveTab('generator');
    showToast({ message: `Loaded template: ${template.name}`, type: 'info' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Legal Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewDocument={() => handleStartGenerator(null)}
        isDemoMode={isDemoMode}
      />

      {/* Page Body Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'landing' && (
          <LandingPage
            onStartGenerator={() => handleStartGenerator(null)}
            onSelectTemplate={handleSelectTemplate}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            documents={documents}
            onStartGenerator={() => handleStartGenerator(null)}
            onOpenDocument={handleOpenDocument}
            onSelectTemplate={handleSelectTemplate}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'generator' && (
          <GeneratorWizard
            selectedTemplate={selectedTemplate}
            onDocumentGenerated={handleDocumentGenerated}
            showToast={showToast}
          />
        )}

        {activeTab === 'editor' && (
          <DocumentEditor
            currentDocument={currentDocument}
            onSaveComplete={(updated) => {
              loadDocuments();
              setCurrentDocument(updated);
            }}
            showToast={showToast}
          />
        )}

        {activeTab === 'history' && (
          <DocumentHistory
            documents={documents}
            onOpenDocument={handleOpenDocument}
            onDuplicateDocument={handleDuplicateDocument}
            onStartGenerator={() => handleStartGenerator(null)}
            showToast={showToast}
            refreshDocuments={loadDocuments}
          />
        )}

        {activeTab === 'templates' && (
          <TemplateLibrary
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {activeTab === 'about' && (
          <AboutHowItWorks
            onStartGenerator={() => handleStartGenerator(null)}
          />
        )}

        {activeTab === 'security' && (
          <SecurityPrivacy />
        )}

        {activeTab === 'terms' && (
          <TermsDisclaimer />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Action Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
