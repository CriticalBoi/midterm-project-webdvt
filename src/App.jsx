import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import TransactionDetail from './pages/TransactionDetail.jsx';
import Summary from './pages/Summary.jsx';
import NotFound from './pages/NotFound.jsx';
import { useTransactions } from './hooks/useTransactions.js';

export default function App() {
  // Single source of truth for transaction data, read/written through the
  // custom hook. Passed down as props to the routed pages so they all
  // share the same list without each one reimplementing storage access.
  const wallet = useTransactions();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard transactions={wallet.transactions} />} />
        <Route path="/add" element={<AddTransaction addTransaction={wallet.addTransaction} />} />
        <Route
          path="/transaction/:id"
          element={
            <TransactionDetail
              getTransaction={wallet.getTransaction}
              updateTransaction={wallet.updateTransaction}
              deleteTransaction={wallet.deleteTransaction}
            />
          }
        />
        <Route path="/summary" element={<Summary transactions={wallet.transactions} />} />
        {/* Catch-all: any unmatched path (typo, stale bookmark) renders
            this instead of an empty content area. Must stay last. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}