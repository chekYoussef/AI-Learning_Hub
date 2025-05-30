import { useEffect } from "react";
import "../styles/roadmap.css";

declare global {
  interface Window {
    Treant: any;
  }
}

const CourseRoadmap = () => {
  useEffect(() => {
    const courseRoadmapConfig = {
      chart: {
        container: "#course-roadmap",
        rootOrientation: "WEST",
        node: {
          collapsable: true,
        },
        animation: {
          nodeAnimation: "easeOutBounce",
          nodeSpeed: 700,
          connectorsAnimation: "bounce",
          connectorsSpeed: 700,
        },
        connectors: {
          type: "step",
          style: {
            "stroke-width": 2,
            stroke: "#ccc",
          },
        },
      },
      nodeStructure: {
        innerHTML: `
          <div class="node-content">
            <h3>Introduction to Programming</h3>
            <iframe width="200" height="113" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
            <p>Learn the basics of programming, including variables, control structures, and functions.</p>
          </div>
        `,
        children: [
          {
            innerHTML: `
              <div class="node-content">
                <h3>Data Structures</h3>
                <iframe width="200" height="113" src="https://www.youtube.com/embed/8hly31xKli0" frameborder="0" allowfullscreen></iframe>
                <p>Understand arrays, linked lists, stacks, and queues.</p>
              </div>
            `,
            children: [
              {
                innerHTML: `
                  <div class="node-content">
                    <h3>Algorithms</h3>
                    <iframe width="200" height="113" src="https://www.youtube.com/embed/rL8X2mlNHPM" frameborder="0" allowfullscreen></iframe>
                    <p>Dive into sorting algorithms, search algorithms, and algorithm complexity.</p>
                  </div>
                `,
              },
            ],
          },
          {
            innerHTML: `
              <div class="node-content">
                <h3>Object-Oriented Programming</h3>
                <iframe width="200" height="113" src="https://www.youtube.com/embed/pTB0EiLXUC8" frameborder="0" allowfullscreen></iframe>
                <p>Explore classes, objects, inheritance, and polymorphism.</p>
              </div>
            `,
          },
        ],
      },
    };

    new window.Treant(courseRoadmapConfig);

    const container = document.querySelector(".roadmap-wrapper");
    if (container) {
      container.scrollTop = 0; // scroll to top
      container.scrollLeft =
        container.scrollWidth / 2 - container.clientWidth / 2; // center horizontally
    }
  }, []);

  return (
    <div className="roadmap-wrapper">
      <div id="course-roadmap" />
    </div>
  );
};

export default CourseRoadmap;
