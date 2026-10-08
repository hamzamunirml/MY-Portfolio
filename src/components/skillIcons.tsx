import React from 'react';
import { Code2, Eye, BrainCircuit, Server, Database, Layout, Cpu } from 'lucide-react';

export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-5 h-5 text-blue-400" />;
    case 'Eye': return <Eye className="w-5 h-5 text-purple-400" />;
    case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-indigo-400" />;
    case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
    case 'Database': return <Database className="w-5 h-5 text-amber-400" />;
    case 'Layout': return <Layout className="w-5 h-5 text-pink-400" />;
    default: return <Cpu className="w-5 h-5 text-purple-400" />;
  }
};
