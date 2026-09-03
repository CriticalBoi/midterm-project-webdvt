import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ledger-transactions';

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    console.error('Could not read transactions from storage, starting empty.');
    return [];
  }
}

function writeToStorage(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    console.error('Could not persist transactions to storage.');
  }
}

/**
 * useTransactions
 * ----------------
 * A single reusable hook that owns reading and writing transaction data to
 * localStorage. Any component that needs the transaction list, or needs to
 * add/update/delete an entry, calls this hook instead of touching
 * localStorage directly — that's what keeps the persistence logic in one
 * place rather than copy-pasted into Dashboard, AddTransaction, and
 * TransactionDetail separately.
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState(readFromStorage);

  // Keep storage in sync whenever the in-memory list changes.
  useEffect(() => {
    writeToStorage(transactions);
  }, [transactions]);

  // Keep other tabs/windows in sync with each other.
  useEffect(() => {
    function handleStorageEvent(event) {
      if (event.key === STORAGE_KEY) {
        setTransactions(readFromStorage());
      }
    }
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  const addTransaction = useCallback((entry) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    const newTransaction = { id, createdAt: new Date().toISOString(), ...entry };
    setTransactions((prev) => [newTransaction, ...prev]);
    return id;
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTransaction = useCallback(
    (id) => transactions.find((t) => t.id === id),
    [transactions]
  );

  return { transactions, addTransaction, updateTransaction, deleteTransaction, getTransaction };
}
