//const mongoose = require('mongoose');
//const ObjectId = mongoose.Types.ObjectId;

import http from '../http-common';
// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
//const TransactionModel = require('../../../models/TransactionModel');

//console.log(axios.baseURL);
const getAll = () => {
  return http.get('/api/transaction');
};

const get = (yearMonth) => {
  return http.get(`/api/transaction/${yearMonth}`);
};

const create = (data) => {
  return http.post('/api/transaction', data);
};

const update = (params, data) => {
  return http.put(`/api/transaction/${params}`, data);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};
//const transactionService = { getAll };

export default { getAll, get, create, update, remove };
//module.exports = axios;
