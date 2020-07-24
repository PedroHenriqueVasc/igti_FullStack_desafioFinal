// import express from 'express';
// import controller from '../controller/transactionController.js';
const express = require('express');
const controller = require('../controller/transactionController.js');

const transactionRouter = express();

transactionRouter.post('', controller.create);
transactionRouter.get('', controller.findAll);
transactionRouter.get('/:period', controller.findByPeriod);
transactionRouter.put('/:id', controller.updateOne);
transactionRouter.delete('/:id', controller.remove);
// app.delete('/transaction/', controller.removeAll);

// export { app as routes };
module.exports = transactionRouter;
