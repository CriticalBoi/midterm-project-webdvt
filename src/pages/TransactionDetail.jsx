import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm.jsx';
import { formatCurrency, formatDate } from '../utils/format.js';

export default function TransactionDetail({ getTransaction, updateTransaction, deleteTransaction }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const transaction = getTransaction(id);

  if (!transaction) {
    return (
      <div className="page page-narrow">
        <p className="empty">
          This transaction doesn't exist (maybe it was already deleted).{' '}
          <Link to="/">Back to dashboard</Link>.
        </p>
      </div>
    );
  }

  function handleUpdate(data) {
    updateTransaction(id, { ...data, amount: Number(data.amount) });
    setIsEditing(false);
  }

  function handleDelete() {
    deleteTransaction(id);
    navigate('/');
  }

  return (
    <div className="page page-narrow">
      <header className="page-header">
        <h1>{isEditing ? 'Edit transaction' : 'Transaction'}</h1>
        <Link to="/" className="back-link">
          <FiArrowLeft /> Dashboard
        </Link>
      </header>

      {isEditing ? (
        <TransactionForm
          defaultValues={{
            type: transaction.type,
            amount: transaction.amount,
            category: transaction.category,
            description: transaction.description ?? '',
            date: transaction.date,
          }}
          onSubmit={handleUpdate}
          submitLabel="Save changes"
        />
      ) : (
        <Card className="detail-card">
          <Card.Body>
            <p className="eyebrow">{transaction.type === 'income' ? 'Income' : 'Expense'}</p>
            <h2 className={`detail-amount ${transaction.type}`}>
              {transaction.type === 'income' ? '+' : '\u2212'}
              {formatCurrency(transaction.amount)}
            </h2>

            <dl className="detail-list">
              <div>
                <dt>Category</dt>
                <dd>{transaction.category}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{formatDate(transaction.date)}</dd>
              </div>
              <div>
                <dt>Description</dt>
                <dd>{transaction.description?.trim() || '—'}</dd>
              </div>
            </dl>

            <div className="detail-actions">
              <Button variant="outline-secondary" onClick={() => setIsEditing(true)}>
                <FiEdit2 /> Edit
              </Button>
              <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
                <FiTrash2 /> Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body>
          <p className="mb-0">Delete this transaction? This can't be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
