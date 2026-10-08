import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { useExperience } from '../../hooks/useExperience';
import { SectionHeader } from './SectionHeader';
import { ExploreButton } from './ExploreButton';

interface ExperiencePreviewProps {
  isDarkMode: boolean;
}

// Home shows internships only; the full Experience page also shows coursework and education.
export const ExperiencePreview: React.FC<ExperiencePreviewProps> = () => {
  const { experience } = useExperience();
  const internships = experience.filter((e) => e.type === 'Internship');

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Experience"
          title="Internship"
          highlight="Experience"
          subtitle="Hands-on AI/ML work in real teams, with real deadlines."
        />

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {internships.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>

              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                    <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-indigo-400 font-semibold mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="hidden sm:flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4 text-slate-600 dark:text-slate-300">{exp.description}</p>

                <div className="space-y-2 mb-4">
                  {exp.achievements.slice(0, 2).map((ach, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                  {exp.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ExploreButton to="/experience" label="Explore Experience & Education" />
      </div>
    </section>
  );
};
