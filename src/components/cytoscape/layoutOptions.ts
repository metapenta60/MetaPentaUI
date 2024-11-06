// Define layout options with more separation
const getLayoutOptions = (layoutName: string) => {
    switch (layoutName) {
      case 'elk':
        return {
          name: 'elk',
          nodeSpacing: 100, // Adjust the spacing between nodes
          padding: 20, // Padding around the layout
        };
      case 'dagre':
        return {
          name: 'dagre',
          rankSep: 100, // Vertical separation between nodes
          edgeSep: 50,  // Separation between edges
          nodeSep: 100, // Horizontal separation between nodes
        };
      case 'cola':
        return {
          name: 'cola',
          nodeSpacing: 200, // Spacing between nodes
          edgeLengthVal: 150, // The length of edges
        };
      case 'klay':
        return {
          name: 'klay',
          spacing: 100, // Spacing between nodes
          nodeDimensionsIncludeLabels: true,
        };
      default:
        return {
          name: 'elk', // Fallback layout
        };
    }
  };

export {getLayoutOptions}