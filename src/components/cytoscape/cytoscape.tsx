import React, { useEffect, useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import klay from 'cytoscape-klay';
import elk from 'cytoscape-elk';
import { ReactionsData } from '../../interfaces/types';
import { VisualEdge, VisualNode } from '../../interfaces/sketch';
import { loadData } from '../../utils/cytoscapeDataLoader';
import { CytoscapeProps } from '../../interfaces/cytoscape';
import { getLayoutOptions } from './layoutOptions';
import { renderCytoscapeInstance } from '../../utils/cytoscapeRenderer';



const Cytoscape: React.FC<CytoscapeProps> = ({ inputNodes, inputReactions,
   triggerUpdate, setTriggerUpdate, layoutName, formData, bigModel }) => {
  const [visualData, setVisualData] = useState<{ nodes: VisualNode[]; edges: VisualEdge[] }>({ nodes: [], edges: [] });
  const [cy, setCy] = useState<cytoscape.Core>();
  const containerId = 'cy';

  cytoscape.use(dagre);
  cytoscape.use(klay);
  cytoscape.use(elk);
  cytoscape.use(cola);

  useEffect(() => {
    if (triggerUpdate) {
      loadData({
        bigModel,
        formData,
        inputNodes,
        inputReactions,
        setVisualData,
        setTriggerUpdate
      });
    }
}, [triggerUpdate, formData, inputNodes, inputReactions, setTriggerUpdate]); 



useEffect(() => {
  renderCytoscapeInstance({
    cy,
    visualData,
    layoutName,
    containerId,
    setCy,
    getLayoutOptions,
  });
}, [visualData, cy, layoutName]);

return <div id={containerId} style={{ width: '1600px', height: '1600px' }} />;
};

export default Cytoscape;
