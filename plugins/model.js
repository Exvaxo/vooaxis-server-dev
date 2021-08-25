const fp = require("fastify-plugin");
//import models
const Note = require("../model/Note");
const User = require("../model/User");
const ResetPasswordSession = require("../model/Reset_Password_Session");

module.exports = fp((fastify, opts, next) => {
  //decorate models in order to expose as global plugins
  fastify.decorate("Note", Note);
  fastify.decorate("User", User);
  fastify.decorate("ResetPasswordSession", ResetPasswordSession);
  next();
});
