import express from 'express';
import transaction from '../controllers/credit';
import validCredit from '../middleware/creditValidator';
// import newAccountValidator from '../middleware/newAccountValidator';

const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', transaction.getTransactions);
transactionsRouter.post('/transactions/:accountNumber/credit', validCredit, transaction.credit);
export default transactionsRouter;
