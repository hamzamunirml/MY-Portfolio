import React from 'react';
import { Skills } from '../components/Skills';

interface SkillsPageProps {
  isDarkMode: boolean;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ isDarkMode }) => {
  return <Skills isDarkMode={isDarkMode} />;
};
