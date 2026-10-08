import { useEffect, useState } from 'react';
import { ExperienceItem } from '../types';
import { apiGet, mergeById } from '../lib/api';
import fallbackExperience from '../../content/experience.json';

export function useExperience() {
  const [experience, setExperience] = useState<ExperienceItem[]>(fallbackExperience as ExperienceItem[]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    apiGet<ExperienceItem[]>('/api/experience')
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setExperience(mergeById(fallbackExperience as ExperienceItem[], data));
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

  return { experience, loading, isLive };
}
