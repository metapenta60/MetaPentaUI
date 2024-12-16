
interface SketchProps {
    inputNodes: string;
    inputReactions: string;
    triggerUpdate: boolean;
    setTriggerUpdate: (update: boolean) => void;
}

interface Bounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}



interface VisualNode {
    x: number;
    y: number;
    label: string;
    color: string;
    type: 'circle' | 'square';
    id: string; 
}

interface VisualEdge {
    source: string; 
    target: string; 
    weight: number; 
    color: string; 
}

interface FilteredVisualData {
    nodes: VisualNode[];
    edges: VisualEdge[];
}

interface VisualData {
    nodes: VisualNode[];
    edges: VisualEdge[];
}

interface Position {
    x: number;
    y: number;
}

export{SketchProps,Bounds, VisualNode, VisualEdge, FilteredVisualData, VisualData, Position}