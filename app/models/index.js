const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.DB_URL;
db.tutorials = require("./tutorial.model");

module.exports = db;
