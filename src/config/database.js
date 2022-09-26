// const mongoose = require('mongoose');
import mongoose from "mongoose"

mongoose.connect(
    process.env.MONGO || 'mongodb://localhost:27017/socialpet',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
);

let database = mongoose.connection;

export default database;
