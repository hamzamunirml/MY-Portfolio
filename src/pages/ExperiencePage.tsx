import React from 'react';
import { Experience } from '../components/Experience';

interface ExperiencePageProps {
  isDarkMode: boolean;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ isDarkMode }) => {
  return <Experience isDarkMode={isDarkMode} />;
};
