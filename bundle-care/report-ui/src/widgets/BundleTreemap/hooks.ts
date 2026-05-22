import { useEffect, useMemo, useRef } from "react";
import * as d3Hierarchy from "d3-hierarchy";
import { buildTree, type TreeNode } from "@shared/utils/buildTree";
import { createSVGElement, truncateLabel } from "@shared/utils/svgHelper";
import { useSelectedModules } from "@entities/report/model/hooks";
import { TREEMAP_COLORS, MIN_NODE_WIDTH, MIN_NODE_HEIGHT, LABEL_FONT_SIZE } from "./constants";

export function useTreemap(width: number, height: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modules = useSelectedModules();

  const leaves = useMemo(() => {
    if (modules.length === 0) { return []; }

    const treeData = buildTree(modules);
    const root = d3Hierarchy
      .hierarchy<TreeNode>(treeData)
      .sum((node) => node.size)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    d3Hierarchy.treemap<TreeNode>().size([width, height]).padding(2)(root);

    return (root.leaves() as d3Hierarchy.HierarchyRectangularNode<TreeNode>[]).map(
      (leaf, index) => ({
        x0: leaf.x0,
        y0: leaf.y0,
        x1: leaf.x1,
        y1: leaf.y1,
        path: leaf.data.path,
        name: leaf.data.name,
        value: leaf.value ?? 0,
        color: TREEMAP_COLORS[index % TREEMAP_COLORS.length],
      })
    );
  }, [modules, width, height]);

  useEffect(() => {
    if (!containerRef.current || leaves.length === 0) { return; }

    const container = containerRef.current;
    container.innerHTML = "";

    const svgEl = createSVGElement("svg", {
      width: String(width),
      height: String(height),
    });

    leaves.forEach((leaf) => {
      const nodeWidth = leaf.x1 - leaf.x0;
      const nodeHeight = leaf.y1 - leaf.y0;
      if (nodeWidth < 2 || nodeHeight < 2) { return; }

      const g = createSVGElement("g", {
        transform: `translate(${leaf.x0},${leaf.y0})`,
      });

      const rect = createSVGElement("rect", {
        width: String(nodeWidth),
        height: String(nodeHeight),
        fill: leaf.color,
        "fill-opacity": "0.8",
        stroke: "#fff",
        "stroke-width": "1",
      });
      rect.style.cursor = "pointer";

      const titleEl = createSVGElement("title", {});
      titleEl.textContent = `${leaf.path}\n${(leaf.value / 1024).toFixed(1)} KB`;

      g.appendChild(titleEl);
      g.appendChild(rect);

      if (nodeWidth > MIN_NODE_WIDTH && nodeHeight > MIN_NODE_HEIGHT) {
        const text = createSVGElement("text", {
          x: String(nodeWidth / 2),
          y: String(nodeHeight / 2),
          "text-anchor": "middle",
          "dominant-baseline": "middle",
          fill: "#fff",
          "font-size": LABEL_FONT_SIZE,
          "font-weight": "500",
        });
        text.textContent = truncateLabel(leaf.name);
        g.appendChild(text);
      }

      svgEl.appendChild(g);
    });

    container.appendChild(svgEl);
  }, [leaves, width, height]);

  return containerRef;
}
