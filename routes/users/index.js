"use strict";

const {
  signup,
  signin,
  profile,
  logout,
  sendResetPasswordToken,
  resetPassword,
} = require("../../controllers/user");

const userAuth = require("../../middlewares/userAuth");

module.exports = async function (fastify) {
  // @route   POST users/signup
  // @desc    creates a new note
  // @access  public
  fastify.route({
    method: "POST",
    url: "/signup",
    schema: {
      tags: ["Users"],
      description: "registers a new user ",
      body: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
          username: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
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
    handler: (request, reply) => signup(request, reply, fastify),
  });

  // @route   POST users/signin
  // @desc    logs in a user
  // @access  public
  fastify.route({
    method: "POST",
    url: "/signin",
    schema: {
      tags: ["Users"],
      description: "signs in a new user ",
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

  // @route   POST users/send-reset-password-token
  // @desc    sends token to the email address to reset password
  // @access  public
  fastify.route({
    method: "POST",
    url: "/send-reset-password-token",
    schema: {
      tags: ["Users"],
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

  // @route   POST users/reset-password/:token
  // @desc    resets password based on token recieved
  // @access  public
  fastify.route({
    method: "POST",
    url: "/reset-password/:token",
    schema: {
      tags: ["Users"],
      description:
        "resets the password based on the token and logs in the user",
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

  // @route   POST users/logout
  // @desc    logs out a user
  // @access  private
  fastify.route({
    method: "POST",
    url: "/logout",
    schema: {
      tags: ["Users"],
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
    handler: (request, reply) => logout(request, reply, fastify),
  });

  // @route   GET users/profile
  // @desc    gets user info based on cookie
  // @access  public
  fastify.route({
    method: "GET",
    url: "/profile",
    schema: {
      tags: ["Users"],
      description: "gets user information based on cookie",
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
    preHandler: (request, reply) => userAuth(request, reply, fastify),
    handler: (request, reply) => profile(request, reply, fastify),
  });
};
