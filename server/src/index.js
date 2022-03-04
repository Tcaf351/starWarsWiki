// install dependencies
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');


// import custom modules
const ApiError = require('./utilities/ApiError');
const apiErrorHandler = require('./middleware/apiErrorHandler');


// general app settings and data
const config = require('./config/config');


// initialize express
const app = express();


// import routes
const routes = require('./routes/routes');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(morgan('dev'));
app.options('*', cors());
app.use(helmet());

// File Parsing Middleware
app.use(fileUpload());

// API Main routing file
app.use('/api', routes());

// 404 - Not Found Route
app.use((req, res, next) => {
    next(ApiError.notFound());
});

// Express Error Handler Middleware
app.use(apiErrorHandler);

// listen to port the server is running on
const PORT = config.port;
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));