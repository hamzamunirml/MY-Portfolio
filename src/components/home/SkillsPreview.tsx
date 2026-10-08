import React from 'react';
import { motion } from 'motion/react';
import { skillCategories } from '../../data/portfolioData';
import { getCategoryIcon } from '../skillIcons';
import { SectionHeader } from './SectionHeader';
import { ExploreButton } from './ExploreButton';

interface SkillsPreviewProps {
  isDarkMode: boolean;
}

export const SkillsPreview: React.FC<SkillsPreviewProps> = () => {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Technical Capabilities"
          title="Skills &"
          highlight="Tech Stack"
          subtitle="The languages, frameworks and tools I use to build and ship AI systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const top = [...cat.skills].sort((a, b) => Number(!!b.popular) - Number(!!a.popular)).slice(0, 5);
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="glass-card glass-card-hover rounded-3xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 shadow-sm">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{cat.title}</h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{cat.skills.length} skills</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {top.map((skill) => (
                    <span
                      key={skill.name}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <ExploreButton to="/skills" label="Explore All Skills" />
      </div>
    </section>
  );
};
