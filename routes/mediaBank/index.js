"use strict";

const {
  getMedias,
  getCount,
  uploadMedias,
  removeMedia,
} = require("../../controllers/mediaBank");
const staffAuth = require("../../middlewares/staffAuth");

module.exports = async function (fastify) {
  // @route   POST mediaBank
  // @desc    creates a new note
  // @access  private
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Media Bank"],
      description: "upload medias",
      body: {
        type: "object",
        required: ["name", "type", "url", "ref"],
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
    handler: (request, reply) => uploadMedias(request, reply, fastify),
  });

  // @route   GET mediaBank/
  // @desc    gets all notes with search function
  // @access  private
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Media Bank"],
      description: "get all medias with search function",
      query: {
        "filter[name]": { type: "string" },
      },
      response: {
        200: {
          type: "array",
          items: {
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
    handler: (request, reply) => getMedias(request, reply, fastify),
  });

  // @route   GET note/count
  // @desc    gets the count of notes
  // @access  public
  fastify.route({
    method: "GET",
    url: "/count",
    schema: {
      tags: ["Media Bank"],
      description: "gets the count of all medias",
      response: {
        200: {
          type: "object",
          properties: {
            count: {
              type: "number",
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
    handler: (request, reply) => getCount(request, reply, fastify),
  });

  // @route   DELETE mediaBank/:id
  // @desc    deletes a note
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["Media BAnk"],
      description: "deleting a media",
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
};
