import { fetchReactions } from '../API/fetch/fetchFileReactions';
import { transformToVisualData } from '../utils/transformation';
import { filterVisualData, filterVisualDataByDegree } from '../components/cytoscape/sketchVisual';
import { ReactionsData } from '../interfaces/types';
import { VisualEdge, VisualNode } from '../interfaces/sketch';
import { LoadDataParams } from '../interfaces/cytoscape';



export const loadData = async ({
  bigModel,
  formData,
  inputNodes,
  inputReactions,
  setVisualData,
  setTriggerUpdate,
}: LoadDataParams) => {
  try {
    // Fetch raw reactions/metabolites data
    let initialVisualData;
    if (bigModel) {
      initialVisualData = transformToVisualData(bigModel);
    } else if (formData) {
      const data = await fetchReactions(formData);
      console.log("dataCytoscape", data);
      initialVisualData = transformToVisualData(data);
    } else {
      console.log("No data provided");
      return;
    }

    console.log("InitialvisualDataCyToscape", initialVisualData);
    
    // Apply degree filtering
    const degreeThreshold = 6;
    let filteredVisualData = filterVisualDataByDegree(initialVisualData, degreeThreshold);
    console.log("Filtered visual data by degree:", filteredVisualData);

    // Apply further filtering based on user input
    if (inputNodes) {
      console.log("Filtering nodes for:", inputNodes);
      filteredVisualData = filterVisualData(filteredVisualData, inputNodes, 'metabolites');
    }
    if (inputReactions) {
      console.log("Filtering reactions for:", inputReactions);
      filteredVisualData = filterVisualData(filteredVisualData, inputReactions, 'reactions');
    }

    // Update the state with the filtered visual data
    setVisualData(filteredVisualData);
    console.log("Final visual data after all filters:", filteredVisualData);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    setTriggerUpdate(false); // Ensure this runs even if there's an error
  }
};