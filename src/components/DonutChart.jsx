import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/format.js';

// centerValue is optional: when omitted, the center label shows the sum of
// all slice values (the natural "total" reading for a category breakdown).
// Pass an explicit centerValue when the two aren't the same thing — e.g.
// income minus expense isn't the sum of the two slices.
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
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              background: 'var(--bs-tertiary-bg)',
              border: '1px solid var(--bs-border-color)',
              borderRadius: 4,
              fontSize: 13,
              boxShadow: 'none',
            }}
            itemStyle={{ color: 'var(--bs-body-color)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center">
        <span className="donut-center-label">{centerLabel}</span>
        <span className="donut-center-value">{formatCurrency(displayValue)}</span>
      </div>
    </div>
  );
}