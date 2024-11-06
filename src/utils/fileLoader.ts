import { fetchReactions } from '../API/fetch/fetchFileReactions';
import { ReactionsData } from '../interfaces/types';
import React from 'react';

export const fileLoader = async (
  formData: FormData,
  setMetabolites: React.Dispatch<React.SetStateAction<string[]>>,
  setReactions: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (!formData) return;

  try {
    const data: ReactionsData = await fetchReactions(formData);

    const metabolitesArray = Array.from(new Set(Object.values(data.metabolites).map(metabolite => metabolite.name)));
    const reactionsArray = Array.from(new Set(Object.values(data.reactions).map(reaction => reaction.name)));

    setMetabolites(metabolitesArray);
    setReactions(reactionsArray);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching data:', err);
    setError('Failed to load data');
    setLoading(false);
  }
};