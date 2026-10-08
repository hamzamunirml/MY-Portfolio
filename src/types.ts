export interface Project {
  id: string;
  title: string;
  category: 'GenAI/RAG' | 'Computer Vision' | 'NLP' | 'MLOps' | 'Machine Learning' | 'Full-Stack' | 'All';
  shortDescription: string;
  fullDescription: string;
  image: string;
  techStack: string[];
  githubUrl: string; // leave '' if the repo is private/not published - the button is hidden
  liveUrl?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  architectureHighlights: string[];
  datasetInfo?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // percentage 0-100
    experience: string;
    popular?: boolean;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  techUsed: string[];
}

export interface MetricStat {
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface EducationItem {
  degree: string;
  institute: string;
  period: string;
  detail: string;
}
