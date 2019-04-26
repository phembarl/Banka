import express from 'express';
import user from '../controllers/user';
import auth from '../helpers/auth';


const userAccountsRouter = express.Router();

userAccountsRouter.get('/:email/accounts', auth, user.userBankAccounts);

export default userAccountsRouter;
