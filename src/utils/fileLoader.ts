import { fetchReactions } from '../API/fetch/fetchFileReactions';
import { ReactionsData } from '../interfaces/types';
import React from 'react';

export const fileLoader = async (
  formData: FormData,
  setMetabolites: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>,
  setReactions: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (!formData) return;

  try {
    const data: ReactionsData = await fetchReactions(formData);

    const metabolitesArray = Array.from(
      new Map(
        Object.values(data.metabolites).map(metabolite => [metabolite.id, { id: metabolite.id, name: metabolite.name }])
      ).values()
    );

    const reactionsArray = Array.from(
      new Map(
        Object.values(data.reactions).map(reaction => [reaction.id, { id: reaction.id, name: reaction.name }])
      ).values()
    );
    console.log('reactionsArray', data.reactions)
    setMetabolites(metabolitesArray);
    setReactions(reactionsArray);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching data:', err);
    setError('Failed to load data');
    setLoading(false);
  }
};