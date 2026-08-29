import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Check,
  Calendar,
  Building,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { formatDate } from '../../lib/utils';

export const RemindersView: React.FC = () => {
  const { reminders, toggleReminder, refreshData, addToast } = useApp();

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'follow_up' as const,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    note: ''
  });

  const filtered = reminders.filter(r => {
    if (filter === 'pending') return !r.completed;
    if (filter === 'completed') return r.completed;
    return true;
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company) {
      addToast('error', 'Missing Fields', 'Title and Company are required.');
      return;
    }

    try {
      await api.addReminder({
        title: formData.title,
        company: formData.company,
        type: formData.type,
        dueDate: new Date(formData.dueDate).toISOString(),
        completed: false,
        note: formData.note
      });
      await refreshData();
      setIsAddOpen(false);
      setFormData({
        title: '',
        company: '',
        type: 'follow_up',
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        note: ''
      });
      addToast('success', 'Reminder Scheduled', 'Added to your calendar.');
    } catch (err: any) {
      addToast('error', 'Failed to add reminder', err.message);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Action Reminders &amp; Calendar
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Stay on top of recruiter follow-ups, technical assessments, and interview prep.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Reminder</span>
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['pending', 'completed', 'all'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize border transition-all ${
              filter === tab
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {tab} ({reminders.filter(r => (tab === 'pending' ? !r.completed : tab === 'completed' ? r.completed : true)).length})
          </button>
        ))}
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No {filter} reminders</p>
            <p className="text-xs text-slate-500">You are all caught up on your scheduled follow-ups.</p>
          </div>
        ) : (
          filtered.map(rem => (
            <div
              key={rem.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                rem.completed
                  ? 'bg-slate-950/50 border-slate-850 opacity-60'
                  : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/40'
              }`}
            >
              <button
                onClick={() => toggleReminder(rem.id)}
                className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors mt-0.5 ${
                  rem.completed
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-700 hover:border-emerald-400 bg-slate-950'
                }`}
              >
                {rem.completed && <Check className="w-3.5 h-3.5" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wide">
                    {rem.type}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{rem.company}</span>
                </div>
                <h3 className={`text-sm font-bold mt-1 ${rem.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                  {rem.title}
                </h3>
                {rem.note && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rem.note}</p>}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Due: {formatDate(rem.dueDate)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Reminder Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">Schedule Action Reminder</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Reminder Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Technical interview with Staff Engineer"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stripe"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                  >
                    <option value="interview">Interview</option>
                    <option value="follow_up">Follow-Up</option>
                    <option value="assessment">Technical Assessment</option>
                    <option value="prep">Preparation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Due Date</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Notes / Links</label>
                <textarea
                  rows={2}
                  placeholder="Zoom link, topics to review..."
                  value={formData.note}
                  onChange={e => setFormData({ ...formData, note: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
