import express from 'express';
import transaction from '../controllers/transactions';
import validTransaction from '../middleware/validators/transactionValidator';
import accountsMidware from '../middleware/accountsMidware';
import auth from '../helpers/auth';

const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', auth, transaction.getTransactions);
transactionsRouter.get('/accounts/:accountNumber/transactions', auth, transaction.transactionHistory);
transactionsRouter.get('/transactions/:transactionId', auth, transaction.getSpecificTransaction);
transactionsRouter.post('/transactions/:accountNumber/:transactionType', auth, validTransaction,
  accountsMidware.isTransaction, transaction.transact);
export default transactionsRouter;
