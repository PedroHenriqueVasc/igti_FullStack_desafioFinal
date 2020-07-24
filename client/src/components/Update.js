import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Update({ id }) {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [updateTransaction, setUpdateTransaction] = useState([]);

  const newData = {
    description: '',
    value: 0,
    category: '',
    year: 0,
    month: 0,
    day: 0,
    yearMonth: '',
    yearMonthDay: '',
    type: '',
  };

  useEffect(() => {
    setUpdateTransaction(newData);
    // return () => {
    //   return clearInterval();
    // };
  }, []);

  const newUpdate = async (data) => {
    console.log(id);
    const res = await transactionService.update(id, data);
    const updatedTransaction = await res.data;

    console.log(updatedTransaction);
  };

  const customStyles = {
    content: {
      width: '500px',
      height: '500px',
      padding: '10px',
    },
  };

  const handleSubmit = (event) => {
    console.log(updateTransaction);

    newUpdate(updateTransaction);

    event.preventDefault();
  };

  const handleRadioDespesa = (event) => {
    const type = event.target.value;
    updateTransaction.type = type;
  };

  const handleRadioReceita = (event) => {
    const type = event.target.value;
    updateTransaction.type = type;
  };

  const handleDescription = (event) => {
    const text = event.target.value;
    updateTransaction.description = text;
  };

  const handleCategory = (event) => {
    const category = event.target.value;
    updateTransaction.category = category;
  };

  const handleValue = (event) => {
    const price = event.target.value;
    updateTransaction.value = Number(price);
  };

  const handleDate = (event) => {
    const newDate = event.target.value;
    let yearMonth = '';
    let year = '';
    let month = '';
    let day = '';

    for (let i = 0; i < newDate.length; i++) {
      if (i < 7) {
        yearMonth = yearMonth + newDate[i];
      }
      if (i < 4) {
        year = year + newDate[i];
      } else if (i > 4 && i < 7) {
        month = month + newDate[i];
      } else if (i > 7) {
        day = day + newDate[i];
      }
    }
    console.log(yearMonth);

    updateTransaction.year = Number(year);
    updateTransaction.month = Number(month);
    updateTransaction.day = Number(day);
    updateTransaction.yearMonth = yearMonth;
    updateTransaction.yearMonthDay = newDate;
  };

  return (
    <div>
      <button onClick={() => setModelIsOpen(true)}>Editar</button>
      <Modal
        style={customStyles}
        isOpen={modelIsOpen}
        onRequestClose={() => setModelIsOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              <input
                name="type"
                type="radio"
                value="receita"
                onChange={handleRadioReceita}
              />
              <span>Receita</span>
            </label>
          </p>
          <p>
            <label>
              <input
                name="type"
                type="radio"
                value="despesa"
                onChange={handleRadioDespesa}
              />
              <span>Despesa</span>
            </label>
          </p>

          <p>
            <label>
              Descrição
              <input
                type="text"
                name="description"
                id="description"
                onChange={handleDescription}
              />
            </label>
          </p>

          <p>
            <label>
              Categoria
              <input
                type="text"
                name="category"
                id="category"
                onChange={handleCategory}
              />
            </label>
          </p>

          <p>
            <label>
              Valor
              <input
                type="number"
                name="value"
                id="value"
                step="0.1"
                onChange={handleValue}
              />
            </label>
            <input type="date" name="data" id="data" onChange={handleDate} />
          </p>

          <p>
            <input type="submit" value="Enviar" />
          </p>
        </form>
        <button onClick={() => setModelIsOpen(false)}>Close</button>
        <button>Ok</button>
      </Modal>
    </div>
  );
}
