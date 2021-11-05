const fp = require("fastify-plugin");
//import models
const Note = require("../model/Note");
const User = require("../model/User");
const Staff = require("../model/Staff");
const Permission = require("../model/Permission");
const Blog = require("../model/Blog");
const Event = require("../model/Event");
const MediaBank = require("../model/MediaBank");
const Media = require("../model/Media");
const Folder = require("../model/Folder");
const ResetPasswordSession = require("../model/Reset_Password_Session");

module.exports = fp((fastify, opts, next) => {
  //decorate models in order to expose as global plugins
  fastify.decorate("Note", Note);
  fastify.decorate("User", User);
  fastify.decorate("Staff", Staff);
  fastify.decorate("Permission", Permission);
  fastify.decorate("Blog", Blog);
  fastify.decorate("Event", Event);
  fastify.decorate("MediaBank", MediaBank);
  fastify.decorate("Media", Media);
  fastify.decorate("Folder", Folder);
  fastify.decorate("ResetPasswordSession", ResetPasswordSession);
  next();
});
