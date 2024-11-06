// utils/fileUploadHandler.ts
import axios from 'axios';
import { AppReactionsData, ReactionsData } from '../interfaces/types';
import React from 'react';

export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>,
  setMetabolites: React.Dispatch<React.SetStateAction<string[]>>,
  setReactions: React.Dispatch<React.SetStateAction<string[]>>,
  setBigModel: React.Dispatch<React.SetStateAction<ReactionsData | null>>,
  setCurrentModel: React.Dispatch<React.SetStateAction<string>>,
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const newFormData = new FormData();
  newFormData.append('file', file);
  setFormData(newFormData);

  try {
    const response = await axios.post('http://localhost:8080/upload', newFormData);

    const data: AppReactionsData = response.data;
    console.log('Metabolites:', data.metabolites);

    const metabolitesArray = Array.from(new Set(Object.values(data.metabolites).map(metabolite => metabolite.name)));
    const reactionsArray = Array.from(new Set(Object.values(data.reactions).map(reaction => reaction.name)));

    setMetabolites(metabolitesArray);
    setReactions(reactionsArray);
    setBigModel(null);
    setCurrentModel('uploaded');
    setTriggerUpdate(true);
  } catch (error) {
    console.error("Error uploading file:", error);
    setError('Failed to upload and process the file');
  }
};
