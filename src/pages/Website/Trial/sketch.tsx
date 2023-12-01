import React, { useEffect } from 'react';
import p5 from 'p5';

const Sketch: React.FC = () => {
    interface Node {
        x: number;
        y: number;
    }

    useEffect(() => {
        let sketch: p5;

        const sketchFunction = (p: p5) => {
            const numNodes = 5;
            const nodeRadius = 20;
            const nodes: Node[] = [];

            p.setup = () => {
                p.createCanvas(400, 400);
                // Create 5 nodes at random positions
                for (let i = 0; i < numNodes; i++) {
                    const x = p.random(nodeRadius, p.width - nodeRadius);
                    const y = p.random(nodeRadius, p.height - nodeRadius);
                    nodes.push({ x, y });
                }
            };

            p.draw = () => {
                p.background(220);
                p.stroke(0);

                // Draw edges between nodes
                for (let i = 0; i < numNodes; i++) {
                    for (let j = i + 1; j < numNodes; j++) {
                        p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    }
                }

                // Draw nodes
                p.fill(150);
                for (let i = 0; i < numNodes; i++) {
                    p.ellipse(nodes[i].x, nodes[i].y, nodeRadius * 2);
                }
            };
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
