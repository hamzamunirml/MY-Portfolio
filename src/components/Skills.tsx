import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Eye, 
  BrainCircuit, 
  Server, 
  Sparkles, 
  Check, 
  Terminal, 
  Layers,
  Cpu
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { getCategoryIcon } from './skillIcons';

interface SkillsProps {
  isDarkMode: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...skillCategories.map(c => c.title)];

  const filteredCategories = selectedCategory === 'All'
    ? skillCategories
    : skillCategories.filter(c => c.title === selectedCategory);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/40 mb-4">
            Technical Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            AI & Engineering <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Deep learning, LLM & RAG, computer vision, data/MLOps and full-stack development.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="px-3 py-1.5 rounded-full glass-card">{skillCategories.length} categories</span>
            <span className="px-3 py-1.5 rounded-full glass-card">
              {skillCategories.reduce((n, c) => n + c.skills.length, 0)} skills
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 scale-105'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                className="glass-card rounded-3xl p-6 sm:p-8"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                  <div className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 shadow-sm">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                      {cat.title}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {cat.skills.length} Core Competencies
                    </span>
                  </div>
                </div>

                {/* Skills Progress Bars & Badges */}
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {skill.name}
                          </span>
                          {skill.popular && (
                            <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                              Core
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                            {skill.experience}
                          </span>
                          <span className="text-xs font-bold text-blue-600 dark:text-indigo-400">
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Highlighted Tech Badge Ribbon */}
        <div className="mt-12 glass-card rounded-3xl p-6 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Primary Frameworks & Libraries
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              'PyTorch', 'TensorFlow', 'LangChain', 'OpenCV', 'YOLOv8', 
              'FastAPI', 'ChromaDB', 'Docker', 'MLflow', 'Hugging Face',
              'Scikit-Learn', 'XGBoost', 'Evidently AI', 'Gemini API', 'Groq',
              'React', 'TypeScript', 'Tailwind CSS', 'Streamlit', 'PostgreSQL'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
