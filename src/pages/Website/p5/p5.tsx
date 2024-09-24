// import React, { useEffect, useState } from 'react';
// import p5 from 'p5';
// import {ReactionsData} from '../../../interfaces/types';
// import { fetchReactions } from '../../../API/fetch/reactions';
// import {rearrangeNodes, transformToVisualData} from "../Trial/transformation";
// import {SketchProps, VisualEdge, VisualNode} from "../../../interfaces/sketch";
// import {filterVisualData,calculateBounds} from "./sketchVisual";


// const P5: React.FC<SketchProps> = ({inputNodes, inputReactions, triggerUpdate, setTriggerUpdate}) => {
//     const [visualData, setVisualData] = useState<{ nodes: VisualNode[]; edges: VisualEdge[] }>({ nodes: [], edges: [] });



//     useEffect(() => {
//         if (triggerUpdate) {
//             const loadData = async () => {
//                 try {
//                     const data: ReactionsData = await fetchReactions();
//                     console.log(data);
//                     const initialVisualData = transformToVisualData(data);
//                     setVisualData(initialVisualData);

//                     if (inputNodes !== '') {
//                         console.log("Filtering nodes for:", inputNodes);
//                         const filteredData = filterVisualData(initialVisualData, inputNodes,'metabolites');
//                         setVisualData(filteredData);
//                         initialVisualData.nodes = rearrangeNodes(initialVisualData.nodes, 800)
//                     }

//                     if (inputReactions !== '') {
//                         console.log("Filtering reactions for:", inputReactions);
//                         const filteredData = filterVisualData(initialVisualData, inputReactions,'reactions');
//                         setVisualData(filteredData);
//                         initialVisualData.nodes = rearrangeNodes(initialVisualData.nodes, 800)
//                     }



//                 } catch (error) {
//                     console.error("Failed to fetch data:", error);
//                 }
//             };

//             loadData();
//             setTriggerUpdate(false);
//         }
//     }, [triggerUpdate]);




//     useEffect(() => {
//         const sketch = new p5((p: p5) => {
//             let selectedNode: VisualNode | null = null;
//             let offset: p5.Vector | null = null;

//             p.setup = () => {
//                 const bounds = calculateBounds(visualData.nodes);
//                 // Adding a margin around the content
//                 const margin = 50;
//                 const width = bounds.maxX - bounds.minX + margin * 20;
//                 const height = bounds.maxY - bounds.minY + margin * 2;

//                 // Adjust canvas position if needed to ensure it's visible
//                 const canvasX = Math.max(0, -bounds.minX + margin);
//                 const canvasY = Math.max(0, -bounds.minY + margin);

//                 p.createCanvas(width, height);
//                 p.translate(canvasX, canvasY);
//                 p.textAlign(p.CENTER, p.CENTER);
//             };

//             p.draw = () => {
//                 p.background(255);
//                 // colored margin around the canvas
//                 drawEdges(p, visualData.edges, visualData.nodes);
//                 drawNodes(p, visualData.nodes);
//             };

//             p.windowResized = () => {
//                 p.resizeCanvas(p.windowWidth, p.windowHeight);
//             };

//             p.mousePressed = () => {
//                 visualData.nodes.forEach((node) => {
//                     const d = p.dist(p.mouseX, p.mouseY, node.x, node.y);
//                     const nodeRadius = node.type === 'circle' ? 20 : Math.sqrt(800); // Assuming square size is 40x40, hence diagonal is sqrt(1600)
//                     const isInsideNode = d < nodeRadius;

//                     if (isInsideNode) {
//                         selectedNode = node;
//                         offset = p.createVector(p.mouseX - node.x, p.mouseY - node.y);
//                         p.cursor(p.HAND); // Optional: Change cursor to indicate draggable item
//                         return;
//                     }
//                 });
//             };

//             p.mouseDragged = () => {
//                 if (selectedNode && offset) {
//                     selectedNode.x = p.mouseX - offset.x;
//                     selectedNode.y = p.mouseY - offset.y;
//                 }
//             };

//             p.mouseReleased = () => {
//                 if (selectedNode) {
//                     selectedNode = null;
//                     offset = null;
//                     if (p) {
//                         p.cursor(p.ARROW); // Change cursor back to default
//                     }
//                 }
//             };


//             function drawNodes(p: p5, nodes: VisualNode[]): void {
//                 nodes.forEach((node) => {
//                     p.fill(node.color);
//                     if (node.type === 'circle') {
//                         p.ellipse(node.x, node.y, 40, 40);
//                     } else { // Assume type 'square' for reactions
//                         p.rect(node.x - 20, node.y - 20, 40, 40);
//                     }
//                     p.fill(0);
//                     p.text(node.label, node.x, node.y);
//                 });
//             }

//             function drawEdges(p: p5, edges: VisualEdge[], nodes: VisualNode[]): void {
//                 edges.forEach(edge => {
//                     const sourceNode = nodes.find(node => node.id === edge.source);
//                     const targetNode = nodes.find(node => node.id === edge.target);
//                     if (sourceNode && targetNode) {
//                         // Now passing edge.color to drawArrow
//                         drawArrow(p, sourceNode.x, sourceNode.y, targetNode.x, targetNode.y, edge.color, targetNode.type);
//                     }
//                 });
//             }

//             function drawArrow(p: p5, sourceX: number, sourceY: number, targetX: number, targetY: number, color: string | p5.Color, targetType: 'circle' | 'square') {
//                 const arrowColor = typeof color === 'string' ? p.color(color) : color;
//                 const angle = Math.atan2(targetY - sourceY, targetX - sourceX);

//                 const arrowLength = 12;
//                 const arrowWidth = 5;

//                 let adjustedTargetX = targetX;
//                 let adjustedTargetY = targetY;

//                 if (targetType === 'circle') {
//                     const radius = 20;
//                     adjustedTargetX = targetX - Math.cos(angle) * radius;
//                     adjustedTargetY = targetY - Math.sin(angle) * radius;
//                 } else if (targetType === 'square') {
//                     const halfSide = 20;
//                     const dx = halfSide / Math.abs(Math.cos(angle));
//                     const dy = halfSide / Math.abs(Math.sin(angle));

//                     if (Math.abs(dx) < Math.abs(dy)) {
//                         adjustedTargetX = targetX - Math.sign(Math.cos(angle)) * halfSide;
//                         adjustedTargetY = targetY - Math.sign(Math.sin(angle)) * Math.abs(dx * Math.tan(angle));
//                     } else {
//                         adjustedTargetX = targetX - Math.sign(Math.cos(angle)) * Math.abs(dy / Math.tan(angle));
//                         adjustedTargetY = targetY - Math.sign(Math.sin(angle)) * halfSide;
//                     }
//                 }

//                 p.push();
//                 p.stroke(arrowColor);
//                 p.fill(arrowColor);

//                 // Draw the line from source to adjusted target
//                 p.line(sourceX, sourceY, adjustedTargetX, adjustedTargetY);

//                 // Draw the arrowhead
//                 p.translate(adjustedTargetX, adjustedTargetY);
//                 p.rotate(angle);
//                 p.triangle(0, 0, -arrowLength, arrowWidth, -arrowLength, -arrowWidth);

//                 p.pop();
//             }

//         });

//         return () => {
//             sketch.remove();
//         };
//     }, [visualData]);

//     return <div />;
// };

// export default P5;