import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm.jsx';

export default function AddTransaction({ addTransaction }) {
  const navigate = useNavigate();

  function handleSubmit(data) {
    addTransaction({ ...data, amount: Number(data.amount) });
    navigate('/');
  }

  return (
    <div className="page page-narrow">
      <header className="page-header">
        <h1>Add transaction</h1>
        <Link to="/" className="back-link">
          <FiArrowLeft /> Dashboard
        </Link>
      </header>
      <TransactionForm onSubmit={handleSubmit} submitLabel="Save transaction" />
    </div>
  );
}