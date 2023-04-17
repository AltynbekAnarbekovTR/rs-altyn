import express from 'express';

const app = express();

app.use('*', (req, res) => {
  res.send('server side');
});

app.listen(3005, () => {
  console.log('App is launched');
});
