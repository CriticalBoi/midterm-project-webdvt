import { useMemo, useState } from 'react';
import { Button, Form, ListGroup, Stack } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TransactionRow from '../components/TransactionRow.jsx';
import { formatCurrency } from '../utils/format.js';

export default function Dashboard({ transactions }) {
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = useMemo(() => {
    // Only offer categories that actually belong to the selected type —
    // picking "Income" shouldn't leave expense-only categories in the list.
    const relevant =
      typeFilter === 'all' ? transactions : transactions.filter((t) => t.type === typeFilter);
    return Array.from(new Set(relevant.map((t) => t.category))).sort();
  }, [transactions, typeFilter]);

  function handleTypeChange(e) {
    setTypeFilter(e.target.value);
    // The previously selected category may not exist for the new type
    // (or may no longer be needed), so reset it rather than leaving a
    // stale selection that silently filters everything out.
    setCategoryFilter('all');
  }

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      return true;
    });
  }, [transactions, typeFilter, categoryFilter]);

  const balance = useMemo(() => {
    return transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);
  }, [transactions]);

  return (
    <div className="page">
      <Stack direction="horizontal" className="page-header" gap={3}>
        <div>
          <p className="eyebrow">Current balance</p>
          <h1 className={`balance ${balance >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(balance)}
          </h1>
        </div>
        <Button as={Link} to="/add" variant="dark" className="btn-primary ms-auto">
          <FiPlus /> Add transaction
        </Button>
      </Stack>

      <Stack direction="horizontal" gap={3} className="filters" role="group" aria-label="Filter transactions">
        <Form.Group className="field-inline">
          <Form.Label>Type</Form.Label>
          <Form.Select value={typeFilter} onChange={handleTypeChange}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="field-inline">
          <Form.Label>Category</Form.Label>
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Stack>

      {transactions.length === 0 ? (
        <p className="empty">
          No transactions yet. <Link to="/add">Add your first one</Link>.
        </p>
      ) : filtered.length === 0 ? (
        <p className="empty">No transactions match these filters.</p>
      ) : (
        <ListGroup variant="flush" className="ledger">
          {filtered.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </ListGroup>
      )}
    </div>
  );
}