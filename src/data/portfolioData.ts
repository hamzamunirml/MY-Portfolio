import { SkillCategory, MetricStat, EducationItem } from '../types';
import profileImg from '../assets/images/hamza_real_photo.jpeg';

export const personalInfo = {
  name: 'Hamza Munir',
  title: 'AI/ML Engineer',
  typedTitles: [
    'AI/ML Engineer',
    'Deep Learning Enthusiast',
    'RAG & LLM Builder',
    'Computer Vision Developer',
    'FastAPI & Streamlit Developer'
  ],
  bio: 'I build intelligent systems, machine learning models, and AI-powered applications to solve real-world problems. Focused on deep learning, LLM-powered apps (RAG, agents), and end-to-end ML deployment with FastAPI and Streamlit.',
  aboutDetailed: 'Driven by a passion for applied artificial intelligence, I bridge the gap between machine learning research and practical, working software. Over the past 1 year, I have built medical diagnostic CNNs, RAG document engines, and end-to-end ML pipelines — from data cleaning and model training to production-style APIs and interactive dashboards.',
  email: 'hamza.munir.ml@gmail.com',
  github: 'https://github.com/hamzamunirml',
  linkedin: 'https://linkedin.com/in/hamza-munir-8b2159367',
  location: 'Punjab, Pakistan · Open to Remote',
  avatarImage: profileImg,
  resumeDownloadUrl: '/resume/Hamza_Munir_CV.pdf',
};

// Projects shown on the Home page (in this order). Everything else lives on /projects.
export const featuredProjectIds: string[] = [
  'brain-tumor-ai',
  'rag-document-qa',
  'business-website-analyzer',
  'ai-social-content-generator',
  'self-healing-pipeline',
  'ai-email-assistant'
];

export const keyMetrics: MetricStat[] = [
  {
    label: 'AI/ML Projects Shipped',
    value: '15+',
    description: 'End-to-end systems across NLP, Vision, GenAI & Tabular ML',
    iconName: 'Cpu'
  },
  {
    label: 'Best Model Result',
    value: '99.93%',
    description: 'ConvNeXtTiny scan-type classifier AUC (Brain Tumor AI)',
    iconName: 'Award'
  },
  {
    label: 'Deployed Apps',
    value: '6+',
    description: 'Live on Streamlit Cloud & Vercel with real users',
    iconName: 'Zap'
  },
  {
    label: 'Experience',
    value: '1+ Yr',
    description: 'Hands-on AI/ML internships + independent project building',
    iconName: 'TrendingUp'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core ML',
    iconName: 'Code2',
    skills: [
      { name: 'Python', level: 92, experience: '1+ Yr', popular: true },
      { name: 'TensorFlow / Keras', level: 85, experience: '1 Yr', popular: true },
      { name: 'Scikit-Learn', level: 88, experience: '1 Yr' },
      { name: 'Pandas & NumPy', level: 88, experience: '1 Yr' },
      { name: 'SQL', level: 72, experience: '6+ Mo' },
      { name: 'Git & GitHub', level: 85, experience: '1 Yr' }
    ]
  },
  {
    title: 'Deep Learning & Vision',
    iconName: 'Eye',
    skills: [
      { name: 'CNN Architectures (ResNet, ConvNeXt)', level: 85, experience: '1 Yr', popular: true },
      { name: 'Vision Transformers (ViT)', level: 75, experience: '6+ Mo' },
      { name: 'Transfer Learning & Fine-Tuning', level: 82, experience: '1 Yr' },
      { name: 'Grad-CAM Explainability', level: 78, experience: '6+ Mo' },
      { name: 'OpenCV / Image Processing', level: 75, experience: '1 Yr' }
    ]
  },
  {
    title: 'NLP & Generative AI',
    iconName: 'BrainCircuit',
    skills: [
      { name: 'LLM APIs (Gemini, Groq)', level: 88, experience: '6+ Mo', popular: true },
      { name: 'RAG Systems & Vector Search', level: 82, experience: '6+ Mo', popular: true },
      { name: 'LangChain', level: 78, experience: '6+ Mo' },
      { name: 'ChromaDB / Sentence Transformers', level: 80, experience: '6+ Mo' },
      { name: 'Prompt Engineering', level: 85, experience: '6+ Mo' },
      { name: 'TF-IDF & Text Similarity', level: 80, experience: '6+ Mo' },
      { name: 'Speech Processing (HMM, MaxEnt)', level: 65, experience: '3+ Mo' }
    ]
  },
  {
    title: 'Backend & Deployment',
    iconName: 'Server',
    skills: [
      { name: 'FastAPI / REST APIs', level: 85, experience: '1 Yr', popular: true },
      { name: 'Streamlit', level: 90, experience: '1 Yr', popular: true },
      { name: 'Model Deployment (Streamlit Cloud, Vercel)', level: 82, experience: '1 Yr' },
      { name: 'pytest / Testing', level: 70, experience: '6+ Mo' },
      { name: 'Basic Monitoring (Prometheus/Grafana)', level: 65, experience: '3+ Mo' }
    ]
  },
  {
    title: 'Data Engineering & MLOps',
    iconName: 'Database',
    skills: [
      { name: 'Data Drift Detection (PSI, KS-test, Evidently AI)', level: 75, experience: '6+ Mo', popular: true },
      { name: 'Anomaly Detection (Isolation Forest, XGBoost)', level: 75, experience: '6+ Mo' },
      { name: 'Data Validation (Great Expectations / Pandera)', level: 70, experience: '6+ Mo' },
      { name: 'Docker & Docker Compose', level: 70, experience: '6+ Mo', popular: true },
      { name: 'MLflow Experiment Tracking', level: 68, experience: '3+ Mo' },
      { name: 'Workflow Orchestration (Airflow / Prefect)', level: 60, experience: '3+ Mo' }
    ]
  },
  {
    title: 'Web & Full-Stack',
    iconName: 'Layout',
    skills: [
      { name: 'React & TypeScript', level: 75, experience: '6+ Mo', popular: true },
      { name: 'Tailwind CSS', level: 78, experience: '6+ Mo' },
      { name: 'React Router & Vite', level: 72, experience: '6+ Mo' },
      { name: 'React Flow (workflow builders)', level: 68, experience: '3+ Mo' },
      { name: 'Web Scraping', level: 75, experience: '3+ Mo', popular: true },
      { name: 'SQLModel / PostgreSQL', level: 65, experience: '6+ Mo' },
      { name: 'Vercel Deployment', level: 80, experience: '6+ Mo' }
    ]
  }
];

export const educationData: EducationItem[] = [
  {
    degree: 'BS Artificial Intelligence',
    institute: 'Khawaja Fareed University of Engineering and Information Technology (KFUEIT)',
    period: '2023 – 2027 (Current)',
    detail: 'CGPA: 3.00 / 4.00'
  },
  {
    degree: 'Intermediate in Computer Science (ICS)',
    institute: 'Punjab Group of Colleges',
    period: '2021 – 2023',
    detail: 'Marks: 73%'
  },
  {
    degree: 'Matriculation',
    institute: 'Govt. Model High School',
    period: '2019 – 2021',
    detail: 'Marks: 77%'
  }
];
