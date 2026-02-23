// src/components/CourseRoadmap.tsx
import { useEffect, useRef, useState } from "react";
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
  const roadmapContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const container = roadmapContainerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;
    let resizeTimer: ReturnType<typeof setTimeout>;

    // ─── Zoom handler ───────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!container) return;

      const current = (container as any)._currentScale ?? 1;
      const chartW = (container as any)._chartW ?? container.offsetWidth;
      const chartH = (container as any)._chartH ?? container.offsetHeight;

      const availW = wrapperRef.current?.clientWidth ?? 0;
      const availH = wrapperRef.current?.clientHeight ?? 0;

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const next = Math.min(3, Math.max(0.1, current * delta));

      // Recenter at every zoom level
      const translateX = (availW - chartW * next) / 2;
      const translateY = (availH - chartH * next) / 2;

      (container as any)._currentScale = next;
      (container as any)._translateX = translateX;
      (container as any)._translateY = translateY;

      container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${next})`;
    };

    // ─── Pan handlers ────────────────────────────────────────────────
    let isDragging = false;
    let startX = 0,
      startY = 0;
    let scrollLeft = 0,
      scrollTop = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!wrapper) return;
      isDragging = true;
      startX = e.pageX - wrapper.offsetLeft;
      startY = e.pageY - wrapper.offsetTop;
      scrollLeft = wrapper.scrollLeft;
      scrollTop = wrapper.scrollTop;
      wrapper.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !wrapper) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const y = e.pageY - wrapper.offsetTop;
      wrapper.scrollLeft = scrollLeft - (x - startX);
      wrapper.scrollTop = scrollTop - (y - startY);
    };

    const handleMouseUp = () => {
      isDragging = false;
      if (wrapper) wrapper.style.cursor = "grab";
    };

    // ─── Main render function ────────────────────────────────────────
    const renderRoadmap = async () => {
      if (!container || !wrapper) return;

      setLoading(true);
      setError(null);
      container.classList.remove("loaded");
      container.innerHTML = "";

      // Reset previously applied styles
      container.style.transform = "";
      container.style.width = "";
      container.style.height = "";
      container.style.marginBottom = "";
      container.style.marginRight = "";
      container.style.marginLeft = "";
      container.style.marginTop = "";

      const viewportW = wrapper.clientWidth;
      const viewportH = wrapper.clientHeight;
      const estimatedColumns = 4;
      const estimatedRows = 3;
      const padding = 40;

      const maxNodeW = Math.floor(
        (viewportW - padding * (estimatedColumns + 1)) / estimatedColumns
      );
      const maxNodeH = Math.floor(
        (viewportH - padding * (estimatedRows + 1)) / estimatedRows
      );

      const nodeW = Math.min(240, Math.max(120, maxNodeW));
      const nodeH = Math.min(235, Math.max(110, maxNodeH));
      const mediaH = Math.round(nodeH * 0.48);

      const renderNode = (node: RoadmapNode): any => ({
        innerHTML: `
          <div class="node-content">
            ${
              node.videoUrl
                ? `<iframe loading="lazy" width="${nodeW}" height="${mediaH}" src="${node.videoUrl}" frameborder="0" allowfullscreen></iframe>`
                : `<img src="${node.bannerImage}" width="${nodeW}" height="${mediaH}" alt="Banner" />`
            }
            <h3>${node.title}</h3>
            <p>${node.description}</p>
          </div>
        `,
        width: nodeW,
        height: nodeH,
        children: node.children?.map(renderNode) || [],
      });

      try {
        const res = await fetch(`/api/roadmaps/${category.toLowerCase()}`);
        if (!res.ok) throw new Error(`Failed to fetch roadmap for ${category}`);
        const data = await res.json();
        if (!isMounted) return;

        const treantConfig = {
          chart: {
            container: `#${container.id}`,
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
          if (!isMounted) return;

          setTimeout(() => {
            const nodeEls = Array.from(
              container.querySelectorAll(".node")
            ) as HTMLElement[];

            if (nodeEls.length === 0) return;

            // Step 1: Find true bounding box
            let minLeft = Infinity,
              minTop = Infinity;
            let maxRight = -Infinity,
              maxBottom = -Infinity;

            nodeEls.forEach((el) => {
              const l = el.offsetLeft;
              const t = el.offsetTop;
              const r = l + el.offsetWidth;
              const b = t + el.offsetHeight;
              if (l < minLeft) minLeft = l;
              if (t < minTop) minTop = t;
              if (r > maxRight) maxRight = r;
              if (b > maxBottom) maxBottom = b;
            });

            const PADDING = 30;

            // Step 2: Physically shift all nodes so tree starts at (PADDING, PADDING)
            const shiftX = -minLeft + PADDING;
            const shiftY = -minTop + PADDING;

            nodeEls.forEach((el) => {
              el.style.left = `${el.offsetLeft + shiftX}px`;
              el.style.top = `${el.offsetTop + shiftY}px`;
            });

            // Step 3: Shift SVG connectors by same amount
            const svgEl = container.querySelector("svg");
            if (svgEl) {
              const svgLeft = parseFloat(svgEl.style.left || "0");
              const svgTop = parseFloat(svgEl.style.top || "0");
              svgEl.style.position = "absolute";
              svgEl.style.left = `${svgLeft + shiftX}px`;
              svgEl.style.top = `${svgTop + shiftY}px`;
              svgEl.style.overflow = "visible";
            }

            // Step 4: Set container to exact content size
            const chartW = maxRight - minLeft + PADDING * 2;
            const chartH = maxBottom - minTop + PADDING * 2;

            container.style.position = "relative";
            container.style.width = `${chartW}px`;
            container.style.height = `${chartH}px`;
            container.style.overflow = "visible";
            container.style.margin = "0"; // clear all margins — we use translate instead
            container.style.transformOrigin = "0 0"; // scale from top-left corner

            const availW = wrapper.clientWidth;
            const availH = wrapper.clientHeight;

            // Step 5: Calculate scale to fit entire tree
            const scale = Math.min(availW / chartW, availH / chartH);

            // Step 6: Calculate translation to CENTER the scaled tree in the wrapper
            // After scaling from 0,0 the tree occupies (chartW*scale x chartH*scale)
            // We shift it so it sits in the middle of the wrapper
            const translateX = (availW - chartW * scale) / 2;
            const translateY = (availH - chartH * scale) / 2;

            // Use translate + scale — this keeps centering correct at any zoom level
            container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

            // Store base values for zoom buttons
            (container as any)._baseScale = scale;
            (container as any)._currentScale = scale;
            (container as any)._translateX = translateX;
            (container as any)._translateY = translateY;
            (container as any)._chartW = chartW;
            (container as any)._chartH = chartH;

            container.classList.add("loaded");
          }, 300);
        });
      } catch (err: any) {
        console.error("Error loading roadmap:", err);
        if (isMounted) setError(err.message || "An unknown error occurred.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // ─── Attach event listeners ──────────────────────────────────────
    if (wrapper) {
      wrapper.style.cursor = "grab";
      wrapper.style.overflow = "auto";
      wrapper.addEventListener("wheel", handleWheel, { passive: false });
      wrapper.addEventListener("mousedown", handleMouseDown);
      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseup", handleMouseUp);
      wrapper.addEventListener("mouseleave", handleMouseUp);
    }

    // ─── Resize handler ──────────────────────────────────────────────
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => renderRoadmap(), 250);
    };
    window.addEventListener("resize", handleResize);

    // ─── Kick off first render ───────────────────────────────────────
    renderRoadmap();

    // ─── Cleanup ─────────────────────────────────────────────────────
    return () => {
      isMounted = false;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (wrapper) {
        wrapper.removeEventListener("wheel", handleWheel);
        wrapper.removeEventListener("mousedown", handleMouseDown);
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseup", handleMouseUp);
        wrapper.removeEventListener("mouseleave", handleMouseUp);
      }
    };
  }, [category]);

  return (
    <div className="roadmap-wrapper" ref={wrapperRef}>
      {loading && <div className="roadmap-status">Loading Roadmap...</div>}
      {error && <div className="roadmap-status error">Error: {error}</div>}

      <div className="roadmap-controls">
        <button
          onClick={() => {
            const c = roadmapContainerRef.current;
            if (!c) return;
            const base = (c as any)._baseScale ?? 1;
            const chartW = (c as any)._chartW ?? c.offsetWidth;
            const chartH = (c as any)._chartH ?? c.offsetHeight;
            const availW = wrapperRef.current!.clientWidth;
            const availH = wrapperRef.current!.clientHeight;
            const tx = (availW - chartW * base) / 2;
            const ty = (availH - chartH * base) / 2;
            (c as any)._currentScale = base;
            c.style.transform = `translate(${tx}px, ${ty}px) scale(${base})`;
          }}
        >
          ⟳ Fit
        </button>

        <button
          onClick={() => {
            const c = roadmapContainerRef.current;
            const w = wrapperRef.current;
            if (!c || !w) return;
            const next = Math.min(3, ((c as any)._currentScale ?? 1) * 1.2);
            const chartW = (c as any)._chartW ?? c.offsetWidth;
            const chartH = (c as any)._chartH ?? c.offsetHeight;
            const tx = (w.clientWidth - chartW * next) / 2;
            const ty = (w.clientHeight - chartH * next) / 2;
            (c as any)._currentScale = next;
            c.style.transform = `translate(${tx}px, ${ty}px) scale(${next})`;
          }}
        >
          ＋
        </button>

        <button
          onClick={() => {
            const c = roadmapContainerRef.current;
            const w = wrapperRef.current;
            if (!c || !w) return;
            const next = Math.max(0.1, ((c as any)._currentScale ?? 1) * 0.8);
            const chartW = (c as any)._chartW ?? c.offsetWidth;
            const chartH = (c as any)._chartH ?? c.offsetHeight;
            const tx = (w.clientWidth - chartW * next) / 2;
            const ty = (w.clientHeight - chartH * next) / 2;
            (c as any)._currentScale = next;
            c.style.transform = `translate(${tx}px, ${ty}px) scale(${next})`;
          }}
        >
          －
        </button>
      </div>

      <div id="course-roadmap" ref={roadmapContainerRef} />
    </div>
  );
};

export default CourseRoadmap;
