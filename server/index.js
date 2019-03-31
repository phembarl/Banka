import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user';
import accountsRouter from './routes/accounts';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', userRouter);
app.use('/api/v1/', accountsRouter);

app.listen(port, () => {
  console.log('Your app is being served on port', port);
});

export default app;
