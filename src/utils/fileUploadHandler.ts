// utils/fileUploadHandler.ts
import axios from 'axios';
import { AppReactionsData, ReactionsData } from '../interfaces/types';
import React from 'react';

export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>,
  setMetabolites: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>,
  setReactions: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>,
  setBigModel: React.Dispatch<React.SetStateAction<ReactionsData | null>>,
  setCurrentModel: React.Dispatch<React.SetStateAction<string>>,
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>
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

    setMetabolites(metabolitesArray);
    setReactions(reactionsArray);
    setSelectedModel('');
    setBigModel(null);
    setCurrentModel('uploaded');
    setTriggerUpdate(true);
  } catch (error) {
    console.error("Error uploading file:", error);
    setError('Failed to upload and process the file');
  }
};
