import express from 'express';
import user from '../controllers/user';
import signUpValidator from '../middleware/signUpValidator';
import signInValidator from '../middleware/signInValidator';

const router = express.Router();

router.get('/users', user.getUsers);
router.post('/auth/signup', signUpValidator, user.signUp);
router.post('/auth/signin', signInValidator, user.signIn);

export default router;
