"use strict";
const session = require("fastify-session");
const MongoStore = require("connect-mongo");
const cookie = require("fastify-cookie");
const fp = require("fastify-plugin");
const appConfig = require("../config/appConfig");

const plugin = async (fastify) => {
  fastify.register(cookie);
  fastify.register(session, {
    secret: appConfig.sessionSecret,
    store: MongoStore.create({
      mongoUrl: appConfig.mongoUri,
      collectionName: "user_sessions",
    }),
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: new Date().setTime(
        new Date().getTime() + 3650 * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV !== "development",
    },
  });
};

module.exports = fp(plugin);
