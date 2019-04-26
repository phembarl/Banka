import express from 'express';
import user from '../controllers/user';
import auth from '../helpers/auth';

const usersRouter = express.Router();

usersRouter.get('/', auth, user.getUsers);

export default usersRouter;
