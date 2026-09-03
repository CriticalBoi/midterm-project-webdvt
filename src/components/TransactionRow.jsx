import { memo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../utils/format.js';

/**
 * Performance note (the "identify + fix an unnecessary re-render" requirement):
 *
 * Dashboard re-renders whenever its local filter state changes (typing in
 * the category/type <Form.Select>s) or whenever the shared `transactions`
 * array reference changes for an unrelated reason. Without memoization,
 * every <TransactionRow> in the list would re-render on each of those
 * parent re-renders even though its own `transaction` prop hasn't changed —
 * wasted work that grows linearly with the number of transactions.
 *
 * Wrapping this component in React.memo makes React skip re-rendering a
 * row unless the specific `transaction` object passed to it is a new
 * reference. Since useTransactions only creates new object references for
 * entries that actually changed (add/update/delete use immutable array
 * ops), untouched rows are skipped.
 */
function TransactionRow({ transaction }) {
  const { id, type, amount, category, description, date } = transaction;

  return (
    <ListGroup.Item as={Link} to={`/transaction/${id}`} className="ledger-row" action>
      <div className="ledger-main">
        <span className="ledger-desc">{description?.trim() || category}</span>
        <span className="ledger-meta">
          {category} · {formatDate(date)}
        </span>
      </div>
      <span className={`ledger-amount ${type}`}>
        {type === 'income' ? '+' : '\u2212'}
        {formatCurrency(amount)}
      </span>
    </ListGroup.Item>
  );
}

export default memo(TransactionRow);
