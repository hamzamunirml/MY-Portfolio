import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  BrainCircuit, 
  Cpu, 
  CheckCircle2, 
  Terminal,
  Zap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  isDarkMode: boolean;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode, onOpenResume }) => {
  // Typing Effect state
  const [typedIndex, setTypedIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const titles = personalInfo.typedTitles;
    const currentFullTitle = titles[typedIndex % titles.length];

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === currentFullTitle) {
      typingSpeed = 2200; // pause at end
      const timer = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timer);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTypedIndex((prev) => prev + 1);
      typingSpeed = 300;
    }

    const timer = setTimeout(() => {
      setCurrentText(
        isDeleting
          ? currentFullTitle.substring(0, currentText.length - 1)
          : currentFullTitle.substring(0, currentText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typedIndex]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Glowing Ambient Blobs */}
      <div className="bg-blob w-[600px] h-[600px] -top-40 -left-40 opacity-70" />
      <div className="bg-blob w-[500px] h-[500px] top-1/2 -right-20 opacity-50" />
      <div className="bg-blob w-[400px] h-[400px] -bottom-20 left-1/3 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE CONTENT - GLASS CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-left relative overflow-hidden"
          >
            <div className="space-y-6">
              {/* Available for projects pill badge */}
              <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/40">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                Available for Projects
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none">
                  {personalInfo.name}
                </h1>
                <div className="h-10 sm:h-12 flex items-center">
                  <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent italic">
                    {currentText}
                    <span className="animate-pulse text-indigo-500">|</span>
                  </h2>
                </div>
              </div>

              {/* Short Intro */}
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-xl">
                {personalInfo.bio}
              </p>

              {/* Tech Pill Row */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Python', 'TensorFlow/Keras', 'LLMs & RAG', 'Computer Vision', 'FastAPI', 'Streamlit'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8">
              {/* View Projects Button */}
              <Link
                to="/projects"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 dark:shadow-blue-900/30 hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Download CV Button */}
              <button
                onClick={onOpenResume}
                className="px-8 py-4 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Download CV</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE AVATAR CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Avatar Glass Card */}
            <div className="glass-card rounded-3xl p-4 relative overflow-hidden flex-1 flex flex-col justify-between items-center min-h-[380px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden group border border-white/50 dark:border-slate-800">
                <img
                  src={personalInfo.avatarImage}
                  alt="Hamza Munir AI Engineer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Tech Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Quick Stat Bar Glass Card */}
            <div className="glass-card rounded-3xl p-5 flex items-center justify-between text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">99.93% AUC</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">CNN Medical AI</div>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">15+ Projects</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">LLM & Vision Pipelines</div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
