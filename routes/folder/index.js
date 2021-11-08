"use strict";
const {
  getFolders,
  getFolder,
  uploadGallery,
  removeMedia,
  removeFolder,
  getCount,
  getSingleFolder,
  updateFolder,
  createFolder,
} = require("../../controllers/folder");

const staffAuth = require("../../middlewares/staffAuth");

module.exports = async function (fastify) {
  // @route   POST folder/create-folder
  // @desc    creates a new folder
  // @access  private
  fastify.route({
    method: "POST",
    url: "/create-folder",
    schema: {
      tags: ["Folder"],
      description: "create a folder",
      body: {
        type: "object",
        properties: {
          folderName: {
            type: "string",
          },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "unique identifier",
            },
            folder_id: {
              type: "string",
            },
            folderName: {
              type: "string",
            },
          },
        },

        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },

        403: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },

        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => createFolder(request, reply, fastify),
  });

  // @route   PUT folder/update-folder
  // @desc    updates a new folder
  // @access  private
  fastify.route({
    method: "PUT",
    url: "/update-folder/:id",
    schema: {
      tags: ["Folder"],
      description: "updates a folder",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },

      body: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },

          description: {
            type: "string",
          },
        },
      },

      response: {
        201: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "unique identifier",
            },
            folder_id: {
              type: "string",
            },
            folderName: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
        },

        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },

        403: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },

        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => updateFolder(request, reply, fastify),
  });

  // @route   POST folder/upload-media/_id
  // @desc    uploads a new folder
  // @access  private
  fastify.route({
    method: "POST",
    url: "/upload-media/:_id",
    schema: {
      tags: ["Folder"],
      description: "uploads media to a folder",
      params: {
        type: "object",
        required: ["_id"],
        properties: {
          _id: { type: "string" },
        },
      },
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          url: {
            type: "string",
          },
          ref: {
            type: "string",
          },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "unique identifier",
            },
            name: {
              type: "string",
            },
            type: {
              type: "string",
            },
            url: {
              type: "string",
            },
            ref: {
              type: "string",
            },
          },
        },

        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },

        403: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },

        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => uploadGallery(request, reply, fastify),
  });

  // @route   GET folder/
  // @desc    gets all folders
  // @access  private
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Folder"],
      description: "get all folders",
      query: {
        "filter[name]": { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            medias: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "unique identifier",
                  },
                  folderName: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  created_at: {
                    type: "string",
                  },
                },
              },
            },
            pages: {
              type: "string",
            },
            count: {
              type: "string",
            },
          },
        },
        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => getFolder(request, reply, fastify),
  });

  // @route   GET folder/:id
  // @desc    get single folder
  // @access  private
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      tags: ["Folder"],
      description: "get single folder",
      response: {
        200: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "unique identifier",
            },
            folderName: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            created_at: {
              type: "string",
            },
          },
        },
        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        403: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => getSingleFolder(request, reply, fastify),
  });

  // @route   GET folder/medias/:id
  // @desc    gets folder media
  // @access  private
  fastify.route({
    method: "GET",
    url: "/medias/:id",
    schema: {
      tags: ["Folder"],
      description: "gets folder media",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
      query: {
        "filter[name]": { type: "string" },
        "filter[type]": { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            medias: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "unique identifier",
                  },
                  folderName: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  url: {
                    type: "string",
                  },
                  ref: {
                    type: "string",
                  },
                },
              },
            },
            pages: {
              type: "string",
            },
            count: {
              type: "string",
            },
          },
        },
        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => getFolders(request, reply, fastify),
  });

  // @route   DELETE folder/media/:id
  // @desc    deletes a media inside a folder
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/media/:id",
    schema: {
      tags: ["Folder"],
      description: "deletes a media in folder",

      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },

      response: {
        204: {
          type: "string",
          default: "no content",
        },
        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => removeMedia(request, reply, fastify),
  });

  // @route   DELETE folder/:id
  // @desc    deletes a folder
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["Folder"],
      description: "deletes a media in folder",

      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },

      response: {
        204: {
          type: "string",
          default: "no content",
        },
        401: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        403: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        500: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: staffAuth,
    handler: (request, reply) => removeFolder(request, reply, fastify),
  });
};
