"use strict";

const {
  signup,
  signin,
  profile,
  logout,
  sendResetPasswordToken,
  resetPassword,
  getAllStaffs,
  getStaffDetail,
  deleteStaff,
} = require("../../controllers/staff");

const staffAuth = require("../../middlewares/staffAuth");

module.exports = async function (fastify) {
  // @route   POST staffs/signup
  // @desc    creates a new staff
  // @access  public
  fastify.route({
    method: "POST",
    url: "/signup",
    schema: {
      tags: ["Staffs"],
      description: "registers a new staff ",
      body: {
        type: "object",
        required: ["username", "email"],
        properties: {
          id: {
            type: "string",
          },
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          username: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          permissions: {
            type: "string",
          },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        400: {
          type: "object",
          properties: {
            field: {
              type: "string",
            },
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
    handler: (request, reply) => signup(request, reply, fastify),
  });

  // @route   POST staffs/signin
  // @desc    logs in a staff
  // @access  public
  fastify.route({
    method: "POST",
    url: "/signin",
    schema: {
      tags: ["Staffs"],
      description: "signs in a new staff ",
      body: {
        type: "object",
        required: ["usernameOrEmail", "password"],
        properties: {
          usernameOrEmail: {
            description: "allows username or email",
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            email: {
              type: "string",
            },
            permission: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                permissions: {
                  type: "object",
                  patternProperties: {
                    "^.*$": {
                      anyOf: [{ type: "array", items: "string" }],
                    },
                  },
                  additionalProperties: false,
                },
              },
            },
          },
        },
        400: {
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
    handler: (request, reply) => signin(request, reply, fastify),
  });

  // @route   POST staffs/send-reset-password-token
  // @desc    sends token to the email address to reset password
  // @access  public
  fastify.route({
    method: "POST",
    url: "/send-reset-password-token",
    schema: {
      tags: ["Staffs"],
      description: "sends token to the email address to reset password",
      body: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
          },
        },
      },
      response: {
        204: {
          type: "string",
          default: "email sent",
        },
        400: {
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
    handler: (request, reply) =>
      sendResetPasswordToken(request, reply, fastify),
  });

  // @route   POST staffs/reset-password/:token
  // @desc    resets password based on token recieved
  // @access  public
  fastify.route({
    method: "POST",
    url: "/reset-password/:token",
    schema: {
      tags: ["Staffs"],
      description:
        "resets the password based on the token and logs in the staff",
      params: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
        },
      },
      body: {
        type: "object",
        required: ["password"],
        properties: {
          password: {
            type: "string",
          },
        },
      },
      response: {
        204: {
          type: "string",
          default: "password reset done",
        },
        400: {
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
    handler: (request, reply) => resetPassword(request, reply, fastify),
  });

  // @route   POST staffs/logout
  // @desc    logs out a user
  // @access  private
  fastify.route({
    method: "POST",
    url: "/logout",
    schema: {
      tags: ["Staffs"],
      description: "signs out a new user ",
      response: {
        204: {
          type: "string",
          default: "logged out",
        },
        400: {
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
    handler: (request, reply) => logout(request, reply, fastify),
  });

  // @route   GET satffs/profile
  // @desc    gets user info based on cookie
  // @access  public
  fastify.route({
    method: "GET",
    url: "/profile",
    schema: {
      tags: ["Staffs"],
      description: "gets user information based on cookie",
      response: {
        200: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            username: {
              type: "string",
            },
            email: {
              type: "string",
            },
            permission: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                permissions: {
                  type: "object",
                  patternProperties: {
                    "^.*$": {
                      anyOf: [{ type: "array", items: "string" }],
                    },
                  },
                  additionalProperties: false,
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
        403: {
          type: "object",
          properties: {
            msg: {
              type: "string",
            },
          },
        },
        400: {
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
    handler: (request, reply) => profile(request, reply, fastify),
  });

  // @route   GET staffs/staff-detail/:id
  // @desc    gets user info based on id
  // @access  public
  fastify.route({
    method: "GET",
    url: "/staff-detail/:id",
    schema: {
      tags: ["Staffs"],
      description: "gets user information based on id",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            username: {
              type: "string",
            },
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            email: {
              type: "string",
            },
            permission: {
              type: "object",
              properties: {
                _id: { type: "string" },
                name: { type: "string" },
                permissions: {
                  type: "object",
                  patternProperties: {
                    "^.*$": {
                      anyOf: [{ type: "array", items: "string" }],
                    },
                  },
                  additionalProperties: false,
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
        400: {
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
    handler: (request, reply) => getStaffDetail(request, reply, fastify),
  });

  // @route   GET staffs/staff-detail/:id
  // @desc    gets user info based on id
  // @access  private
  fastify.route({
    method: "GET",
    url: "/all-staffs",
    schema: {
      tags: ["Staffs"],
      description: "gets all staffs informations",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              username: {
                type: "string",
              },
              firstName: {
                type: "string",
              },
              lastName: {
                type: "string",
              },
              email: {
                type: "string",
              },
              permission: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                  permissions: {
                    type: "object",
                    patternProperties: {
                      "^.*$": {
                        anyOf: [{ type: "array", items: "string" }],
                      },
                    },
                    additionalProperties: false,
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
        400: {
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
    handler: (request, reply) => getAllStaffs(request, reply, fastify),
  });

  // @route   DELETE staffs/:id
  // @desc    deletes a user based on id
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["Staffs"],
      description: "deletes a staff based on id",
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
        400: {
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
    handler: (request, reply) => deleteStaff(request, reply, fastify),
  });
};
