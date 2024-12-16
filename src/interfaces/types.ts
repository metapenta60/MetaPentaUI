

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

interface MetaboliteDetail {
    id: string;
    name: string;
    compartment: string;
    edgesOut: string[];
    involvedInReactions: string[]; 
}


interface ReactionsData {
    reactions: Reaction[];
    metabolites: MetaboliteDetail[];
}

interface AppReactionsData {
    metabolites: Record<string, any>;
    reactions: Record<string, any>;
  }

  interface MenuProps {
    inputNodes: string;
    setInputNodes: (value: string) => void;
    inputReactions: string;
    setInputReactions: (value: string) => void;
    triggerUpdate: boolean;
    setTriggerUpdate: (value: boolean) => void;
    availableMetabolites: { id: string; name: string }[];
    availableReactions: { id: string; name: string }[];
    onProcessModel: (data: ReactionsData) => void;
    currentModel: string;
    setCurrentModel: (value:string) => void;
    bigModel: ReactionsData | null; 
    formData: FormData | null; 
    selectedModel: string;
    setSelectedModel: (value: string) => void;

}





export { Reaction, ReactionsData, MetaboliteDetail, AppReactionsData, MenuProps };