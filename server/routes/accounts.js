import express from 'express';
import accounts from '../controllers/accounts';
import newAccountValidator from '../middleware/validators/newAccountValidator';
import accountsMidware from '../middleware/accountsMidware';
import auth from '../helpers/auth';

const accountsRouter = express.Router();

accountsRouter.get('/accounts', auth, accounts.getAccounts);
accountsRouter.post('/accounts', auth, newAccountValidator, accountsMidware.isValidType, accounts.createAccount);
accountsRouter.patch('/accounts/:accountNumber', auth, accountsMidware.canUpdate, accounts.updateAccount);
accountsRouter.delete('/accounts/:accountNumber', auth, accounts.deleteAccount);

export default accountsRouter;
