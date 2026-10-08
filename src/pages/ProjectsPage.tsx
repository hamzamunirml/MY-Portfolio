import React from 'react';
import { Projects } from '../components/Projects';
import { Project } from '../types';

interface ProjectsPageProps {
  isDarkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ isDarkMode, onSelectProject }) => {
  return <Projects isDarkMode={isDarkMode} onSelectProject={onSelectProject} />;
};
