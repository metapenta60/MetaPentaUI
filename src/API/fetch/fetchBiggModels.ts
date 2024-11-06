import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchModels = () => {
    const [models, setModels] = useState<Model[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get<Model[]>('http://localhost:8080/bigg/models');
                setModels(response.data);
            } catch (err) {
                setError("Error fetching models");
                console.error("Error fetching models:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
        console.log(models);
    }, []);

    return { models, loading, error };
};

export default useFetchModels;