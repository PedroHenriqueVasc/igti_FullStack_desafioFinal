//import { TransactionModel } from '../models/TransactionModel.js';
const TransactionModel = require('../models/TransactionModel.js');
//const Transactions = TransactionModel;

const create = async (req, res) => {
  try {
    const transaction = new TransactionModel({
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      yearMonth: req.body.yearMonth,
      yearMonthDay: req.body.yearMonthDay,
      type: req.body.type,
    });

    const data = await transaction.save(transaction);
    res.send(data);
  } catch (err) {
    res.status(500).send('Erro ao adicionar uma nova transação');
  }
};

const findAll = async (_, res) => {
  try {
    const transaction = await TransactionModel.find({});

    res.send(transaction);
  } catch (err) {
    res.status(500).send('Erro: Não foi encontrado nenhuma transação');
  }
};

const findByPeriod = async (req, res) => {
  try {
    const period = req.params.period;
    const data = await TransactionModel.find({ yearMonth: period });

    res.send(data);
  } catch (err) {
    res.status(500).send('Erro: Não foi encontrada a transação especificada!');
  }
};

const updateOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send('Erro: Não foi possível atualizar a transição especificada!');
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    await TransactionModel.findByIdAndRemove({ _id: id });

    res.send('Transação removida com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao remover a transação especificada!');
  }
};

//export default { create };
const controller = { create, findAll, findByPeriod, updateOne, remove };

module.exports = controller;
