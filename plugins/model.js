const fp = require("fastify-plugin");
//import models
const Note = require("../model/Note");
const User = require("../model/User");
const Staff = require("../model/Staff");
const Blog = require("../model/Blog");
const MediaBank = require("../model/MediaBank");
const ResetPasswordSession = require("../model/Reset_Password_Session");

module.exports = fp((fastify, opts, next) => {
  //decorate models in order to expose as global plugins
  fastify.decorate("Note", Note);
  fastify.decorate("User", User);
  fastify.decorate("Staff", Staff);
  fastify.decorate("Blog", Blog);
  fastify.decorate("MediaBank", MediaBank);
  fastify.decorate("ResetPasswordSession", ResetPasswordSession);
  next();
});
