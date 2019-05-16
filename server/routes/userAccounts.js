import express from 'express';
import user from '../controllers/user';
import auth from '../helpers/auth';
import paramsValidator from '../helpers/paramsValidator';


const userAccountsRouter = express.Router();

userAccountsRouter.get('/:email/accounts', auth, paramsValidator.checkEmail, user.userBankAccounts);

export default userAccountsRouter;
