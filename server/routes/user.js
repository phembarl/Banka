import express from 'express';
import user from '../controllers/user';
import signUpValidator from '../middleware/signUpValidator';
import signInValidator from '../middleware/signInValidator';
import userMidware from '../middleware/userMidware';

const userRouter = express.Router();

userRouter.get('/users', user.getUsers);
userRouter.post('/auth/signup', signUpValidator, userMidware.isNewEmail, user.signUp);
userRouter.post('/auth/signin', signInValidator, userMidware.isValidSignIn, user.signIn);

export default userRouter;
