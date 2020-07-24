import React from 'react';
import transactionService from '../services/transactionService';

export default function Delete({ id }) {
  const removeOne = async () => {
    console.log(id);
    await transactionService.remove(id);

    console.log('Transação removida!');
  };
  return (
    <div>
      <button onClick={removeOne}>Remover</button>
    </div>
  );
}
