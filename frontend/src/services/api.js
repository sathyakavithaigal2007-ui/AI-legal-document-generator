const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Backend health check failed');
    return await res.json();
  } catch (err) {
    console.warn('API health check error:', err);
    return { status: 'offline' };
  }
}

export async function generateDocument(payload) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Generation failed' }));
    throw new Error(errorData.detail || 'Failed to generate document from AI engine');
  }
  return await res.json();
}

export async function aiAssist(payload) {
  const res = await fetch(`${API_BASE}/ai-assist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'AI assist failed' }));
    throw new Error(errorData.detail || 'AI Assist action failed');
  }
  return await res.json();
}

export async function getDocuments(query = '', category = 'All') {
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (category) params.append('category', category);
  
  const res = await fetch(`${API_BASE}/documents?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch document history');
  return await res.json();
}

export async function getDocumentById(id) {
  const res = await fetch(`${API_BASE}/documents/${id}`);
  if (!res.ok) throw new Error('Document not found');
  return await res.json();
}

export async function saveDocument(payload) {
  const res = await fetch(`${API_BASE}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save document');
  return await res.json();
}

export async function updateDocument(id, payload) {
  const res = await fetch(`${API_BASE}/documents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update document');
  return await res.json();
}

export async function deleteDocument(id) {
  const res = await fetch(`${API_BASE}/documents/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete document');
  return await res.json();
}

export async function downloadExport(docData, format) {
  const endpoint = `${API_BASE}/documents/export/${format.toLowerCase()}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(docData)
  });
  
  if (!res.ok) {
    throw new Error(`We couldn't prepare your ${format.toUpperCase()} file. Please try again.`);
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const sanitizedTitle = (docData.title || 'document').toLowerCase().replace(/[^a-z0-9]/g, '_');
  a.download = `${sanitizedTitle}.${format.toLowerCase()}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
