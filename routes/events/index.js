"use strict";

const {
  createEvent,
  getStaffEvents,
  getStaffSingleEvent,
  updateEvent,
  deleteEvent,
  getCount,
} = require("../../controllers/Event");

const staffAuth = require("../../middlewares/staffAuth");

module.exports = async function (fastify) {
  // @route   POST Event/Events
  // @desc    creates a new Event
  // @access  private
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Events"],
      description: "create a Event",
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
    handler: (request, reply) => createEvent(request, reply, fastify),
  });

  // @route   GET staff_Events
  // @desc    gets all Events with search function
  // @access  private
  fastify.route({
    method: "GET",
    url: "/staff_events",
    schema: {
      tags: ["Events"],
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
                  eventDetails: {
                    type: "string",
                  },
                  slug: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                  date: {
                    type: "string",
                  },
                  thumbnail: {
                    type: "string",
                  },
                  linkType: {
                    type: "string",
                  },
                  link: {
                    type: "string",
                  },

                  informations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        field: {
                          type: "string",
                        },
                        value: {
                          type: "string",
                        },
                      },
                    },
                  },
                  tabs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        body: {
                          type: "string",
                        },
                      },
                    },
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
    handler: (request, reply) => getStaffEvents(request, reply, fastify),
  });

  // @route   GET staff_single_Event
  // @desc    gets Event by docId
  // @access  private
  fastify.route({
    method: "GET",
    url: "/staff_single_event/:docId",
    schema: {
      tags: ["Events"],
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
            eventDetails: {
              type: "string",
            },
            slug: {
              type: "string",
            },
            title: {
              type: "string",
            },
            date: {
              type: "string",
            },
            thumbnail: {
              type: "string",
            },
            linkType: {
              type: "string",
            },
            link: {
              type: "string",
            },

            informations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  field: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                },
              },
            },
            tabs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  body: {
                    type: "string",
                  },
                },
              },
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
    handler: (request, reply) => getStaffSingleEvent(request, reply, fastify),
  });

  // @route   GET Event/count
  // @desc    gets the count of Events
  // @access  public
  fastify.route({
    method: "GET",
    url: "/count",
    schema: {
      tags: ["Events"],
      description: "gets the count of all Events",
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

  // @route   PUT Events/:docId
  // @desc    updates a Event
  // @access  private
  fastify.route({
    method: "PUT",
    url: "/:docId",
    schema: {
      tags: ["Events"],
      description: "updating a Event",
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
          eventDetails: {
            type: "string",
          },
          title: {
            type: "string",
          },
          date: {
            type: "string",
          },
          thumbnail: {
            type: "string",
          },
          linkType: {
            type: "string",
          },
          link: {
            type: "string",
          },
          informations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                field: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
              },
            },
          },
          tabs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                body: {
                  type: "string",
                },
              },
            },
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

            title: {
              type: "string",
            },

            date: {
              type: "string",
            },

            thumbnail: {
              type: "string",
            },

            linkType: {
              type: "string",
            },

            link: {
              type: "string",
            },

            informations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  field: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                },
              },
            },
            tabs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  body: {
                    type: "string",
                  },
                },
              },
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
    handler: (request, reply) => updateEvent(request, reply, fastify),
  });

  // @route   DELETE Event/Events/:docId
  // @desc    deletes a Event
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:docId",
    schema: {
      tags: ["Events"],
      description: "delete a Event",
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
    handler: (request, reply) => deleteEvent(request, reply, fastify),
  });
};
