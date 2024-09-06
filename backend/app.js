import express from 'express';
const app = express();
const port = 3000;
import possession from './routes/possession.js';
import patrimoine from './routes/patrimoine.js';
import cors from 'cors';

app.use(cors());
app.use(express.json());

app.use('/possession', possession);
app.use('/patrimoine', patrimoine);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});