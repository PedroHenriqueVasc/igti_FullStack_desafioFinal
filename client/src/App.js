import React, { useState, useEffect } from 'react';
import Navegation from './components/Navegation';
// import Sumary from './components/Sumary';
import Filter from './components/Filter';
// import Expense from './components/Expense';
import transactionService from './services/transactionService';

export default function App() {
  const [allYearMonths, setAllYearMonths] = useState([]);
  const [newYearMonth, setNewYearMonth] = useState('2019-01');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2019-01');

  useEffect(() => {
    const getTransactions = async () => {
      const res = await transactionService.getAll();
      let allYearMonths = await res.data;

      allYearMonths = allYearMonths.map(({ yearMonth }, index) => {
        return {
          id: index,
          yearMonth,
        };
      });

      setAllYearMonths(allYearMonths);
    };
    getTransactions();
  }, []);

  const handleChangeSelect = async (newDate) => {
    setNewYearMonth(newDate);
    const res = await transactionService.get(newDate);
    let selectedTransactions = await res.data;

    selectedTransactions = selectedTransactions.map(
      ({ _id, category, description, value, yearMonth }, index) => {
        return {
          id: _id,
          category,
          description: description.toLowerCase(),
          value,
          yearMonth,
        };
      }
    );

    setSelectedTransactions(selectedTransactions);
    setSelectedDate(newDate);
  };

  const handleFilterChange = (newText) => {
    console.log(newText);
  };

  return (
    <div className="container">
      <h2>Controle Financeiro Pessoal</h2>
      <Navegation
        allYearMonths={allYearMonths}
        onChangeSelect={handleChangeSelect}
        yearMonth={newYearMonth}
        selectedDate={selectedDate}
        selectedTransactions={selectedTransactions}
      />
      <Filter
        selectedTransactions={selectedTransactions}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
}
