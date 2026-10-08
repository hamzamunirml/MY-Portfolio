import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { ResumeModal } from './components/ResumeModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { Project } from './types';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen font-sans transition-colors duration-300 relative selection:bg-purple-500 selection:text-white ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>
        {/* Dynamic Neural Node Canvas Background */}
        <BackgroundCanvas isDarkMode={isDarkMode} />

        {/* Navigation Header */}
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <ScrollToTop />

        {/* Routed Page Content */}
        <main className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isDarkMode={isDarkMode}
                  onOpenResume={() => setIsResumeOpen(true)}
                  onSelectProject={(proj) => setSelectedProject(proj)}
                />
              }
            />
            <Route path="/skills" element={<SkillsPage isDarkMode={isDarkMode} />} />
            <Route
              path="/projects"
              element={<ProjectsPage isDarkMode={isDarkMode} onSelectProject={(proj) => setSelectedProject(proj)} />}
            />
            <Route path="/experience" element={<ExperiencePage isDarkMode={isDarkMode} />} />
            <Route path="/contact" element={<ContactPage isDarkMode={isDarkMode} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer isDarkMode={isDarkMode} />

        {/* Modals (available on every page) */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          isDarkMode={isDarkMode}
        />

        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDarkMode={isDarkMode}
        />
      </div>
    </BrowserRouter>
  );
}
