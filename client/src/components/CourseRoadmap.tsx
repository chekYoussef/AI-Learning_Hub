import { useEffect } from "react";
import "../styles/roadmap.css";

declare global {
  interface Window {
    Treant: any;
  }
}

const CourseRoadmap = () => {
  useEffect(() => {
    const container = document.getElementById("course-roadmap");
    if (container) {
      container.classList.remove("loaded"); // reset fade-in
      container.innerHTML = "";
    }

    const courseRoadmapConfig = {
      chart: {
        container: "#course-roadmap",
        rootOrientation: "NORTH",
        node: {
          collapsable: true,
        },
        animation: {},
        connectors: {
          type: "bCurve",
          style: {
            "stroke-width": 2,
            stroke: "#ccc",
          },
        },
      },
      nodeStructure: {
        innerHTML: `
          <div class="node-content">
            <iframe loading="lazy" width="240" height="113" src="https://www.youtube.com/embed/IyR_uYsRdPs" frameborder="0" allowfullscreen></iframe>
            <h3>Getting to Know the work area</h3>
            <p>Learn the foundations in Adobe Photoshop.</p>
          </div>
        `,
        children: [
          {
            innerHTML: `
              <div class="node-content">
                <iframe loading="lazy" width="240" height="113" src="https://www.youtube.com/embed/fsd2NUfJkNw" frameborder="0" allowfullscreen></iframe>
                <h3>Basic Photo Corrections</h3>
                <p>Learn how to retouch images.</p>
              </div>
            `,
            children: [
              {
                rootOrientation: "EAST",
                innerHTML: `
                  <div class="node-content">
                    <iframe loading="lazy" width="240" height="113" src="https://www.youtube.com/embed/xud3wV5sKRU" frameborder="0" allowfullscreen></iframe>
                    <h3>Working with Selections</h3>
                    <p>Getting started with selection tools.</p>
                  </div>
                `,
              },
            ],
          },
          {
            innerHTML: `
              <div class="node-content">
                <iframe loading="lazy" width="240" height="113" src="https://www.youtube.com/embed/unCS9syPJjg" frameborder="0" allowfullscreen></iframe>
                <h3>Layer Basics</h3>
                <p>About Layers, using the Layers panel, etc.</p>
              </div>
            `,
          },
        ],
      },
    };

    new window.Treant(courseRoadmapConfig, () => {
      // Scroll to center
      const wrapper = document.querySelector(".roadmap-wrapper");
      if (wrapper) {
        setTimeout(() => {
          wrapper.scrollLeft =
            wrapper.scrollWidth / 2 - wrapper.clientWidth / 2;
          wrapper.scrollTop =
            wrapper.scrollHeight / 2 - wrapper.clientHeight / 2;
        }, 200);
      }

      // Add fade-in class
      if (container) {
        container.classList.add("loaded");
      }
    });
  }, []);

  return (
    <div
      className="roadmap-wrapper"
      style={{ width: "100vw", height: "100vh", overflow: "auto" }}
    >
      <div id="course-roadmap" />
    </div>
  );
};

export default CourseRoadmap;
