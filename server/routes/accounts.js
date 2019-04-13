import express from 'express';
import accounts from '../controllers/accounts';
import newAccountValidator from '../middleware/validators/newAccountValidator';
import accountsMidware from '../middleware/accountsMidware';

const accountsRouter = express.Router();

accountsRouter.get('/accounts', accounts.getAccounts);
accountsRouter.post('/accounts', newAccountValidator, accountsMidware.isValidType, accounts.createAccount);
accountsRouter.patch('/accounts/:accountNumber', accountsMidware.canUpdate, accounts.updateAccount);
accountsRouter.delete('/accounts/:accountNumber', accountsMidware.canFind, accounts.deleteAccount);

export default accountsRouter;
