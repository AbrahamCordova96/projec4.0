import { useState, useEffect } from 'react';
import TransactionForm from '../components/accounting/TransactionForm';
import TransactionList from '../components/accounting/TransactionList';
import TransactionFilters from '../components/accounting/TransactionFilters';

function Accounting() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: transaction.date || new Date().toISOString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    ));
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (transaction) => {
    if (window.confirm('¿Está seguro de eliminar esta transacción?')) {
      setTransactions(transactions.filter(t => t.id !== transaction.id));
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...transactions];

    if (filters.dateFrom) {
      filtered = filtered.filter(t => t.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(t => t.date <= filters.dateTo);
    }
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(term) ||
        t.notes?.toLowerCase().includes(term)
      );
    }

    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <div className="space-y-6">
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Libro de Cuentas</h2>
      </header>

      <TransactionFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>
        <div>
          <TransactionForm
            onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
            initialData={editingTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default Accounting;