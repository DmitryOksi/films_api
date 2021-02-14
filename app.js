const express = require("express");
const app = express();

var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});

require('dotenv/config');

const mongoose = require('mongoose');
const db = require('./context/index')(mongoose);

const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const filmRoutes = require('./routes/film')(router, db.film, upload);
app.use("/films", filmRoutes);


app.listen(process.env.PORT, () => {
    console.log('server is running!')

});