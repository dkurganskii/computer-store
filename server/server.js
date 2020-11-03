const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// import routes
const authRoutes = require('./routes/auth');

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
app.use(bodyParser.json());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);


// port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on PORT ${port}`));