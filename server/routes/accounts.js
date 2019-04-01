import express from 'express';
import accounts from '../controllers/accounts';
import newAccountValidator from '../middleware/newAccountValidator';

const accountsRouter = express.Router();

accountsRouter.post('/accounts', newAccountValidator, accounts.createAccount);
accountsRouter.patch('/accounts/:accountNumber', accounts.updateAccount);

export default accountsRouter;
