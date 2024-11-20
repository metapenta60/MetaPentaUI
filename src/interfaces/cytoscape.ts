import { VisualEdge, VisualNode } from "./sketch";
import { ReactionsData } from "./types";

interface CytoscapeProps {
    inputNodes: string;
    inputReactions: string;
    triggerUpdate: boolean;
    setTriggerUpdate: (value: boolean) => void;
    layoutName: string;
    formData: FormData | null;
    bigModel: ReactionsData | null;
    // shortestPathData: {
    //   reactions: string[];
    //   metabolites: string[];
    // } | null;
  }

  interface LoadDataParams {
    bigModel: ReactionsData | null;
    formData: FormData | null;
    inputNodes: string;
    inputReactions: string;
    setVisualData: React.Dispatch<React.SetStateAction<{ nodes: VisualNode[]; edges: VisualEdge[] }>>;
    setTriggerUpdate: (value: boolean) => void;
  }

export{CytoscapeProps,LoadDataParams};