const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { readdirSync } = require('fs')


// app
const app = express();


// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then(() => console.log('DB Connected'));
mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`);
});

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors());


// routes middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))


// port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on PORT ${port}`));