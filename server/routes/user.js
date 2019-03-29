import express from 'express';
import user from '../controllers/user';
import validator from '../middleware/validator';

const router = express.Router();

router.post('/auth/signup', validator, user.createUser);

export default router;
