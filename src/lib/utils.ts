import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min?: number, max?: number, currency: string = 'USD'): string {
  if (!min && !max) return 'Salary not disclosed';
  const sym = currency === 'USD' ? '$' : currency;
  if (min && max) {
    return `${sym}${(min / 1000).toFixed(0)}k – ${sym}${(max / 1000).toFixed(0)}k/yr`;
  }
  if (min) return `From ${sym}${(min / 1000).toFixed(0)}k/yr`;
  if (max) return `Up to ${sym}${(max / 1000).toFixed(0)}k/yr`;
  return '';
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateString;
  }
}

export function getScoreColor(score: number): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  bar: string;
} {
  if (score >= 90) {
    return {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      bar: 'bg-emerald-500'
    };
  }
  if (score >= 80) {
    return {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      bar: 'bg-blue-500'
    };
  }
  if (score >= 65) {
    return {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      bar: 'bg-amber-500'
    };
  }
  return {
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    bar: 'bg-rose-500'
  };
}
