const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    storage: "./dev.sqlite3",
    dialect: "sqlite",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false, //for reading from database
    },
    timezone: "+07:00", //for writing to database
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    dialect: "mysql",
    dialectOptions: {
      options: {
        validateBulkLoadParameters: false,
        useUTC: false, 
      },
    },
    timezone: "+07:00",
  },
};
