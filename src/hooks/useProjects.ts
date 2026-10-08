import { useEffect, useState } from 'react';
import { Project } from '../types';
import { apiGet, mergeById } from '../lib/api';
import fallbackProjects from '../../content/projects.json';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects as Project[]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false); // true if data came from the live backend

  useEffect(() => {
    let cancelled = false;

    apiGet<Project[]>('/api/projects')
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setProjects(mergeById(fallbackProjects as Project[], data));
          setIsLive(true);
        }
      })
      .catch(() => {
        // Backend unreachable — silently keep the bundled fallback data.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, isLive };
}
