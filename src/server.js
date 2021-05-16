'use strict';

// 3rd Party Resources
const express = require('express');

const mongoose = require('mongoose');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));



// server routes 
const serverRouter = require('./auth/router.js');

app.use(serverRouter);

function start(PORT, MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(PORT, () => console.log(`server up on${PORT}`));
    })
    .catch(e => console.error('Could not start server', e.message));
}


module.exports = {
  start: start,
  app: app,
};