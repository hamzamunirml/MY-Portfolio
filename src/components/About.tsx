import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Cpu, 
  Award, 
  Zap, 
  TrendingUp, 
  Sparkles, 
  CheckCircle,
  Database,
  Layers,
  Activity
} from 'lucide-react';
import { personalInfo, keyMetrics } from '../data/portfolioData';

interface AboutProps {
  isDarkMode: boolean;
}

export const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const pillars = [
    {
      title: 'Generative AI & RAG',
      description: 'Building retrieval-augmented generation apps using LangChain, ChromaDB, Sentence Transformers, and Gemini/Groq LLM APIs for document QA and content generation.',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Deep Learning & Computer Vision',
      description: 'Training CNN architectures (ResNet50, ConvNeXtTiny, EfficientNetV2) for medical image classification, with Grad-CAM explainability.',
      icon: Cpu,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'ML App Development & Deployment',
      description: 'Shipping end-to-end ML apps with FastAPI and Streamlit — from data pipeline and model training to live, deployed products.',
      icon: Database,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Award': return <Award className="w-5 h-5 text-purple-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      default: return <TrendingUp className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/40 mb-4">
            Background & Vision
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Engineering Intelligence from <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Data to Production</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Combining theoretical machine learning research with practical software architecture to engineer robust, scalable AI systems.
          </p>
        </div>

        {/* Top Grid: Bio + Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Detailed Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Hi, I'm Hamza Munir 👋
              </h3>
              <p className="leading-relaxed text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {personalInfo.aboutDetailed}
              </p>
              <p className="leading-relaxed text-sm sm:text-base text-slate-600 dark:text-slate-300">
                My approach focuses on <strong className="text-blue-600 dark:text-indigo-400 font-bold">model accuracy, explainability, and clean deployment</strong>. Whether it's a RAG pipeline or a medical imaging classifier, I prioritize clean code, testing, and measurable performance gains over hype.
              </p>
            </div>

            {/* Quick Highlights list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              {[
                '1+ Year Applied AI/ML Experience',
                'RAG & LLM App Builder',
                'Deep Learning CNNs & Medical Vision',
                'End-to-End Streamlit/FastAPI Deployment'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key Metric Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {keyMetrics.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover rounded-3xl p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 shadow-sm">
                    {getMetricIcon(stat.iconName)}
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-indigo-400 uppercase tracking-widest">
                    #{idx + 1}
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Pillars / Core Disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-md mb-5">
                  <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-indigo-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
