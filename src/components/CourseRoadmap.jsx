import { useEffect } from 'react';
import Raphael from 'raphael'; // Required even if not directly used
import '../styles/roadmap.css';

export default function CourseRoadmap() {
  useEffect(() => {
    const config = {
      chart: {
        container: "#roadmap-tree",
        rootOrientation: "WEST",
        node: { collapsable: true },
        connectors: {
          type: 'step',
          style: { "stroke": "#ccc", "stroke-width": 2 }
        }
      },
      nodeStructure: {
        innerHTML: `
          <div class="node-content">
            <h3>Intro to Programming</h3>
            <iframe width="200" height="113" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
            <p>Learn the basics of coding.</p>
          </div>
        `,
        children: [
          {
            innerHTML: `
              <div class="node-content">
                <h3>Data Structures</h3>
                <iframe width="200" height="113" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
                <p>Learn about arrays, stacks, and queues.</p>
              </div>
            `
          }
        ]
      }
    };

    new window.Treant(config);
  }, []);

  return <div id="roadmap-tree"></div>;
}
