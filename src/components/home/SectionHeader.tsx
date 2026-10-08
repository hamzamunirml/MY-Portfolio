import React from 'react';

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, title, highlight, subtitle }) => (
  <div className="text-center max-w-3xl mx-auto mb-12">
    <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/40 mb-4">
      {badge}
    </div>
    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
      {title}{' '}
      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{highlight}</span>
    </h2>
    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">{subtitle}</p>
  </div>
);
