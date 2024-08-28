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


const Cytoscape = () => {
  const [visualData, setVisualData] = useState<{ nodes: VisualNode[]; edges: VisualEdge[] }>({ nodes: [], edges: [] });
  const [cy, setCy] = useState<cytoscape.Core>();

  cytoscape.use(dagre);
  cytoscape.use(klay);
  cytoscape.use(elk);
  cytoscape.use(cola);


  useEffect(() => {
    const loadData = async () => {
      try {
        const data: ReactionsData = await fetchReactions();
        const initialVisualData = transformToVisualData(data);
        setVisualData(initialVisualData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!cy && visualData.nodes.length > 0) {
      const newCy = cytoscape({
        container: document.getElementById('cy'),
        elements: {
          nodes: visualData.nodes.map(node => ({ data: { id: node.id, label: node.label, color: node.color } })),
          edges: visualData.edges.map(edge => ({
            data: {
              source: edge.source,
              target: edge.target,
              color: edge.color
            }
          }))
        },
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
              'arrow-scale': 2.5, // Adjust the size of the arrowhead as needed
              'control-point-step-size': 20, // Adjusts the curve's steepness, may need tweaking based on layout
              'target-distance-from-node': 4 // Adjusts the distance from the target node to the arrowhead
            }
          }
        ],
        layout: {
          name: 'elk'
        }
      });

      setCy(newCy);
    }
  }, [visualData, cy]);

  return <div id="cy" style={{ width: '1600px', height: '1600px' }} />;
};

export default Cytoscape;