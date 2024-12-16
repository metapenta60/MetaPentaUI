
import {  ReactionsData} from "../interfaces/types";
import {Position, VisualEdge, VisualNode} from "../interfaces/sketch";


function generatePosition(index: number, total: number, setType: 'square' | 'circle', canvasWidth: number, targetY: number): Position {
    const margin = 50; 
    const verticalSpacing = (canvasHeight * 6) / Math.max(total, 1); 
    const x = setType === 'square' ? canvasWidth / 4 : (canvasWidth / 4) * 3; 
    const y = margin + (index * verticalSpacing) + verticalSpacing / 2; 
    return { x, y };
}

const canvasWidth = 800;
const canvasHeight = 700;


function transformToVisualData(reactionsData: ReactionsData): { nodes: VisualNode[], edges: VisualEdge[] } {
    const nodes: VisualNode[] = [];
    const edges: VisualEdge[] = [];


    const uniqueMetaboliteIDs = new Set<string>();
    reactionsData.reactions.forEach(reaction => {
        reaction.reactants.forEach(reactant => uniqueMetaboliteIDs.add(reactant.metabolite.id));
        reaction.products.forEach(product => uniqueMetaboliteIDs.add(product.metabolite.id));
    });

    const totalMetabolites = uniqueMetaboliteIDs.size;
    let metaboliteIndex = 0; 

    reactionsData.reactions.forEach((reaction, index) => {
        const position = generatePosition(index, reactionsData.reactions.length, 'square', canvasWidth, canvasHeight / 4);
        nodes.push({
            id: reaction.id,
            label: reaction.name,
            x: position.x,
            y: position.y,
            color: 'lightblue',
            type: 'square'
        });

        [...reaction.reactants, ...reaction.products].forEach(item => {
            const metaboliteId = item.metabolite.id;
            if (!nodes.find(node => node.id === metaboliteId)) {
                const mPosition = generatePosition(metaboliteIndex, totalMetabolites, 'circle', canvasWidth, 3 * canvasHeight / 4);
                nodes.push({
                    id: metaboliteId,
                    label: item.metabolite.name,
                    x: mPosition.x,
                    y: mPosition.y,
                    color: 'green',
                    type: 'circle'
                });
                metaboliteIndex++;
            }

            const isReactant = reaction.reactants.some(reactant => reactant.metabolite.id === metaboliteId);
            if (isReactant) {
                edges.push({
                    source: metaboliteId,
                    target: reaction.id,
                    weight: item.stoichiometry,
                    color: 'green' 
                });
            } else {
                edges.push({
                    source: reaction.id,
                    target: metaboliteId,
                    weight: item.stoichiometry,
                    color: 'black' 
                });
            }
        });
    });

    return { nodes, edges };
}


function rearrangeNodes(nodes: VisualNode[], canvasWidth: number): VisualNode[] {
    const xOffset = 100;
    const yOffset = 100;
    const margin = 20;
    let currentX = margin;
    let currentY = margin;


    const sortedNodes = nodes.sort((a, b) => {
        if (a.type === 'square' && b.type === 'circle') return -1;
        if (a.type === 'circle' && b.type === 'square') return 1;
        return 0;
    });


    sortedNodes.forEach(node => {
        if (currentX + xOffset > canvasWidth - margin) {

            currentX = margin;
            currentY += yOffset;
        }
        node.x = currentX;
        node.y = currentY;
        currentX += xOffset;
    });

    return sortedNodes;
}

export { transformToVisualData, rearrangeNodes };