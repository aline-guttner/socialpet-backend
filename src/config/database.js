// const mongoose = require('mongoose');
import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/socialpet");

let database = mongoose.connection;

export default database;
