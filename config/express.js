// const express = require('express'),
//   cors = require('cors'),
//   app = express(),
//   config = require('./index'),
//   controller = require('../controller/contact.js'),
//   {
//     validateContact
//   } = require('../middleware/body.validator.js'),
//   {
//     success,
//     info,
//     error
//   } = require("consola"),
//   route = express.Router();

// global.logger = {
//   success,
//   info,
//   error
// }


// app.set('port', config.port);

// app.use(
//   express.json({
//     limit: "50mb",
//   })
// );

// app.use(
//   express.urlencoded({
//     limit: "50mb",
//     extended: true,
//   })
// );

// route.post('/send-message', validateContact, controller.sendMessage);

// app.use(cors());
// app.use('/api/v1', route);

// module.exports = app;


import express from 'express';
import cors from 'cors';
// import config from './index.js';
import controller from '../controller/contact.js';
import { validateContact } from '../middleware/body.validator.js';
import { success, info, error } from 'consola';

const app = express();
const route = express.Router();

global.logger = {
  success,
  info,
  error
};

app.set('port', process.env.PORT || 3000);

app.use(express.json({
  limit: "50mb",
}));

app.use(express.urlencoded({
  limit: "50mb",
  extended: true,
}));

route.post('/send-message', validateContact, controller.sendMessage);

app.use(cors());
app.use('/api/v1', route);

export default app;

