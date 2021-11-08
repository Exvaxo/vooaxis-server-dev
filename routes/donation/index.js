"use strict";

const {
  createDonation,
  getStaffDonations,
  getStaffSingleDonation,
  updateDonation,
  deleteDonation,
  getCount,
} = require("../../controllers/donation");

const staffAuth = require("../../middlewares/staffAuth");

module.exports = async function (fastify) {
  // @route   POST Donation/
  // @desc    creates a new donation
  // @access  private
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Donations"],
      description: "create a donation",
      body: {
        type: "object",
        required: ["documentId"],
        properties: {
          documentId: {
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
            documentId: {
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
    handler: (request, reply) => createDonation(request, reply, fastify),
  });

  // @route   GET staff_donations
  // @desc    gets all Donation with search function
  // @access  private
  fastify.route({
    method: "GET",
    url: "/staff_donations",
    schema: {
      tags: ["Donation"],
      description: "get all posts with search function for staff",
      query: {
        "filter[body]": { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "unique identifier",
                  },
                  documentId: {
                    type: "string",
                  },
                  slug: {
                    type: "string",
                  },
                  goal: {
                    type: "number",
                  },
                  title: {
                    type: "string",
                  },
                  subtitle: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  thumbnail: {
                    type: "string",
                  },
                  body: {
                    type: "string",
                  },
                  isPublished: {
                    type: "boolean",
                  },
                  isUnderReview: {
                    type: "boolean",
                  },
                  staff: {
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
            pages: {
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
    preHandler: staffAuth,
    handler: (request, reply) => getStaffDonations(request, reply, fastify),
  });

  // @route   GET staff_single_donation
  // @desc    gets Donation by docId
  // @access  private
  fastify.route({
    method: "GET",
    url: "/staff_single_donation/:docId",
    schema: {
      tags: ["Donation"],
      description: "get single posts for staff",
      params: {
        type: "object",
        required: ["docId"],
        properties: {
          docId: { type: "string" },
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
            documentId: {
              type: "string",
            },
            slug: {
              type: "string",
            },
            goal: {
              type: "number",
            },
            title: {
              type: "string",
            },
            subtitle: {
              type: "string",
            },
            category: {
              type: "string",
            },
            thumbnail: {
              type: "string",
            },
            body: {
              type: "string",
            },
            isPublished: {
              type: "boolean",
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
    handler: (request, reply) =>
      getStaffSingleDonation(request, reply, fastify),
  });

  // @route   GET Donation/count
  // @desc    gets the count of Donations
  // @access  public
  fastify.route({
    method: "GET",
    url: "/count",
    schema: {
      tags: ["Donations"],
      description: "gets the count of all Donations",
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

  // @route   PUT donation/:docId
  // @desc    updates a Donation
  // @access  private
  fastify.route({
    method: "PUT",
    url: "/:docId",
    schema: {
      tags: ["Donations"],
      description: "updating a Donation",
      params: {
        type: "object",
        required: ["docId"],
        properties: {
          docId: { type: "string" },
        },
      },
      body: {
        type: "object",
        properties: {
          slug: {
            type: "string",
          },
          title: {
            type: "string",
          },
          goal: {
            type: "number",
          },
          subtitle: {
            type: "string",
          },
          category: {
            type: "string",
          },
          thumbnail: {
            type: "string",
          },
          body: {
            type: "string",
          },
          isPublished: {
            type: "boolean",
          },
          isUnderReview: {
            type: "boolean",
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

            slug: {
              type: "string",
            },

            goal: {
              type: "number",
            },

            title: {
              type: "string",
            },

            subtitle: {
              type: "string",
            },

            category: {
              type: "string",
            },

            thumbnail: {
              type: "string",
            },

            body: {
              type: "string",
            },

            isPublished: {
              type: "boolean",
            },

            isUnderReview: {
              type: "boolean",
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
    handler: (request, reply) => updateDonation(request, reply, fastify),
  });

  // @route   DELETE donation/:docId
  // @desc    deletes a Blog
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:docId",
    schema: {
      tags: ["Donation"],
      description: "delete a Donation",
      params: {
        type: "object",
        required: ["docId"],
        properties: {
          docId: { type: "string" },
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
    handler: (request, reply) => deleteDonation(request, reply, fastify),
  });
};
