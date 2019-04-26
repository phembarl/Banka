import express from 'express';
import router from './routes/index';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.send('Welcome to Banka! Andela Cycle 43 ADC');
});

app.all('*', (req, res) => {
  res.send('looks like you hit a non-existent route');
});

app.listen(port, () => {
  console.log('Your app is being served on port', port);
});

export default app;
