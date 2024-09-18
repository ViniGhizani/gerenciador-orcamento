import React, { useState, useEffect } from 'react';
import './Dashboard.css';

interface Entry {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
}

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const storedEntries = localStorage.getItem('entries');
    return storedEntries ? JSON.parse(storedEntries) : [];
  });
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (description.trim() === '' || amount <= 0) {
      alert('Por favor, preencha a descrição e insira um valor maior que zero.');
      return;
    }
    const newEntry: Entry = {
      id: Date.now(),
      type,
      description,
      amount,
    };
    setEntries([...entries, newEntry]);
    setDescription('');
    setAmount(0);
    setType('income');
    setEditingEntry(null);
  };

  const updateEntry = () => {
    if (editingEntry) {
      const updatedEntries = entries.map((entry) =>
        entry.id === editingEntry.id
          ? { ...entry, description, amount, type }
          : entry
      );
      setEntries(updatedEntries);
      setEditingEntry(null);
      setDescription('');
      setAmount(0);
      setType('income');
    }
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const editEntry = (entry: Entry) => {
    setEditingEntry(entry);
    setDescription(entry.description);
    setAmount(entry.amount);
    setType(entry.type);
  };

  const cancelEdit = () => {
    setEditingEntry(null);
    setDescription('');
    setAmount(0);
    setType('income');
  };

  const totalIncome = entries
    .filter((entry) => entry.type === 'income')
    .reduce((acc, entry) => acc + entry.amount, 0);

  const totalExpense = entries
    .filter((entry) => entry.type === 'expense')
    .reduce((acc, entry) => acc + entry.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="summary">
        <p>Renda Total: R$ {totalIncome.toFixed(2)}</p>
        <p>Despesas Totais: R$ {totalExpense.toFixed(2)}</p>
        <p>Saldo: R$ {balance.toFixed(2)}</p>
      </div>
      <div className="entry-form">
        <h3>{editingEntry ? 'Editar Entrada' : 'Adicionar Entrada'}</h3>
        <label>
          Descrição:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Tipo:
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          >
            <option value="income">Renda</option>
            <option value="expense">Despesa</option>
          </select>
        </label>
        <button onClick={editingEntry ? updateEntry : addEntry}>
          {editingEntry ? 'Atualizar' : 'Adicionar'}
        </button>
        {editingEntry && (
          <button className="cancel" onClick={cancelEdit}>Cancelar</button>
        )}
      </div>
      <div className="entries">
        <h3>Entradas</h3>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              {entry.description} - R$ {entry.amount.toFixed(2)} ({entry.type === 'income' ? 'Renda' : 'Despesa'})
              <button onClick={() => editEntry(entry)}>Editar</button>
              <button onClick={() => deleteEntry(entry.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
