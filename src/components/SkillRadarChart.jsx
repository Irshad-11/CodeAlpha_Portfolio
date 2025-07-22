import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function SkillRadarChart({ data, title }) {
  // Custom Tooltip (inline)
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const { skill, value } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#1e293b",
          border: "1px solid #22c55e",
          borderRadius: 10,
          padding: "6px 10px",
          color: "#22c55e",
          fontSize: 12,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <strong>{skill}</strong>: {value}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-[#22c55e] mb-4 text-center">{title}</h3>
      <div className="w-[300px] h-[300px] sm:h-[350px] md:w-[500px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis
              dataKey="skill"
              stroke="#cbd5e1"
              tick={({ payload, x, y, textAnchor }) => {
                const angle = payload.coordinate;
                const RADIAN = Math.PI / 180;
                const radiusOffset = 16;

                const offsetX = Math.cos(-angle * RADIAN) * radiusOffset;
                const offsetY = Math.sin(-angle * RADIAN) * radiusOffset;

                const adjustedX = x + offsetX;
                const adjustedY = y + offsetY;

                const lines = payload.value.split(" ");

                return (
                  <text
                    x={adjustedX}
                    y={adjustedY}
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize={12}
                  >
                    {lines.map((line, i) => (
                      <tspan x={adjustedX} dy={i === 0 ? 0 : 14} key={i}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              }}
            />
            <PolarRadiusAxis
              angle={40}
              domain={[0, 100]}
              tickFormatter={(value) => {
                if (value === 0) return "Beginner";
                if (value === 25) return "Inter";
                if (value === 50) return "Junior";
                if (value === 75) return "Senior";
                return "";
              }}
              tick={{ fill: "#ccc", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Radar
              name={title}
              dataKey="value"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.4}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
