import {Bounds, FilteredVisualData, VisualData, VisualEdge, VisualNode} from "../../interfaces/sketch";

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

const filterVisualData = (visualData: VisualData, inputNodes: string, type:string): FilteredVisualData => {
    const inputArray = inputNodes.split(',').map(item => item.trim().toLowerCase());
    const metaboliteIds = visualData.nodes.filter(node => inputArray.includes(node.label.toLowerCase())).map(node => node.id);

    if(type === 'metabolites') {
        return createVisualDataForMetabolites(metaboliteIds, visualData);
    }
    else if(type === 'reactions') {
        return createVisualDataForReactions(metaboliteIds, visualData);
    }

    return {
        nodes: [],
        edges: []
    };
};

function createVisualDataForMetabolites(metaboliteIds: string[], allVisualData: VisualData): FilteredVisualData {
    const filteredNodes: VisualNode[] = [];
    const reactionIds: Set<string> = new Set();
    const additionalMetaboliteIds: Set<string> = new Set(metaboliteIds);

    allVisualData.edges.forEach(edge => {
        if (metaboliteIds.includes(edge.source) || metaboliteIds.includes(edge.target)) {
            reactionIds.add(edge.source);
            reactionIds.add(edge.target);
        }
    });

    reactionIds.forEach(reactionId => {
        const reactionNode = allVisualData.nodes.find(node => node.id === reactionId && node.type === 'square');
        if (reactionNode) {
            filteredNodes.push(reactionNode);

            const connectedMetaboliteIds = allVisualData.edges
                .filter(edge => edge.source === reactionId || edge.target === reactionId)
                .map(edge => edge.source === reactionId ? edge.target : edge.source)
                .filter(id => id !== reactionId);

            if (connectedMetaboliteIds.length > 0) {
                const selectedMetaboliteId = connectedMetaboliteIds[0];
                additionalMetaboliteIds.add(selectedMetaboliteId);
            }
        }
    });

    additionalMetaboliteIds.forEach(metaboliteId => {
        const metaboliteNode = allVisualData.nodes.find(node => node.id === metaboliteId && node.type === 'circle');
        if (metaboliteNode) {
            filteredNodes.push(metaboliteNode);
        }
    });

    const filteredEdges: VisualEdge[] = allVisualData.edges.filter(edge =>
        additionalMetaboliteIds.has(edge.source) || additionalMetaboliteIds.has(edge.target)
    );

    return {
        nodes: filteredNodes,
        edges: filteredEdges
    };
}

function createVisualDataForReactions(reactionIds: string[], allVisualData: VisualData): FilteredVisualData {
    const filteredNodes: VisualNode[] = [];
    const metaboliteIds: Set<string> = new Set();
    const additionalReactionIds: Set<string> = new Set(reactionIds);

    reactionIds.forEach(reactionId => {
        const reactionNode = allVisualData.nodes.find(node => node.id === reactionId && node.type === 'square');
        if (reactionNode) {
            filteredNodes.push(reactionNode);

            const connectedMetaboliteIds = allVisualData.edges
                .filter(edge => edge.source === reactionId || edge.target === reactionId)
                .map(edge => edge.source === reactionId ? edge.target : edge.source)
                .filter(id => id !== reactionId);

            connectedMetaboliteIds.forEach(id => metaboliteIds.add(id));
        }
    });

    metaboliteIds.forEach(metaboliteId => {
        const metaboliteNode = allVisualData.nodes.find(node => node.id === metaboliteId && node.type === 'circle');
        if (metaboliteNode) {
            filteredNodes.push(metaboliteNode);
        }
    });

    const filteredEdges: VisualEdge[] = allVisualData.edges.filter(edge =>
        metaboliteIds.has(edge.source) || metaboliteIds.has(edge.target) ||
        additionalReactionIds.has(edge.source) || additionalReactionIds.has(edge.target)
    );

    return {
        nodes: filteredNodes,
        edges: filteredEdges
    };
}

const calculateDegree = (data: VisualData): Record<string, number> => {
    const degreeMap: Record<string, number> = {};

    // Loop through edges to calculate the degree of each metabolite
    data.edges.forEach(edge => {
        if (edge.source in degreeMap) {
            degreeMap[edge.source] += 1;
        } else {
            degreeMap[edge.source] = 1;
        }

        if (edge.target in degreeMap) {
            degreeMap[edge.target] += 1;
        } else {
            degreeMap[edge.target] = 1;
        }
    });

    return degreeMap;
};

const filterVisualDataByDegree = (visualData: VisualData, degreeThreshold: number): FilteredVisualData => {
    const degreeMap = calculateDegree(visualData);

    // filter nodes by degree threshold
    const filteredNodes = visualData.nodes.filter(node => {
        const degree = degreeMap[node.id] || 0;
        return degree > degreeThreshold;
    });

    // filter edges that connect filtered nodes
    const filteredEdges = visualData.edges.filter(edge => {
        const sourceExists = filteredNodes.some(node => node.id === edge.source);
        const targetExists = filteredNodes.some(node => node.id === edge.target);
        return sourceExists && targetExists;
    });

    // remove any nodes that aren't part of any edge
    const connectedNodeIds = new Set<string>();
    filteredEdges.forEach(edge => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
    });

    const connectedNodes = filteredNodes.filter(node => connectedNodeIds.has(node.id));

    return {
        nodes: connectedNodes,
        edges: filteredEdges
    };
};

export { calculateBounds, filterVisualData, filterVisualDataByDegree };

