import express from 'express';
import cors from 'cors';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import router from './routes/index';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/api/v1/', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to Banka! Andela Cycle 43 ADC');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'that route does not exist',
  });
});

app.listen(port, () => {
  console.log('Your app is being served on port', port);
});

export default app;
