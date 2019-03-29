import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/user';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/', router);

app.listen(port, () => {
  console.log('Your app is being served on port', port);
});

export default app;
