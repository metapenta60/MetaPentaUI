import {ReactionsData} from "../../interfaces/types";
import axios from 'axios';

const fetchReactions = async (formData: FormData): Promise<ReactionsData> => {
    try {
        const response = await axios.post('http://localhost:8080/upload', formData, {
            headers: {},
          }); 
        
        const data: ReactionsData = response.data;

        return data;
    } catch (error) {
        console.error("Failed to fetch reactions:", error);
        throw error; // Re-throw to allow caller to handle the error
    }
};

export { fetchReactions };