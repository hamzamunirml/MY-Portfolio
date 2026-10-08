import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { SkillsPreview } from '../components/home/SkillsPreview';
import { ExperiencePreview } from '../components/home/ExperiencePreview';
import { Contact } from '../components/Contact';
import { Project } from '../types';

interface HomePageProps {
  isDarkMode: boolean;
  onOpenResume: () => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isDarkMode, onOpenResume, onSelectProject }) => {
  return (
    <>
      <Hero isDarkMode={isDarkMode} onOpenResume={onOpenResume} />
      <About isDarkMode={isDarkMode} />
      <FeaturedProjects isDarkMode={isDarkMode} onSelectProject={onSelectProject} />
      <SkillsPreview isDarkMode={isDarkMode} />
      <ExperiencePreview isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
    </>
  );
};
