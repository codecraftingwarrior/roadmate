const express = require('express')
const path = require('path')
const morgan = require('morgan')
const createError = require('http-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();

mongoose
    .connect(process.env.DATABASE_URL)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    })


const internauteRoutes = require('./routes/internaute.routes')
const authRoutes = require('./routes/auth.routes')
const covoiturageRoutes = require('./routes/covoiturage.routes')

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist/covoiturage-app')));
app.use('/', express.static(path.join(__dirname, 'dist/covoiturage-app')));
app.use('/api/auth', authRoutes);
app.use('/api/internautes', internauteRoutes);
app.use('/api/carpooling', covoiturageRoutes);

const port = process.env.PORT || 9090

const server = app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

app.use((req, res, next) => {
    const err = createError(404)
    next(res.status(err.statusCode).json({error: err.message}))
})

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})