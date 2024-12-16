// Define layout options with more separation
const getLayoutOptions = (layoutName: string) => {
    switch (layoutName) {
      case 'elk':
        return {
          name: 'elk',
          nodeSpacing: 100, // spacing between nodes
          padding: 20, // padding around the layout
        };
      case 'dagre':
        return {
          name: 'dagre',
          rankSep: 100, // vertical separation between nodes
          edgeSep: 50,  // separation between edges
          nodeSep: 100, // horizontal separation between nodes
        };
      case 'cola':
        return {
          name: 'cola',
          nodeSpacing: 200, // spacing between nodes
          edgeLengthVal: 150, // the length of edges
        };
      case 'klay':
        return {
          name: 'klay',
          spacing: 100, // spacing between nodes
          nodeDimensionsIncludeLabels: true,
        };
      default:
        return {
          name: 'elk', // default layout
        };
    }
  };

export {getLayoutOptions}