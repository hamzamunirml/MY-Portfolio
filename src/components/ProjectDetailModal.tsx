import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Github, 
  ExternalLink, 
  Zap, 
  Layers, 
  CheckCircle2, 
  Database, 
  Cpu, 
  Code2 
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  isDarkMode
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header Image */}
          <div className="relative h-60 w-full overflow-hidden bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white shadow-md">
                  {project.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {project.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Overview */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-indigo-400 mb-2">
                Project Overview
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.fullDescription}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map(m => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80"
                >
                  <div className="text-[10px] font-semibold text-slate-400">{m.label}</div>
                  <div className="text-base font-bold text-blue-600 dark:text-indigo-400 mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Architecture Highlights */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-indigo-400 mb-3 flex items-center space-x-1.5">
                <Layers className="w-4 h-4" />
                <span>Architecture & Engineering Highlights</span>
              </h3>
              <div className="space-y-2">
                {project.architectureHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dataset Info if available */}
            {project.datasetInfo && (
              <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Dataset & Training Validation</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {project.datasetInfo}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-indigo-400 mb-2">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(t => (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-end space-x-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-white hover:border-blue-400 transition-colors flex items-center space-x-2 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
