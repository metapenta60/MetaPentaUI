import {ReactionsData} from "../../interfaces/types";


const fetchReactions = async (): Promise<ReactionsData> => {
    try {
        const response = await fetch('http://localhost:8080/e_coli_core.json'); // Adjusted to .json endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: ReactionsData = await response.json();
        // If the JSON structure directly matches your interface, no further transformation is needed
        return data;
    } catch (error) {
        console.error("Failed to fetch reactions:", error);
        throw error; // Re-throw to allow caller to handle the error
    }
};

export { fetchReactions };