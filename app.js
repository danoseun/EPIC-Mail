import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { defaultRouter, userRouter, messageRouter } from './server/routes';

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', userRouter);
app.use('/api/v1', messageRouter);
app.use('/', defaultRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;
