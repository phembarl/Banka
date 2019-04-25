import express from 'express';
import user from '../controllers/user';
import signUpValidator from '../middleware/validators/signUpValidator';
import signInValidator from '../middleware/validators/signInValidator';
import userMidware from '../middleware/userMidware';
import auth from '../helpers/auth';

const userRouter = express.Router();

userRouter.get('/users', user.getUsers);
userRouter.get('/user/:email/accounts', auth, user.userBankAccounts);
userRouter.post('/auth/signup', signUpValidator, userMidware.isClientOrStaff, user.signUp);
userRouter.post('/auth/signin', signInValidator, user.signIn);

export default userRouter;
