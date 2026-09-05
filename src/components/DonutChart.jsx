import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/format.js';


export default function DonutChart({ data, colors, centerLabel, centerValue }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (!total) return null;

  const displayValue = centerValue !== undefined ? centerValue : total;

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
          >
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center">
        <span className="donut-center-label">{centerLabel}</span>
        <span className="donut-center-value">{formatCurrency(displayValue)}</span>
      </div>
    </div>
  );
}