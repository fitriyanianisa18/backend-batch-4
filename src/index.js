require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');

// import router
const router = require('./routes/router');
const userRouter = require('./routes/userRouter')
const todoRouter = require('./routes/todoRouter')

// import custom middleware
const {logger} = require('./middleware/logger');

// inisiasi instance express dalam variabel app
const app = express();

// use middleware
app.use(logger)
app.use(compression())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);
app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)

// handle error jika route tidak ditemukan
app.get ('/*splat',async (req, res, next) => {
    return res.status(400).json({
        message: "Route not found",
        data: null
    })
})

// global error handling untuk tiap service
app.use ((err, req, res, next) => {
    console.log("Terjadi error", err.stack || err)

    return res.status(err.status || 500).json({
        message: "Terjadi error",
        data: err.message || "Internal server error"
    })
})

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});