const getFolders = require("./getFolders");
const getFolder = require("./getFolder");
const uploadGallery = require("./uploadGallery");
const removeMedia = require("./removeMedia");
const removeFolder = require("./removeFolder");
const updateFolder = require("./updateFolder");
const getSingleFolder = require("./getSingleFolder");
const createFolder = require("./createFolder");
const getCount = require("./getCount");

module.exports = {
  getFolder,
  getFolders,
  uploadGallery,
  getSingleFolder,
  updateFolder,
  removeMedia,
  removeFolder,
  getCount,
  createFolder,
};
