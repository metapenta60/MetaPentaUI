import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import { fetchMetabolites } from '../../../API/fetch/model';
import { Metabolite, Edge } from '../../../interfaces/types';

const Sketch: React.FC = () => {

    const [metabolites, setMetabolites] = useState<Metabolite[]>([]);
    interface Node {
        x: number;
        y: number;
        label: string;
        color: string;
        type: string;
    }

    interface Edge {
        source: number;
        target: number;
        weight: string;
    }

    useEffect(() => {
        let sketch: p5;
        const loadData = async () => {
            try {
                const data = await fetchMetabolites();
                setMetabolites(data); // Update state with fetched metabolites
            } catch (error) {
                console.error("Failed to fetch metabolites:", error);
            }
        };

        loadData();
        console.log(metabolites);
        const sketchFunction = (p: p5) => {
            let selectedNode: Node | null = null;
            let offset: p5.Vector | null = null;
            const nodes: Node[] = [];
            const edges: Edge[] = [];

            p.setup = () => {
                p.createCanvas(800, 700);
                createGraph();

            };

            p.draw = () => {
                p.background(120);
                p.stroke(0);

                drawEdges();
                drawNodes();
            };


            p.mousePressed=()=> {




                for (let node of nodes) {
                    let d: number = Number.MAX_VALUE;

                    if (node.type === 'circle') {
                        d = p.dist(p.mouseX, p.mouseY, node.x, node.y);
                    } else if (node.type === 'square') {
                        d = p.dist(p.mouseX, p.mouseY, node.x, node.y + 27);
                    } else if (node.type === 'circle3') {
                        d = p.dist(p.mouseX, p.mouseY, node.x + 5, node.y + 10);
                    } else if (node.type === 'square1') {
                        d = p.dist(p.mouseX, p.mouseY, node.x, node.y + 27);
                    }


                    if (d < 20) {
                        selectedNode = node;
                        offset = p.createVector(p.mouseX - node.x, p.mouseY - node.y);
                        break;
                    }
                }
            }

            p.mouseDragged=()=> {
                if (selectedNode) {
                    selectedNode.x = p.mouseX - offset!.x;
                    selectedNode.y = p.mouseY - offset!.y;
                }
            }

            p.mouseReleased=()=> {
                selectedNode = null;
            }



            function drawNodes() {
                for (let node of nodes) {
                    p.fill(node.color);
                    if (node.type === 'circle') {

                        p.ellipse(node.x, node.y, 40, 40);
                        p.fill(0);
                        p.text(node.label, node.x, node.y);
                    } else if (node.type === 'square') {

                        p.rect(node.x - 20, node.y + 5, 40, 40);
                        p.fill(0);
                        p.text(node.label, node.x, node.y + 27);
                    }
                    else if (node.type==='circle3' ){
                        p.ellipse(node.x +10 , node.y + 5, 40, 40);
                        p.fill(0);
                        p.text(node.label, node.x +5, node.y + 10);
                    }

                    else if (node.type==='square1' ){
                        p.rect(node.x - 15, node.y + 5, 40, 40);
                        p.fill(0);
                        p.text(node.label, node.x, node.y + 27);
                    }


                }
            }

            function drawEdges() {
                p.stroke(0);
                for (let edge of edges) {
                    let v1 = nodes[edge.source];
                    let v2 = nodes[edge.target];
                    let weight = edge.weight;

                    // Draw line connecting nodes
                    if (v1.type === 'circle') {
                        p.line(v1.x, v1.y, v2.x, v2.y);
                        drawArrowhead(v1.x, v1.y + 5, v2.x, v2.y + 5, 0);
                    } else if (v1.type === 'square') {
                        p.line(v1.x + 2, v1.y + 25, v2.x - 5, v2.y - 12);
                        drawArrowhead(v1.x + 2, v1.y + 25, v2.x - 5, v2.y - 12, -45);
                    } else if (v1.type === 'circle3') {
                        p.line(v1.x + 30, v1.y + 10, v2.x - 20, v2.y + 30);
                        drawArrowhead(v1.x - 10, v1.y, v2.x - 20, v2.y + 36, -15);
                    }

                    // Display weight text adjusted to be along the line
                    let midX = (v1.x + v2.x) / 2;
                    let midY = (v1.y + v2.y) / 2;
                    p.fill(0); // Set text color
                    p.textAlign(p.CENTER, p.CENTER); // Align text for better positioning
                    p.text(weight, midX, midY);
                }
            }

            function drawArrowhead(x1:number, y1:number, x2:number, y2:number,radian:number) {
                let angle:number = p.atan2(y2 - y1, x2 - x1);
                p.push();
                p.translate(x2, y2);
                let angleInDegrees = 180 + radian;
                let angleInRadians = p.radians(angleInDegrees);
                p.rotate(angleInRadians);
                p.triangle(-5, 10, 5, 10, 0, 0);
                p.pop();
            }

            // Calculates the edge point on a circle for a line between two points
            function getCircleEdgePoint(node: Node, targetX: number, targetY: number): { x: number; y: number; } {
                const radius: number = 20; // Assuming circle radius is 20
                const angle: number = Math.atan2(targetY - node.y, targetX - node.x);
                return {
                    x: node.x + Math.cos(angle) * radius,
                    y: node.y + Math.sin(angle) * radius,
                };
            }

            // Calculates the edge point on a square for a line
            function getSquareEdgePoint(node: Node, targetX: number, targetY: number): { x: number; y: number; } {
                const width: number = 40; // Assuming square's width and height
                const halfWidth: number = width / 2;
                const dx: number = targetX - node.x;
                const dy: number = targetY - node.y;
                let angle: number = Math.atan2(dy, dx);
                let x: number, y: number;

                if (Math.abs(Math.tan(angle)) < 1) {
                    // Intersects with left/right side
                    x = dx > 0 ? node.x + halfWidth : node.x - halfWidth;
                    y = node.y + Math.tan(angle) * (dx > 0 ? halfWidth : -halfWidth);
                } else {
                    // Intersects with top/bottom
                    x = node.x + (dy > 0 ? halfWidth : -halfWidth) / Math.tan(angle);
                    y = dy > 0 ? node.y + halfWidth : node.y - halfWidth;
                }
                return { x, y };
            }

            function createGraph() {
                // Create nodes
                let circle1 = { x: 100, y: 100, label: 'A', color: 'orange', type: 'circle' };

                let circle2 = { x: 300, y: 100, label: 'B', color: 'orange', type: 'circle' };

                let square = { x: 200, y: 300, label: 'C', color: 'blue', type: 'square' };

                let circle3 = { x: 300, y: 500, label: 'D', color: 'pink', type: 'circle3' };

                let square1 = { x: 500, y: 400, label: 'E', color: 'blue', type: 'square1' };


                nodes.push(circle1);
                nodes.push(circle2);
                nodes.push(square);
                nodes.push(circle3);
                nodes.push(square1);

                // Create edges

                edges.push({source: 1, target:2, weight: '1.0'}); // B to C with weight 1.0
                edges.push({source: 0, target: 2, weight: '1.0'}); // A to C with weight 1.0
                edges.push({source: 0, target: 2, weight:'1.0'}); // A to C with weight 1.0 (square connection)
                edges.push({source:2,target:3,weight:'1.0'});// C to D with weight 1.0
                edges.push({source: 3, target: 4,weight:'1.0'});// D to E with weight 1.0


            }


        };


        // Create a new p5 instance
        sketch = new p5(sketchFunction);

        // Clean up the sketch on component unmount
        return () => {
            if (sketch) {
                sketch.remove();
            }
        };
    }, []);

    return <></>;
};

export default Sketch;
