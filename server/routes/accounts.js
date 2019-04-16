import express from 'express';
import accounts from '../controllers/accounts';
import newAccountValidator from '../middleware/validators/newAccountValidator';
import accountsMidware from '../middleware/accountsMidware';
import validateUser from '../middleware/validUser';

const accountsRouter = express.Router();

accountsRouter.get('/accounts', accounts.getAccounts);
accountsRouter.post('/accounts', newAccountValidator, accountsMidware.isValidType, validateUser.canFindUser, accounts.createAccount);
accountsRouter.patch('/accounts/:accountNumber', accountsMidware.canUpdate, accounts.updateAccount);
accountsRouter.delete('/accounts/:accountNumber', accountsMidware.canFindAccount, accounts.deleteAccount);

export default accountsRouter;
