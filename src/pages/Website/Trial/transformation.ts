
import {  ReactionsData, VisualNode, VisualEdge, Position} from "../../../interfaces/types";


function generatePosition(index: number, total: number, setType: 'square' | 'circle', canvasWidth: number, targetY: number): Position {
    const margin = 50; // Horizontal margin from the canvas edges
    const verticalSpacing = (canvasHeight * 6) / Math.max(total, 1); // Avoid division by zero
    const x = setType === 'square' ? canvasWidth / 4 : (canvasWidth / 4) * 3; // Left column for squares, right for circles
    const y = margin + (index * verticalSpacing) + verticalSpacing / 2; // Adjust Y position for vertical distribution
    return { x, y };
}

// Presuming these are your canvas dimensions set globally or elsewhere accessible
const canvasWidth = 800;
const canvasHeight = 700;


function transformToVisualData(reactionsData: ReactionsData): { nodes: VisualNode[], edges: VisualEdge[] } {
    const nodes: VisualNode[] = [];
    const edges: VisualEdge[] = [];

    // Unique metabolite IDs to correctly space them out and calculate positions
    const uniqueMetaboliteIDs = new Set<string>();
    reactionsData.reactions.forEach(reaction => {
        reaction.reactants.forEach(reactant => uniqueMetaboliteIDs.add(reactant.metabolite.id));
        reaction.products.forEach(product => uniqueMetaboliteIDs.add(product.metabolite.id));
    });

    const totalMetabolites = uniqueMetaboliteIDs.size;
    let metaboliteIndex = 0; // For positioning metabolites

    reactionsData.reactions.forEach((reaction, index) => {
        const position = generatePosition(index, reactionsData.reactions.length, 'square', canvasWidth, canvasHeight / 4); // Using upper half for reactions
        nodes.push({
            id: reaction.id,
            label: reaction.name,
            x: position.x,
            y: position.y,
            color: 'lightblue',
            type: 'square'
        });

        // Process reactants and products together to avoid duplications and correctly position them
        [...reaction.reactants, ...reaction.products].forEach(item => {
            const metaboliteId = item.metabolite.id;
            if (!nodes.find(node => node.id === metaboliteId)) {
                const mPosition = generatePosition(metaboliteIndex, totalMetabolites, 'circle', canvasWidth, 3 * canvasHeight / 4); // Lower half for metabolites
                nodes.push({
                    id: metaboliteId,
                    label: item.metabolite.name,
                    x: mPosition.x,
                    y: mPosition.y,
                    color: 'green', // Use a different color if needed for reactants/products
                    type: 'circle'
                });
                metaboliteIndex++;
            }

            // Creating edges
            const isReactant = reaction.reactants.some(reactant => reactant.metabolite.id === metaboliteId);
            if (isReactant) {
                edges.push({
                    source: metaboliteId,
                    target: reaction.id,
                    weight: item.stoichiometry,
                    color: 'green' // reactant to reaction
                });
            } else {
                edges.push({
                    source: reaction.id,
                    target: metaboliteId,
                    weight: item.stoichiometry,
                    color: 'black' // reaction to product
                });
            }
        });
    });

    return { nodes, edges };
}

export { transformToVisualData };