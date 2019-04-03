import express from 'express';
import transaction from '../controllers/transactions';
import validTransaction from '../middleware/transactionValidator';

const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', transaction.getTransactions);
transactionsRouter.post('/transactions/:accountNumber/credit', validTransaction, transaction.credit);
transactionsRouter.post('/transactions/:accountNumber/debit', validTransaction, transaction.debit);

export default transactionsRouter;
