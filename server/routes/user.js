import express from 'express';
import user from '../controllers/user';
import signUpValidator from '../middleware/signUpValidator';
import signInValidator from '../middleware/signInValidator';

const userRouter = express.Router();

userRouter.get('/users', user.getUsers);
userRouter.post('/auth/signup', signUpValidator, user.signUp);
userRouter.post('/auth/signin', signInValidator, user.signIn);

export default userRouter;
