import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ExploreButtonProps {
  to: string;
  label: string;
}

export const ExploreButton: React.FC<ExploreButtonProps> = ({ to, label }) => (
  <div className="flex justify-center mt-12">
    <Link
      to={to}
      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 dark:shadow-blue-900/30 hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);
