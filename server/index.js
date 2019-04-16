import express from 'express';
import userRouter from './routes/user';
import accountsRouter from './routes/accounts';
import transactionsRouter from './routes/transactions';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', userRouter);
app.use('/api/v1/', accountsRouter);
app.use('/api/v1/', transactionsRouter);
app.get('/', (req, res) => {
  res.send('Welcome to Banka! Andela Cycle 43 ADC');
});

app.listen(port, () => {
  console.log('Your app is being served on port', port);
});

export default app;
