import express from 'express';
const app = express();
const port = 3000;
import possession from './routes/possession.js';
import patrimoine from './routes/patrimoine.js';

app.get('/', (req, res) => {
  res.send('BIENVENU SUR CETTE APPLICATION');
});

app.use('/possession', possession);
app.use('/patrimoine', patrimoine);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});