import React, { useEffect, useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import klay from 'cytoscape-klay';
import elk from 'cytoscape-elk';
import { ReactionsData } from '../../../interfaces/types';
import { fetchReactions } from '../../../API/fetch/reactions';
import { VisualEdge, VisualNode } from '../../../interfaces/sketch';
import { transformToVisualData } from '../Trial/transformation';
import { filterVisualData } from '../p5/sketchVisual';

interface CytoscapeProps {
  inputNodes: string;
  inputReactions: string;
  triggerUpdate: boolean;
  setTriggerUpdate: (value: boolean) => void;
  layoutName: string;
  formData: FormData | null;
}

const Cytoscape: React.FC<CytoscapeProps> = ({ inputNodes, inputReactions,
   triggerUpdate, setTriggerUpdate, layoutName, formData }) => {
  const [visualData, setVisualData] = useState<{ nodes: VisualNode[]; edges: VisualEdge[] }>({ nodes: [], edges: [] });
  const [cy, setCy] = useState<cytoscape.Core>();

  cytoscape.use(dagre);
  cytoscape.use(klay);
  cytoscape.use(elk);
  cytoscape.use(cola);

  console.log("format data: ", formData);
  useEffect(() => {
    if (triggerUpdate) {
        const loadData = async () => {
          if (!formData) return; // Exit early if formData is null
            try {
              const data = await fetchReactions(formData);


                console.log(data);
                let initialVisualData = transformToVisualData(data);
                
                if (inputNodes !== '') {
                    console.log("Filtering nodes for:", inputNodes);
                    initialVisualData = filterVisualData(initialVisualData, inputNodes, 'metabolites');
                }

                if (inputReactions !== '') {
                    console.log("Filtering reactions for:", inputReactions);
                    initialVisualData = filterVisualData(initialVisualData, inputReactions, 'reactions');
                }
                
                setVisualData(initialVisualData);
                console.log("Initial visual data:", initialVisualData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setTriggerUpdate(false); // Ensure this runs even if there's an error
            }
        };

        loadData();
    }
}, [triggerUpdate,formData, inputNodes, inputReactions, setTriggerUpdate]); // Dependencies include all relevant variables

 // Define layout options with more separation
 const getLayoutOptions = (layoutName: string) => {
  switch (layoutName) {
    case 'elk':
      return {
        name: 'elk',
        nodeSpacing: 100, // Adjust the spacing between nodes
        padding: 20, // Padding around the layout
      };
    case 'dagre':
      return {
        name: 'dagre',
        rankSep: 100, // Vertical separation between nodes
        edgeSep: 50,  // Separation between edges
        nodeSep: 100, // Horizontal separation between nodes
      };
    case 'cola':
      return {
        name: 'cola',
        nodeSpacing: 200, // Spacing between nodes
        edgeLengthVal: 150, // The length of edges
      };
    case 'klay':
      return {
        name: 'klay',
        spacing: 100, // Spacing between nodes
        nodeDimensionsIncludeLabels: true,
      };
    default:
      return {
        name: 'elk', // Fallback layout
      };
  }
};
  // Effect to update Cytoscape instance when visualData changes
  useEffect(() => {
    if (cy) {
      // Clear the existing elements
      cy.elements().remove();
  
      // First, add nodes
      const nodeElements = visualData.nodes.map(node => ({
        data: { id: node.id, label: node.label, color: node.color }
      }));
      cy.add(nodeElements);
  
      // Then, add edges
      const edgeElements = visualData.edges.map(edge => ({
        data: {
          source: edge.source,
          target: edge.target,
          color: edge.color
        }
      }));
  
      // Verify that all edges have valid targets and sources
      edgeElements.forEach(edge => {
        if (!cy.getElementById(edge.data.source).empty() && !cy.getElementById(edge.data.target).empty()) {
          cy.add(edge);
        } else {
          console.warn(`Edge with source ${edge.data.source} and target ${edge.data.target} skipped: source or target does not exist.`);
        }
      });
  
      // Apply layout after adding elements
      cy.layout(getLayoutOptions(layoutName)).run();

      cy.on('click', 'node', (event) => {
        const node = event.target;
        console.log('Node clicked:', node.data());
        // Handle the node data as needed
        // For example, display it in a modal, log it, or pass it to another component
      });
      
    } else if (visualData.nodes.length > 0) {
      // Initialize Cytoscape if not already initialized
      const nodeElements = visualData.nodes.map(node => ({
        data: { id: node.id, label: node.label, color: node.color }
      }));
      const edgeElements = visualData.edges.map(edge => ({
        data: {
          source: edge.source,
          target: edge.target,
          color: edge.color
        }
      }));
  
      const newCy = cytoscape({
        container: document.getElementById('cy'),
        elements: [], // Start with an empty graph
        style: [
          {
            selector: 'node',
            style: {
              'background-color': 'data(color)',
              'label': 'data(label)',
              'width': '160px',
              'height': '160px',
              'text-valign': 'center',
              'text-halign': 'center',
              'font-size': 50
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 8,
              'line-color': 'data(color)',
              'target-arrow-color': 'data(color)',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'arrow-scale': 2.5,
              'control-point-step-size': 20,
              'target-distance-from-node': 4
            }
          }
        ],
        layout: getLayoutOptions(layoutName),
      });
  
      // Set the Cytoscape instance
      setCy(newCy);
  
      // Add nodes and edges after initializing
      newCy.add(nodeElements);
      edgeElements.forEach(edge => {
        if (!newCy.getElementById(edge.data.source).empty() && !newCy.getElementById(edge.data.target).empty()) {
          newCy.add(edge);
        } else {
          console.warn(`Edge with source ${edge.data.source} and target ${edge.data.target} skipped: source or target does not exist.`);
        }
      });
  
      newCy.layout({ name: 'elk' }).run();
    }
  }, [visualData, cy]);

  return <div id="cy" style={{ width: '1600px', height: '1600px' }} />;
};

export default Cytoscape;
