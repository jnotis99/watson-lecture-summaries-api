import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// initialize
const app = express();

// cors
app.use(cors());

// http request logging
app.use(morgan('dev'));

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// additional init stuff should go before routing

// ROUTING
// ---------------
app.get('/', (req, res) => {
  res.send('hi');
});

// LAUNCH SERVER
// --------------
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
