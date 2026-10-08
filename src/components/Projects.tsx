import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ArrowUpRight,
  BrainCircuit,
  Eye,
  FileText,
  Server,
  Zap
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';

interface ProjectsProps {
  isDarkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ isDarkMode, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { projects: projectsData, isLive } = useProjects();

  const categories = ['All', 'GenAI/RAG', 'Computer Vision', 'NLP', 'MLOps', 'Machine Learning', 'Full-Stack'];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/40 mb-4">
            <span>Featured Work</span>
            {isLive && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live API
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            AI Systems & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Machine Learning Projects</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Deep learning, LLM/RAG apps, computer vision, MLOps and full-stack projects, {projectsData.length} in total.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 scale-105'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between"
              >
                {/* Image Preview & Category Badge */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill Top Left */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 shadow-md">
                    {project.category}
                  </div>

                  {/* Primary Metric Badge Bottom Right */}
                  {project.metrics[0] && (
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-lg flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{project.metrics[0].label}: {project.metrics[0].value}</span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {/* Secondary Metrics Row */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.metrics.slice(1, 3).map((m) => (
                        <div
                          key={m.label}
                          className="p-2 rounded-xl text-left bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px]"
                        >
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">{m.label}</span>
                          <span className="font-bold text-blue-600 dark:text-indigo-400">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-6 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Architecture & Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center space-x-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                          title="View GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
