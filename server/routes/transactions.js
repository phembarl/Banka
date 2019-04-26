import express from 'express';
import transaction from '../controllers/transactions';
import validTransaction from '../middleware/validators/transactionValidator';
import accountsMidware from '../middleware/accountsMidware';
import auth from '../helpers/auth';

const transactionsRouter = express.Router();

transactionsRouter.get('/', auth, transaction.getTransactions);
transactionsRouter.get('/:transactionId', auth, transaction.getSpecificTransaction);
transactionsRouter.post('/:accountNumber/:transactionType', auth, validTransaction,
  accountsMidware.checkTransaction, accountsMidware.validateAmount, transaction.transact);
export default transactionsRouter;
