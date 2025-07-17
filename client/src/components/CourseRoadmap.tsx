// src/components/CourseRoadmap.tsx
import { useEffect } from "react";
import "../styles/roadmap.css";

declare global {
  interface Window {
    Treant: any;
  }
}
interface RoadmapNode {
  title: string;
  description: string;
  videoUrl?: string;
  bannerImage?: string;
  children?: RoadmapNode[];
}

interface CourseRoadmapProps {
  category: string;
}

const CourseRoadmap: React.FC<CourseRoadmapProps> = ({ category }) => {
  useEffect(() => {
    const container = document.getElementById("course-roadmap");
    if (container) {
      container.classList.remove("loaded");
      container.innerHTML = "";
    }

    const renderNode = (node: RoadmapNode): any => ({
      innerHTML: `
        <div class="node-content">
          ${
            node.videoUrl
              ? `<iframe loading="lazy" width="240" height="113" src="${node.videoUrl}" frameborder="0" allowfullscreen></iframe>`
              : `<img src="${node.bannerImage}" width="240" height="113" alt="Banner" />`
          }
          <h3>${node.title}</h3>
          <p>${node.description}</p>
        </div>
      `,
      children: node.children?.map(renderNode) || [],
    });

    fetch(`/api/roadmaps/${category.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch roadmap");
        return res.json();
      })
      .then((data) => {
        const treantConfig = {
          chart: {
            container: "#course-roadmap",
            rootOrientation: "NORTH",
            node: { collapsable: true },
            connectors: {
              type: "bCurve",
              style: { "stroke-width": 2, stroke: "#ccc" },
            },
          },
          nodeStructure: renderNode(data.nodeStructure),
        };

        new window.Treant(treantConfig, () => {
          const wrapper = document.querySelector(".roadmap-wrapper");
          if (wrapper) {
            setTimeout(() => {
              wrapper.scrollLeft =
                wrapper.scrollWidth / 2 - wrapper.clientWidth / 2;
              wrapper.scrollTop =
                wrapper.scrollHeight / 2 - wrapper.clientHeight / 2;
            }, 200);
          }
          if (container) container.classList.add("loaded");
        });
      })
      .catch((err) => {
        console.error("Error loading roadmap:", err);
      });
  }, [category]);

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
