import React from 'react';
import { Contact } from '../components/Contact';

interface ContactPageProps {
  isDarkMode: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isDarkMode }) => {
  return <Contact isDarkMode={isDarkMode} />;
};
