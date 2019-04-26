import express from 'express';
import accounts from '../controllers/accounts';
import transaction from '../controllers/transactions';
import newAccountValidator from '../middleware/validators/newAccountValidator';
import accountsMidware from '../middleware/accountsMidware';
import auth from '../helpers/auth';

const accountsRouter = express.Router();

accountsRouter.get('/', auth, accountsMidware.checkStatus, accounts.getAccounts);
accountsRouter.get('/:accountNumber/transactions', auth, transaction.transactionHistory);
accountsRouter.get('/:accountNumber', auth, accounts.accountDetails);
accountsRouter.post('', auth, newAccountValidator, accountsMidware.checkAccountType, accounts.createAccount);
accountsRouter.patch('/:accountNumber', auth, accountsMidware.checkUpdateStatus, accounts.updateAccount);
accountsRouter.delete('/:accountNumber', auth, accounts.deleteAccount);

export default accountsRouter;
