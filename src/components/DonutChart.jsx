import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/format.js';

export default function DonutChart({ data, colors, centerLabel, centerValue }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (!total) return null;

  const active = activeIndex !== null ? data[activeIndex] : null;
  const displayLabel = active ? active.name : centerLabel;
  const displayValue = active ? active.value : centerValue !== undefined ? centerValue : total;

  return (
    <div className="donut-wrap">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={92}
            paddingAngle={data.length > 1 ? 2 : 0}
            stroke="none"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={colors[i % colors.length]}
                opacity={activeIndex === null || activeIndex === i ? 1 : 0.35}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center">
        <span className="donut-center-label">{displayLabel}</span>
        <span className="donut-center-value">{formatCurrency(displayValue)}</span>
      </div>
    </div>
  );
}