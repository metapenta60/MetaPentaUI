import React from 'react';
import axios from 'axios';
import { ReactionsData } from '../interfaces/types';

const handleProcessModelData = (
  data: ReactionsData,
  setBigModel: React.Dispatch<React.SetStateAction<ReactionsData | null>>,
  setMetabolites: React.Dispatch<React.SetStateAction<string[]>>,
  setReactions: React.Dispatch<React.SetStateAction<string[]>>,
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("Data in app", data);
  setBigModel(data);

  // Extract metabolites and reactions into arrays
  const metabolitesArray = Array.from(new Set(Object.values(data.metabolites).map(metabolite => metabolite.name)));
  const reactionsArray = Array.from(new Set(Object.values(data.reactions).map(reaction => reaction.name)));

  setMetabolites(metabolitesArray);
  setReactions(reactionsArray);

  // Trigger update to re-render with new data
  setTriggerUpdate(true);
};

const handleProcessModel = async (
  selectedModel: string,
  onProcessModel: (data: ReactionsData) => void,
  setProcessingError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (!selectedModel) {
    setProcessingError("Please select a model first.");
    return;
  }

  try {
    setProcessingError(null); // Clear previous errors
    const response = await axios.get(`http://localhost:8080/models/${selectedModel}/process`);
    onProcessModel(response.data); // Call the parent handler with data
  } catch (error) {
    console.error("Error processing model:", error);
    setProcessingError("Failed to process the model. Please try again.");
  }
};

export { handleProcessModelData, handleProcessModel };