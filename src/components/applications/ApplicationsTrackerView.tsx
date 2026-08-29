import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Trash2,
  Edit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { ApplicationRecord, ApplicationStatus } from '../../types';
import { formatDate } from '../../lib/utils';

export const ApplicationsTrackerView: React.FC = () => {
  const {
    applications,
    updateAppStatus,
    refreshData,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Application Form state
  const [newAppForm, setNewAppForm] = useState({
    company: '',
    jobTitle: '',
    portalType: 'direct',
    status: 'applied' as ApplicationStatus,
    notes: '',
    interviewDate: ''
  });

  const columns: { id: ApplicationStatus; label: string; color: string }[] = [
    { id: 'saved', label: 'Saved', color: 'border-slate-700 bg-slate-900/40 text-slate-400' },
    { id: 'preparing', label: 'Preparing', color: 'border-blue-500/30 bg-blue-950/20 text-blue-300' },
    { id: 'applied', label: 'Applied', color: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300' },
    { id: 'assessment', label: 'Assessment', color: 'border-amber-500/30 bg-amber-950/20 text-amber-300' },
    { id: 'interview', label: 'Interview', color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' },
    { id: 'offer', label: 'Offer', color: 'border-purple-500/30 bg-purple-950/20 text-purple-300' },
    { id: 'rejected', label: 'Rejected', color: 'border-rose-500/30 bg-rose-950/20 text-rose-300' }
  ];

  const filteredApps = applications.filter(a => {
    const matchSearch =
      a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.notes && a.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchStatus = statusFilter === 'all' || a.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppForm.company || !newAppForm.jobTitle) {
      addToast('error', 'Missing fields', 'Company and Job Title are required.');
      return;
    }

    try {
      await api.createApplication({
        company: newAppForm.company,
        jobTitle: newAppForm.jobTitle,
        portalType: newAppForm.portalType,
        status: newAppForm.status,
        matchScoreAtApply: 85,
        submissionMethod: 'manual',
        userConfirmed: true,
        notes: newAppForm.notes,
        interviewDate: newAppForm.interviewDate || undefined
      });
      await refreshData();
      setIsAddModalOpen(false);
      setNewAppForm({
        company: '',
        jobTitle: '',
        portalType: 'direct',
        status: 'applied',
        notes: '',
        interviewDate: ''
      });
      addToast('success', 'Application Added', 'New opportunity tracked in your pipeline.');
    } catch (err: any) {
      addToast('error', 'Failed to add application', err.message);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Company', 'Job Title', 'Status', 'Applied Date', 'Match Score', 'Portal', 'Notes'];
    const rows = applications.map(a => [
      `"${a.company}"`,
      `"${a.jobTitle}"`,
      a.status,
      a.appliedAt || '',
      a.matchScoreAtApply || '',
      a.portalType || '',
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jobpilot_applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('success', 'CSV Exported', 'Downloaded your application pipeline.');
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Applications Tracker
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Organize, update, and manage your active interviews and job applications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Tab switch */}
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'kanban' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Table View
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Job</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by company, role, or interview note..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Stages ({applications.length})</option>
          {columns.map(c => (
            <option key={c.id} value={c.id}>
              {c.label} ({applications.filter(a => a.status === c.id).length})
            </option>
          ))}
        </select>
      </div>

      {/* Main Content: Kanban or Table */}
      {activeTab === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-4">
          {columns.map(col => {
            const appsInCol = filteredApps.filter(a => a.status === col.id);
            return (
              <div
                key={col.id}
                className="flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800/80 p-3 min-w-[240px] space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-1 py-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200">{col.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">
                      {appsInCol.length}
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-2 flex-1">
                  {appsInCol.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-2 shadow-sm group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                          {app.company}
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                          {app.matchScoreAtApply}%
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 font-medium">{app.jobTitle}</p>

                      {app.interviewDate && (
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(app.interviewDate)}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-850 text-[10px] text-slate-500">
                        <span>{app.appliedAt ? formatDate(app.appliedAt) : 'Saved'}</span>
                        <span className="capitalize">{app.portalType}</span>
                      </div>
                    </div>
                  ))}

                  {appsInCol.length === 0 && (
                    <div className="p-4 text-center text-[11px] text-slate-600 border border-dashed border-slate-850 rounded-xl">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-850 text-[10px]">
              <tr>
                <th className="p-4 font-semibold">Company &amp; Role</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Match</th>
                <th className="p-4 font-semibold">Applied Date</th>
                <th className="p-4 font-semibold">Interview Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-100">{app.company}</p>
                    <p className="text-slate-400 text-[11px]">{app.jobTitle}</p>
                  </td>
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={e => updateAppStatus(app.id, e.target.value as ApplicationStatus)}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 capitalize"
                    >
                      {columns.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-emerald-400 font-semibold">{app.matchScoreAtApply}%</span>
                  </td>
                  <td className="p-4 text-slate-400">{app.appliedAt ? formatDate(app.appliedAt) : '—'}</td>
                  <td className="p-4">
                    {app.interviewDate ? (
                      <span className="text-emerald-400 font-semibold">{formatDate(app.interviewDate)}</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">
                  {selectedApp.portalType} Portal
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedApp.jobTitle}</h3>
                <p className="text-xs text-slate-400">{selectedApp.company}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-200 text-sm p-1"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Change Stage</label>
                <select
                  value={selectedApp.status}
                  onChange={e => {
                    updateAppStatus(selectedApp.id, e.target.value as ApplicationStatus);
                    setSelectedApp({ ...selectedApp, status: e.target.value as ApplicationStatus });
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 capitalize font-semibold"
                >
                  {columns.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedApp.notes && (
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Application Notes</label>
                  <p className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-slate-300 leading-relaxed">
                    {selectedApp.notes}
                  </p>
                </div>
              )}

              {selectedApp.interviewDate && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Interview scheduled on {formatDate(selectedApp.interviewDate)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">Add External Job Application</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateApp} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stripe, Airbnb"
                  value={newAppForm.company}
                  onChange={e => setNewAppForm({ ...newAppForm, company: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newAppForm.jobTitle}
                  onChange={e => setNewAppForm({ ...newAppForm, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Current Status</label>
                  <select
                    value={newAppForm.status}
                    onChange={e => setNewAppForm({ ...newAppForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 capitalize"
                  >
                    {columns.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Portal Source</label>
                  <select
                    value={newAppForm.portalType}
                    onChange={e => setNewAppForm({ ...newAppForm, portalType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                  >
                    <option value="direct">Direct Company</option>
                    <option value="greenhouse">Greenhouse</option>
                    <option value="lever">Lever</option>
                    <option value="workday">Workday</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Notes / Context</label>
                <textarea
                  rows={2}
                  placeholder="Applied through referral, HR screener on Friday..."
                  value={newAppForm.notes}
                  onChange={e => setNewAppForm({ ...newAppForm, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md shadow-indigo-600/20"
                >
                  Add to Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
