require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
require('./config/connection');
const cors = require('cors');
const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { AuthController } = require('./controllers');
const BaseResponse = require('./utilities/response');

const { personalChat } = require('./socket-controllers');

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    exposedHeaders: ['Content-Disposition']
}));


const apiRoute = '/api/v1/';

const generateApiRoute = (route) => `${apiRoute}${route}`;

app.use(generateApiRoute('swagger-ui'), swagger.serve, swagger.setup(swaggerDocument));
app.use(generateApiRoute('auth'), AuthController);


app.use('*', (req, res) => {
    return res.status(404).json(BaseResponse.sendError('Not found.'));
});

const env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

const appServer = app.listen(process.env.PORT || 4001, () => {
    console.log(`Server started on port (${process.env.PORT || 4001}) in a (${env}) environment`);
});

