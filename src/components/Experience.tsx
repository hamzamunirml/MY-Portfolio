import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  GraduationCap,
  Building2
} from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { useExperience } from '../hooks/useExperience';

interface ExperienceProps {
  isDarkMode: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ isDarkMode }) => {
  const { experience: experiencesData, isLive } = useExperience();
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/40 mb-4">
            <span>Career & Education</span>
            {isLive && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live API
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Professional <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Trajectory</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Internship experience, academic projects, and formal education driving hands-on AI/ML growth.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 mb-20">
          {experiencesData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Icon Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Card Body */}
              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {exp.role}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-indigo-400 font-semibold mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-normal">{exp.type}</span>
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

                <p className="text-sm leading-relaxed mb-4 text-slate-600 dark:text-slate-300">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 mb-6">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
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

        {/* Education Sub-Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Education
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {educationData.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-indigo-400" />
                    <span className="text-[10px] font-semibold text-slate-400">{edu.period}</span>
                  </div>
                  <h4 className="text-sm font-bold leading-snug text-slate-900 dark:text-slate-100">
                    {edu.degree}
                  </h4>
                  <div className="text-xs text-blue-600 dark:text-indigo-400 mt-1 font-semibold">
                    {edu.institute}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                  {edu.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
