interface Metabolite {
    label: string;
    // object: MetaboliteObject;
    edgesIn: Edge[];
    edgesOut: Edge[];
    id: string;
    attributes: MetaboliteAttributes;
    source: boolean;
    sink: boolean;
}
// TODO: Which one? Object or Attributes?
// interface MetaboliteObject {
//     id: string;
//     name: string;
//     compartment: string;
//     chemicalFormula: string;
// }
interface Edge {
    id: string;
}

interface MetaboliteAttributes {
    id: string;
    name: string;
    compartment: string;
    chemicalFormula: string;
}

export { Metabolite, Edge, MetaboliteAttributes};