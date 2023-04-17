// require('./server');
// import './server';

// const express = require('express');
// const dotenv = require('dotenv');

import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Express + TypeScript Server');
// });
app.use('*', (req, res) => {
  fs.readFile(path.resolve('build/index.html'), 'utf-8', (err, data) => {
    console.log(err, data);
    res.send('fo');
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
