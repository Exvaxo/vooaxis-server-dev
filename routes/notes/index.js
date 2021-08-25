"use strict";

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getCount,
} = require("../../controllers/note");
const userAuth = require("../../middlewares/userAuth");

module.exports = async function (fastify) {
  // @route   POST note/notes
  // @desc    creates a new note
  // @access  private
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Notes"],
      description: "create a note",
      body: {
        type: "object",
        required: ["title", "body"],
        properties: {
          title: {
            type: "string",
          },
          body: {
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
            title: {
              type: "string",
            },
            body: {
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
    preHandler: userAuth,
    handler: (request, reply) => createNote(request, reply, fastify),
  });

  // @route   GET note/notes
  // @desc    gets all notes with search function
  // @access  private
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Notes"],
      description: "get all posts with search function",
      query: {
        "filter[body]": { type: "string" },
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
              title: {
                type: "string",
              },
              body: {
                type: "string",
              },
              user: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                },
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
    preHandler: userAuth,
    handler: (request, reply) => getNotes(request, reply, fastify),
  });

  // @route   GET note/count
  // @desc    gets the count of notes
  // @access  public
  fastify.route({
    method: "GET",
    url: "/count",
    schema: {
      tags: ["Notes"],
      description: "gets the count of all notes",
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

  // @route   PUT note/notes/:id
  // @desc    updates a note
  // @access  private
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      tags: ["Notes"],
      description: "updating a note",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
      body: {
        type: "object",
        required: ["title", "body"],
        properties: {
          title: {
            type: "string",
          },
          body: {
            type: "string",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "unique identifier",
            },
            title: {
              type: "string",
            },
            body: {
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
    preHandler: userAuth,
    handler: (request, reply) => updateNote(request, reply, fastify),
  });

  // @route   DELETE note/notes/:id
  // @desc    deletes a note
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["Notes"],
      description: "updating a note",
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
    preHandler: userAuth,
    handler: (request, reply) => deleteNote(request, reply, fastify),
  });
};
