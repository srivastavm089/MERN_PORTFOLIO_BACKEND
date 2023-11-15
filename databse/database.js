const mongoose = require("mongoose");
const fs = require("fs");
const connectDataBase = () => {
  mongoose.connect(process.env.DBS_SERVER).then((c) => {
    console.log(`mongodb connected to ${c.connection.host}`);
  });
};

module.exports = connectDataBase;
