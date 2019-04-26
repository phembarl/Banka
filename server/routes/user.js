import express from 'express';
import user from '../controllers/user';
import signUpValidator from '../middleware/validators/signUpValidator';
import signInValidator from '../middleware/validators/signInValidator';
import userMidware from '../middleware/userMidware';

const userRouter = express.Router();

userRouter.post('/signup', signUpValidator, userMidware.checkUserType, user.signUp);
userRouter.post('/signin', signInValidator, user.signIn);

export default userRouter;
