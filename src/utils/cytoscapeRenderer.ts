import cytoscape from 'cytoscape';
import { VisualNode, VisualEdge } from '../interfaces/sketch';

interface RenderCytoscapeOptions {
  cy: cytoscape.Core | undefined;
  visualData: { nodes: VisualNode[]; edges: VisualEdge[] };
  layoutName: string;
  containerId: string;
  setCy: React.Dispatch<React.SetStateAction<cytoscape.Core | undefined>>;
  getLayoutOptions: (layoutName: string) => cytoscape.LayoutOptions;
}

export const renderCytoscapeInstance = ({
  cy,
  visualData,
  layoutName,
  containerId,
  setCy,
  getLayoutOptions,
}: RenderCytoscapeOptions) => {
  if (cy) {
    cy.elements().remove();

    const nodeElements = visualData.nodes.map(node => ({
      data: { id: node.id, label: node.label, color: node.color }
    }));
    cy.add(nodeElements);

    const edgeElements = visualData.edges.map(edge => ({
      data: { source: edge.source, target: edge.target, color: edge.color }
    }));
    edgeElements.forEach(edge => {
      if (!cy.getElementById(edge.data.source).empty() && !cy.getElementById(edge.data.target).empty()) {
        cy.add(edge);
      } else {
        console.warn(`Edge with source ${edge.data.source} and target ${edge.data.target} skipped.`);
      }
    });

    cy.layout(getLayoutOptions(layoutName)).run();
    cy.on('click', 'node', (event) => {
      const node = event.target;
      console.log('Node clicked:', node.data());
    });
  } else if (visualData.nodes.length > 0) {
    const newCy = cytoscape({
      container: document.getElementById(containerId),
      elements: [],
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

    setCy(newCy);

    const nodeElements = visualData.nodes.map(node => ({
      data: { id: node.id, label: node.label, color: node.color }
    }));
    const edgeElements = visualData.edges.map(edge => ({
      data: { source: edge.source, target: edge.target, color: edge.color }
    }));
    newCy.add(nodeElements);
    edgeElements.forEach(edge => {
      if (!newCy.getElementById(edge.data.source).empty() && !newCy.getElementById(edge.data.target).empty()) {
        newCy.add(edge);
      } else {
        console.warn(`Edge with source ${edge.data.source} and target ${edge.data.target} skipped.`);
      }
    });

    newCy.layout({ name: layoutName }).run();
  }
};