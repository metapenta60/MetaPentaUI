import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchReactions } from './fetchFileReactions';
import { ReactionsData } from '../../interfaces/types';

interface AppReactionsData {
  metabolites: Record<string, any>;
  reactions: Record<string, any>;
}

interface UseReactionsDataResult {
  metabolites: string[];
  reactions: string[];
  bigModel: ReactionsData | null;
  currentModel: string;
  loading: boolean;
  error: string | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProcessModelData: (data: ReactionsData) => void;
}

export const useReactionsData = (): UseReactionsDataResult => {
  const [metabolites, setMetabolites] = useState<string[]>([]);
  const [reactions, setReactions] = useState<string[]>([]);
  const [bigModel, setBigModel] = useState<ReactionsData | null>(null);
  const [currentModel, setCurrentModel] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData);

    try {
      const response = await axios.post<AppReactionsData>('http://localhost:8080/upload', newFormData);
      const data = response.data;
      setMetabolites(Object.values(data.metabolites).map(m => m.name));
      setReactions(Object.values(data.reactions).map(r => r.name));
      setBigModel(null);
      setCurrentModel('uploaded');
    } catch (error) {
      console.error("Error uploading file:", error);
      setError('Failed to upload and process the file');
    }
  };

  const handleProcessModelData = (data: ReactionsData) => {
    setBigModel(data);
    setMetabolites(Object.values(data.metabolites).map(m => m.name));
    setReactions(Object.values(data.reactions).map(r => r.name));
  };

  useEffect(() => {
    const loadData = async () => {
      if (!formData) return;
      try {
        const data = await fetchReactions(formData);
        setMetabolites(Object.values(data.metabolites).map(m => m.name));
        setReactions(Object.values(data.reactions).map(r => r.name));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };
    if (formData) loadData();
  }, [formData]);

  return {
    metabolites,
    reactions,
    bigModel,
    currentModel,
    loading,
    error,
    handleFileUpload,
    handleProcessModelData,
  };
};