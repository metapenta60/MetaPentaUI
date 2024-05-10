

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
    involvedInReactions: string[]; // Array of reaction IDs
}


interface ReactionsData {
    reactions: Reaction[];
    metabolites: MetaboliteDetail[]; // Assuming a structure for metabolites if they were to be listed separately
}








export { Reaction, ReactionsData };