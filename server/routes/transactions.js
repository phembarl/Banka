import express from 'express';
import transaction from '../controllers/transactions';
import validTransaction from '../middleware/validators/transactionValidator';
import accountsMidware from '../middleware/accountsMidware';

const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', transaction.getTransactions);
transactionsRouter.post('/transactions/:accountNumber/:transactionType', validTransaction, accountsMidware.canFindAccount,
  accountsMidware.isTransaction, transaction.transact);
export default transactionsRouter;
