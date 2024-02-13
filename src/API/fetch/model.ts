import { Metabolite } from '../../interfaces/types'; // Adjust the path as necessary

// Function to fetch graph data from the backend
const fetchMetabolites = async (): Promise<Metabolite[]> => {
    const response = await fetch("http://localhost:8080/e_coli_core");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export { fetchMetabolites};