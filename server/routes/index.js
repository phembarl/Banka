import { Router } from 'express';
import userRouter from './user';
import usersRouter from './users';
import userAccountsRouter from './userAccounts';
import accountsRouter from './accounts';
import transactionsRouter from './transactions';
import imageUploadRouter from './imageUpload';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/accounts', accountsRouter);
router.use('/auth', userRouter);
router.use('/users', usersRouter);
router.use('/user', userAccountsRouter);
router.use('/user', imageUploadRouter);

export default router;
