import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  MapPin, 
  Clock, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { submitContactMessage } from '../lib/api';

interface ContactProps {
  isDarkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'AI/ML Engineering Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await submitContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'AI/ML Engineering Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setErrorMsg(
        'Could not reach the server right now. Please email me directly at ' + personalInfo.email + '.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800/40 mb-4">
            Let's Build Together
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Get in Touch with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Hamza</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Have an exciting AI project, model deployment challenge, or full-time opportunity? Reach out directly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Email Address
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Direct inbox for inquiries
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                <span className="truncate">{personalInfo.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center space-x-1 flex-shrink-0"
                  title="Copy Email"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass-card rounded-2xl p-5 hover:scale-105 transition-all flex flex-col justify-between"
              >
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    LinkedIn
                  </div>
                  <div className="text-[11px] text-slate-400">/in/hamza-munir-8b2159367</div>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="glass-card rounded-2xl p-5 hover:scale-105 transition-all flex flex-col justify-between"
              >
                <Github className="w-6 h-6 text-slate-900 dark:text-slate-100 mb-2" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    GitHub
                  </div>
                  <div className="text-[11px] text-slate-400">@hamzamunirml</div>
                </div>
              </a>
            </div>

            {/* Availability Status */}
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active Status: Available</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Typically responds within 2–4 hours. Open to full-time AI Engineering, RAG architecture, and consulting engagements.
              </p>
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-100">
                Send a Direct Message
              </h3>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! Your message has been sent successfully. Hamza will reply shortly.</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center space-x-2">
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full p-3.5 rounded-2xl text-sm border focus:outline-none focus:border-blue-500 bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full p-3.5 rounded-2xl text-sm border focus:outline-none focus:border-blue-500 bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3.5 rounded-2xl text-sm border focus:outline-none focus:border-blue-500 bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell Hamza about your project or opportunity..."
                    className="w-full p-3.5 rounded-2xl text-sm border focus:outline-none focus:border-blue-500 bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-200 dark:shadow-blue-900/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Hamza'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
