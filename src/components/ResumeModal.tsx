import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  Github, 
  Linkedin, 
  GraduationCap
} from 'lucide-react';
import { personalInfo, educationData, skillCategories } from '../data/portfolioData';
import { useExperience } from '../hooks/useExperience';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [copied, setCopied] = useState(false);
  const { experience: experiencesData } = useExperience();

  if (!isOpen) return null;

  const handleCopyCVText = () => {
    const cvContent = `
HAMZA MUNIR
AI/ML Engineer
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}

SUMMARY:
${personalInfo.aboutDetailed}

WORK EXPERIENCE:
${experiencesData.map(e => `${e.role} @ ${e.company} (${e.period})\n- ${e.achievements.join('\n- ')}`).join('\n\n')}

EDUCATION:
${educationData.map(e => `- ${e.degree}, ${e.institute} (${e.period})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(cvContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTrigger = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumeDownloadUrl;
    link.download = 'Hamza_Munir_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Top Modal Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Hamza Munir — Curriculum Vitae</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Verified Engineer Record</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyCVText}
                className="px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold hover:border-blue-400 transition-colors flex items-center space-x-1"
                title="Copy CV text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleDownloadTrigger}
                className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable CV Body Scrollable */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0">
            
            {/* Header Header Info */}
            <div className="border-b pb-6 border-slate-200/80 dark:border-slate-800/80">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Hamza Munir</h1>
              <div className="text-lg font-semibold text-blue-600 dark:text-indigo-400 mt-1">
                AI / Machine Learning Engineer
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-3">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
                  <span>{personalInfo.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Github className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
                  <span>github.com/hamzamunirml</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
                  <span>linkedin.com/in/hamza-munir-8b2159367</span>
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-indigo-400">
                Executive Summary
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {personalInfo.aboutDetailed}
              </p>
            </div>

            {/* Core Skills Matrix */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-indigo-400">
                Technical Stack & Expertise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {skillCategories.map(cat => (
                  <div key={cat.title} className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
                    <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">{cat.title}</div>
                    <div className="text-slate-500 dark:text-slate-400 font-medium">
                      {cat.skills.map(s => s.name).join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-indigo-400">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experiencesData.map(exp => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div className="font-bold text-base text-slate-900 dark:text-slate-100">
                        {exp.role} <span className="text-blue-600 dark:text-indigo-400 font-semibold">@ {exp.company}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{exp.period}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{exp.description}</p>
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1 pl-1">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-indigo-400">
                Education
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {educationData.map(e => (
                  <div key={e.degree} className="flex justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{e.degree} ({e.institute})</span>
                    <span className="font-semibold text-blue-600 dark:text-indigo-400">{e.period}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
