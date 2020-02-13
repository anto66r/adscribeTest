import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use('/api', BaseRouter);


const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Mongoose connection
const uri: string = process.env.MONGO_URI || '';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  dbName: 'platf0rm-2',
});

mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
mongoose.set('useFindAndModify', false);

// Export express instance
export default app;
