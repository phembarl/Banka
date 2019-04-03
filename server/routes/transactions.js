import express from 'express';
import transaction from '../controllers/transactions';
import validTransaction from '../middleware/transactionValidator';
import accountsMidware from '../middleware/accountsMidware';

const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', transaction.getTransactions);
transactionsRouter.post('/transactions/:accountNumber/credit', validTransaction, accountsMidware.canFind, transaction.credit);
transactionsRouter.post('/transactions/:accountNumber/debit', validTransaction, accountsMidware.canFind, transaction.debit);

export default transactionsRouter;
