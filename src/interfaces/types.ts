

interface MetaboliteAttributes {
    id: string;
    name: string;
    compartment: string;
    chemicalFormula: string;
}

interface ReactionMetabolite {
    metabolite: MetaboliteDetail;
    stoichiometry: number;
}

interface Reaction {
    name: string;
    id: string;
    reactants: ReactionMetabolite[];
    products: ReactionMetabolite[];
    edgesOut: string[];
}

interface VisualNode {
    x: number;
    y: number;
    label: string;
    color: string;
    type: 'circle' | 'square';
    id: string; // MetaboliteAttributes.id or Reaction.id
}

interface VisualEdge {
    source: string; // source node id
    target: string; // target node id
    weight: number; // quantity of metabolites
    color: string; // color of the edge
}

interface CanvasSize {
    width: number;
    height: number;
}

interface Position {
    x: number;
    y: number;
}

interface MetaboliteDetail {
    id: string;
    name: string;
    compartment: string;
    edgesOut: string[];
}


interface ReactionsData {
    reactions: Reaction[];
    metabolites: MetaboliteDetail[]; // Assuming a structure for metabolites if they were to be listed separately
}

interface Bounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}




export { MetaboliteAttributes, Reaction, VisualNode, VisualEdge, CanvasSize, Position, ReactionsData,Bounds };