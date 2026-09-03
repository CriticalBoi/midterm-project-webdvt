import { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import DonutChart from '../components/DonutChart.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { CATEGORY_PALETTE, EXPENSE_COLOR, INCOME_COLOR } from '../utils/chartColors.js';
import { formatCurrency } from '../utils/format.js';

function categoryBreakdown(transactions, type) {
  const totals = new Map();
  for (const t of transactions) {
    if (t.type !== type) continue;
    totals.set(t.category, (totals.get(t.category) || 0) + t.amount);
  }
  return Array.from(totals.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function ChartSection({ title, data, colors, centerLabel, centerValue, emptyText }) {
  return (
    <section className="chart-section">
      <h2 className="chart-heading">{title}</h2>
      {data.length === 0 ? (
        <p className="empty">{emptyText}</p>
      ) : (
        <div className="chart-block">
          <DonutChart data={data} colors={colors} centerLabel={centerLabel} centerValue={centerValue} />
          <ul className="chart-legend" role="list">
            {data.map((row, i) => (
              <li key={row.name}>
                <span className="legend-dot" style={{ background: colors[i % colors.length] }} />
                <span className="legend-name">{row.name}</span>
                <span className="legend-value">{formatCurrency(row.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function Summary({ transactions }) {
  const { theme } = useTheme();

  // All three breakdowns only need to be recalculated when the underlying
  // transaction list changes, not on every render this page happens to get.
  const { incomeVsExpense, incomeVsExpenseNet, expenseByCategory, incomeByCategory } = useMemo(() => {
    const incomeTotal = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenseTotal = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      incomeVsExpense: [
        { name: 'Income', value: incomeTotal },
        { name: 'Expense', value: expenseTotal },
      ].filter((row) => row.value > 0),
      incomeVsExpenseNet: incomeTotal - expenseTotal,
      expenseByCategory: categoryBreakdown(transactions, 'expense'),
      incomeByCategory: categoryBreakdown(transactions, 'income'),
    };
  }, [transactions]);

  const palette = CATEGORY_PALETTE[theme];
  const incomeExpenseColors = [INCOME_COLOR[theme], EXPENSE_COLOR[theme]];

  return (
    <div className="page page-wide">
      <header className="page-header">
        <h1>Summary</h1>
      </header>

      <ChartSection
        title="Income vs. expenses"
        data={incomeVsExpense}
        colors={incomeExpenseColors}
        centerLabel="Net"
        centerValue={incomeVsExpenseNet}
        emptyText="No transactions yet — add one to see this breakdown."
      />

      <Row className="g-4">
        <Col md={6}>
          <ChartSection
            title="Expenses by category"
            data={expenseByCategory}
            colors={palette}
            centerLabel="Spent"
            emptyText="No expenses logged yet."
          />
        </Col>
        <Col md={6}>
          <ChartSection
            title="Income by category"
            data={incomeByCategory}
            colors={palette}
            centerLabel="Earned"
            emptyText="No income logged yet."
          />
        </Col>
      </Row>
    </div>
  );
}