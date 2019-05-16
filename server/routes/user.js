import express from 'express';
import user from '../controllers/user';
import signUpValidator from '../middleware/validators/signUpValidator';
import signInValidator from '../middleware/validators/signInValidator';
import userMidware from '../middleware/userMidware';
import auth from '../helpers/auth';
import paramsValidator from '../helpers/paramsValidator';

const userRouter = express.Router();

userRouter.post('/signup', signUpValidator, userMidware.checkUserType, user.signUp);
userRouter.post('/signin', signInValidator, user.signIn);
userRouter.patch('/:email/isadmin', auth, paramsValidator.checkEmail, user.createAdmin);

export default userRouter;
