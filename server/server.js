require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./todo/index');
const user = require('./user/index');
const port = process.env.PORT;

var { mongoose } = require('./db/mongoose');
var app = express();

app.use(bodyParser.json());

// users and tods routes
app.use('/todos' ,todo);
app.use('/users' , user)


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
