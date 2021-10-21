"use strict";

const {
  createPermission,
  getPermissions,
  deletePermission,
} = require("../../controllers/permission");

const staffAuth = require("../../middlewares/staffAuth");

module.exports = async function (fastify) {
  // @route   POST permission/
  // @desc    creates permission
  // @access  private
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Permission"],
      description: "create a permission",
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          permissions: {
            type: "object",
            patternProperties: {
              "^.*$": {
                anyOf: [{ type: "array", items: { type: "string" } }],
              },
            },
            additionalProperties: false,
          },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            permissions: {
              type: "object",
              patternProperties: {
                "^.*$": {
                  anyOf: [{ type: "array", items: { type: "string" } }],
                },
              },
              additionalProperties: false,
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
    handler: (request, reply) => createPermission(request, reply, fastify),
  });

  // @route   GET permission/
  // @desc    get permission
  // @access  private
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Permission"],
      description: "gets all permissions",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              description: {
                type: "string",
              },
              count: {
                type: "number",
              },
              permissions: {
                type: "object",
                patternProperties: {
                  "^.*$": {
                    anyOf: [{ type: "array", items: { type: "string" } }],
                  },
                },
                additionalProperties: false,
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
    handler: (request, reply) => getPermissions(request, reply, fastify),
  });

  // @route   DELETE permission/:id
  // @desc    deletes a permission
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["Permission"],
      description: "delete a permission",
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
    handler: (request, reply) => deletePermission(request, reply, fastify),
  });
};
