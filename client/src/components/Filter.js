import React, { useState, useEffect } from 'react';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import css from './filter.module.css';

export default function Filter({ selectedTransactions }) {
  const [newTransactions, setNewTransactions] = useState([]);

  useEffect(() => {
    setNewTransactions(selectedTransactions);
  }, [selectedTransactions]);

  const onFilterChange = (event) => {
    const newText = event.target.value;

    const filteredTransactions = selectedTransactions.filter((transaction) => {
      return transaction.description.includes(newText.toLowerCase());
    });

    setNewTransactions(filteredTransactions);
  };

  const receitas = newTransactions.reduce((accumulator, currentItem) => {
    let temp = 0;
    //console.log('accumulator: ' + accumulator);
    if (currentItem.description === 'Salário') {
      temp = temp + currentItem.value;
    }
    return accumulator + temp;
  }, 0);

  const despesas = newTransactions.reduce((accumulator, currentItem) => {
    let temp = 0;
    if (currentItem.description !== 'Salário') {
      temp = temp + currentItem.value;
    }
    return accumulator + temp;
  }, 0);

  const saldo = receitas - despesas;

  // top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  return (
    <div>
      <Add />
      <p>
        <input onChange={onFilterChange} type="text" />
      </p>

      <div className={css.flexRow}>
        <p>
          Lançamentos: {newTransactions.length} Receitas: {receitas}
          Despesas: {despesas} Saldo: {saldo}
        </p>
      </div>

      <h4>Lançamentos</h4>
      <div id="list">
        {newTransactions.map(({ id, category, description, value }) => {
          return (
            <div key={id} className={css.transactions}>
              <p>
                Categoria: {category} value: {value}
              </p>
              <p>Descrição: {description}</p>
              <Update id={id} />
              <Delete id={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
