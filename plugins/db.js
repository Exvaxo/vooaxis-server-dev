const fp = require("fastify-plugin");
const mongoose = require("mongoose");

const appConfig = require("../config/appConfig");
module.exports = fp((fastify, opts, next) => {
  mongoose.connect(appConfig.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  let db = mongoose.connection;

  db.once("open", () => fastify.log.info("Mongo db connection successfull"));

  db.on("error", (err) => fastify.log.error(err));
  next();
});
