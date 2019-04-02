import express from 'express';
import accounts from '../controllers/accounts';
import newAccountValidator from '../middleware/newAccountValidator';

const accountsRouter = express.Router();

accountsRouter.get('/accounts', accounts.getAccounts);
accountsRouter.post('/accounts', newAccountValidator, accounts.createAccount);
accountsRouter.patch('/accounts/:accountNumber', accounts.updateAccount);
accountsRouter.delete('/accounts/:accountNumber', accounts.deleteAccount);

export default accountsRouter;
