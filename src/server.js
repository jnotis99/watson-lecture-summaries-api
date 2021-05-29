import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import routes from './routers/index';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/watsonLectures';

mongoose.connect(mongoURI).then(() => {
  console.log('connected to database:', mongoURI);
}).catch((err) => {
  console.log('error: could not connect to db:', err);
});

// initialize
const app = express();

// cors
app.use(cors());

// http request logging
app.use(morgan('dev'));

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTING
// ---------------
app.get('/', (_req, res) => {
  res.send('hi');
});

app.get('/api', (_req, res) => {
  res.send('Watson Lecture API');
});

app.use('/api/lectures', routes.lectureRouter);

// LAUNCH SERVER
// ----------------
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
