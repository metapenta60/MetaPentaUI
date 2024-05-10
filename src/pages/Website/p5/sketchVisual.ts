import {Bounds, FilteredVisualData, VisualData, VisualEdge, VisualNode} from "../../../interfaces/sketch";

function calculateBounds(nodes: VisualNode[]): Bounds {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    nodes.forEach(node => {
        minX = Math.min(minX, node.x - 20);
        maxX = Math.max(maxX, node.x + 20);
        minY = Math.min(minY, node.y - 2);
        maxY = Math.max(maxY, node.y + 150);
    });

    return { minX, maxX, minY, maxY };
}

const filterVisualData = (visualData: VisualData, inputNodes: string): FilteredVisualData => {
    const inputArray = inputNodes.split(',').map(item => item.trim().toLowerCase());
    const metaboliteIds = visualData.nodes.filter(node => inputArray.includes(node.label.toLowerCase())).map(node => node.id);

    return createVisualDataForMetabolites(metaboliteIds, visualData);
};

function createVisualDataForMetabolites(metaboliteIds: string[], allVisualData: VisualData): FilteredVisualData {
    const filteredNodes: VisualNode[] = allVisualData.nodes.filter(node => metaboliteIds.includes(node.id));
    const reactionIds: Set<string> = new Set();

    // include reaction nodes and their connected metabolites
    allVisualData.edges.forEach(edge => {
        if (metaboliteIds.includes(edge.source) || metaboliteIds.includes(edge.target)) {
            reactionIds.add(edge.source);
            reactionIds.add(edge.target);
        }
    });

    // filter reaction nodes based on the collected reaction IDs from the edges
    const reactionNodes = allVisualData.nodes.filter(node => reactionIds.has(node.id));
    filteredNodes.push(...reactionNodes);

    const filteredEdges: VisualEdge[] = allVisualData.edges.filter(edge => {
        return (reactionIds.has(edge.source) && reactionIds.has(edge.target));
    });

    return {
        nodes: filteredNodes,
        edges: filteredEdges
    };
}

export { calculateBounds, filterVisualData };

