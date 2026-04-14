import re

with open("brazil_source.txt", "r", encoding="utf-8") as f:
    content = f.read()

new_component = """\"use client\";

import React, { useState } from "react";

export interface BrazilMapProps {
  onStateSelect?: (stateCode: string) => void;
  selectedState?: string | null;
  className?: string;
  activeStates?: string[]; // Para destacar estados que possuem representantes
}

export function BrazilMap({ onStateSelect, selectedState, className = "", activeStates = [] }: BrazilMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const defaultFill = "#e5e7eb"; // industrial-200
  const activeFill = "#eab308"; // accent-premium / yellow-500
  const hasDataFill = "#fde047"; // levemente iluminado se tiver representante, opcional
  const strokeColor = "#ffffff";

  // Helper for rendering paths
  const StatePath = ({ id, d1, d2, title }: { id: string; d1: string; d2?: string; title: string }) => {
    const isSelected = selectedState === id;
    const isHovered = hoveredState === id;
    const hasData = activeStates.includes(id);
    
    let fill = defaultFill;
    if (isSelected) fill = activeFill;
    else if (isHovered) fill = activeFill;
    else if (hasData) fill = hasDataFill;

    return (
      <g
        id={id}
        onClick={() => onStateSelect?.(id)}
        onMouseEnter={() => setHoveredState(id)}
        onMouseLeave={() => setHoveredState(null)}
        className="cursor-pointer transition-colors duration-300 outline-none"
      >
        <title>{title}</title>
        <path d={d1} fill={fill} stroke={strokeColor} strokeWidth="2" className="transition-all duration-300 transform origin-center hover:scale-[1.01]" />
        {d2 && <path d={d2} fill={fill} stroke={strokeColor} strokeWidth="2" className="transition-all duration-300 transform origin-center hover:scale-[1.01]" />}
      </g>
    );
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto drop-shadow-xl ${className}`}>
      <svg
        version="1.1"
        viewBox="0 0 450 460"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
"""

paths_code = re.search(r"<g>(.*?)</g>", content, re.DOTALL)
if paths_code:
    paths_str = paths_code.group(1)
    
    for pm in re.finditer(r"<PathMap([^>]*?)(?:/>|>.*?></PathMap>)", paths_str, re.DOTALL):
        attrs = pm.group(1)
        district = re.search(r"districtItem=[\"'](.*?)[\"']", attrs)
        d1 = re.search(r"d1=[\"'](.*?)[\"']", attrs, re.DOTALL)
        d2 = re.search(r"d2=[\"'](.*?)[\"']", attrs, re.DOTALL)
        title = re.search(r"title=[\"'](.*?)[\"']", attrs, re.DOTALL)
        
        if district and d1 and title:
            dist_val = district.group(1)
            d1_val = " ".join(d1.group(1).split())
            title_val = title.group(1)
            
            if d2:
                d2_val = " ".join(d2.group(1).split())
                d2_str = f' d2="{d2_val}"'
            else:
                d2_str = ""
            
            new_component += f'        <StatePath id="{dist_val}" title="{title_val}" d1="{d1_val}"{d2_str} />\n'

new_component += """
      </svg>
    </div>
  );
}
"""

with open("src/components/ui/brazil-map.tsx", "w", encoding="utf-8") as f:
    f.write(new_component)

print("Created src/components/ui/brazil-map.tsx successfully.")
