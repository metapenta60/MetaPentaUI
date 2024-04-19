import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import {VisualNode, VisualEdge, ReactionsData, Bounds} from '../../../interfaces/types';
import { fetchReactions } from '../../../API/fetch/reactions';
import { transformToVisualData} from "./transformation";


interface SketchProps {
    inputNodes: string;
    triggerUpdate: boolean;
    setTriggerUpdate: (update: boolean) => void;
}

interface FilteredVisualData {
    nodes: VisualNode[];
    edges: VisualEdge[];
}

interface VisualData {
    nodes: VisualNode[];
    edges: VisualEdge[];
}
const Sketch: React.FC<SketchProps> = ({inputNodes, triggerUpdate, setTriggerUpdate}) => {
    const [visualData, setVisualData] = useState<{ nodes: VisualNode[]; edges: VisualEdge[] }>({ nodes: [], edges: [] });

    function calculateBounds(nodes: VisualNode[]): Bounds {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        nodes.forEach(node => {
            minX = Math.min(minX, node.x - 20);
            maxX = Math.max(maxX, node.x + 20);
            minY = Math.min(minY, node.y - 20);
            maxY = Math.max(maxY, node.y + 20);
        });

        return { minX, maxX, minY, maxY };
    }

    useEffect(() => {
        if (triggerUpdate) {
            const loadData = async () => {
                try {
                    const data: ReactionsData = await fetchReactions();
                    console.log(data);
                    const initialVisualData = transformToVisualData(data); // Transforming reactions data to visual format
                    setVisualData(initialVisualData);

                    if (inputNodes !== '') {
                        console.log("Filtering nodes for:", inputNodes);
                        const filteredData = filterVisualData(initialVisualData, inputNodes);
                        setVisualData(filteredData);
                    }

                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            };

            loadData();
            setTriggerUpdate(false);
        }
    }, [triggerUpdate]);

    const filterVisualData = (visualData: VisualData, inputNodes: string): FilteredVisualData => {

        const inputArray = inputNodes.split(',').map(item => item.trim().toLowerCase());

        const filteredNodes = visualData.nodes.filter(node =>
            inputArray.includes(node.label.toLowerCase())
        );

        const filteredEdges = visualData.edges.filter(edge =>
            filteredNodes.some(node => node.id === edge.source) &&
            filteredNodes.some(node => node.id === edge.target)
        );

        return { nodes: filteredNodes, edges: filteredEdges };
    };

    useEffect(() => {
        const sketch = new p5((p: p5) => {
            let selectedNode: VisualNode | null = null;
            let offset: p5.Vector | null = null;

            p.setup = () => {
                const bounds = calculateBounds(visualData.nodes);
                // Adding a margin around the content
                const margin = 50;
                const width = bounds.maxX - bounds.minX + margin * 20;
                const height = bounds.maxY - bounds.minY + margin * 2;

                // Adjust canvas position if needed to ensure it's visible
                const canvasX = Math.max(0, -bounds.minX + margin);
                const canvasY = Math.max(0, -bounds.minY + margin);

                p.createCanvas(width, height);
                p.translate(canvasX, canvasY);
                p.textAlign(p.CENTER, p.CENTER);
            };

            p.draw = () => {
                p.background(255);
                // colored margin around the canvas
                drawEdges(p, visualData.edges, visualData.nodes);
                drawNodes(p, visualData.nodes);
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };

            p.mousePressed = () => {
                visualData.nodes.forEach((node) => {
                    const d = p.dist(p.mouseX, p.mouseY, node.x, node.y);
                    const nodeRadius = node.type === 'circle' ? 20 : Math.sqrt(800); // Assuming square size is 40x40, hence diagonal is sqrt(1600)
                    const isInsideNode = d < nodeRadius;

                    if (isInsideNode) {
                        selectedNode = node;
                        offset = p.createVector(p.mouseX - node.x, p.mouseY - node.y);
                        p.cursor(p.HAND); // Optional: Change cursor to indicate draggable item
                        return;
                    }
                });
            };

            p.mouseDragged = () => {
                if (selectedNode && offset) {
                    selectedNode.x = p.mouseX - offset.x;
                    selectedNode.y = p.mouseY - offset.y;
                }
            };

            p.mouseReleased = () => {
                if (selectedNode) {
                    selectedNode = null;
                    offset = null;
                    if (p) {
                        p.cursor(p.ARROW); // Change cursor back to default
                    }
                }
            };


            function drawNodes(p: p5, nodes: VisualNode[]): void {
                nodes.forEach((node) => {
                    p.fill(node.color);
                    if (node.type === 'circle') {
                        p.ellipse(node.x, node.y, 40, 40);
                    } else { // Assume type 'square' for reactions
                        p.rect(node.x - 20, node.y - 20, 40, 40);
                    }
                    p.fill(0);
                    p.text(node.label, node.x, node.y);
                });
            }

            function drawEdges(p: p5, edges: VisualEdge[], nodes: VisualNode[]): void {
                edges.forEach(edge => {
                    const sourceNode = nodes.find(node => node.id === edge.source);
                    const targetNode = nodes.find(node => node.id === edge.target);
                    if (sourceNode && targetNode) {
                        // Now passing edge.color to drawArrow
                        drawArrow(p, sourceNode.x, sourceNode.y, targetNode.x, targetNode.y, edge.color);
                    }
                });
            }

            function drawArrow(p: p5, sourceX: number, sourceY: number, targetX: number, targetY: number, color: string | p5.Color) {

                const arrowColor = typeof color === 'string' ? p.color(color) : color;
                // Calculate the angle from the source to the target
                const angle = Math.atan2(targetY - sourceY, targetX - sourceX);

                // Set the length of the arrow head
                const arrowLength = 35;
                const arrowWidth = 13;

                // Move to the source position
                p.push(); // Save the current drawing state
                p.stroke(arrowColor); // Set arrow color here if needed
                p.fill(arrowColor); // Set arrow fill color here if needed

                // Draw the line from source to target
                p.line(sourceX, sourceY, targetX, targetY);

                // Move to the target position and rotate to draw the arrow head
                p.translate(targetX, targetY);
                p.rotate(angle);

                // Draw the arrow head as a triangle
                p.triangle(0, 0, -arrowLength, arrowWidth, -arrowLength, -arrowWidth);

                p.pop(); // Restore the original drawing state
            }

        });

        return () => {
            sketch.remove();
        };
    }, [visualData]);

    return <div />;
};

export default Sketch;