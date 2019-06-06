import express from 'express';
import multerParser from '../helpers/uploadImage';
import user from '../controllers/user';
import auth from '../helpers/auth';
import paramsValidator from '../helpers/paramsValidator';

const parser = multerParser.single('avatarUrl');
const imageUploadRouter = express.Router();

imageUploadRouter.patch('/:email/avatar', auth, paramsValidator.checkEmail, parser, user.uploadImage);

export default imageUploadRouter;
