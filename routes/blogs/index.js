"use strict";

const {
  createBlog,
  getStaffBlogs,
  updateBlog,
  deleteBlog,
  getCount,
} = require("../../controllers/blog");

const staffAuth = require("../../middlewares/staffAuth");

module.exports = async function (fastify) {
  // @route   POST Blog/blogs
  // @desc    creates a new Blog
  // @access  private
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Blogs"],
      description: "create a Blog",
      body: {
        type: "object",
        required: ["documentId"],
        properties: {
          documentId: {
            type: "string",
          },
          slug: {
            type: "string",
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
            slug: {
              type: "string",
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
    handler: (request, reply) => createBlog(request, reply, fastify),
  });

  // @route   GET staff_blogs
  // @desc    gets all Blogs with search function
  // @access  private
  fastify.route({
    method: "GET",
    url: "/staff_blogs",
    schema: {
      tags: ["Blogs"],
      description: "get all posts with search function for staff",
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
              documentId: {
                type: "string",
              },
              slug: {
                type: "string",
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
    handler: (request, reply) => getStaffBlogs(request, reply, fastify),
  });

  // @route   GET Blog/count
  // @desc    gets the count of Blogs
  // @access  public
  fastify.route({
    method: "GET",
    url: "/count",
    schema: {
      tags: ["Blogs"],
      description: "gets the count of all Blogs",
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

  // @route   PUT Blogs/:docId
  // @desc    updates a Blog
  // @access  private
  fastify.route({
    method: "PUT",
    url: "/:docId",
    schema: {
      tags: ["Blogs"],
      description: "updating a Blog",
      params: {
        type: "object",
        required: ["docId"],
        properties: {
          docId: { type: "string" },
        },
      },
      body: {
        type: "object",
        required: ["title", "body"],
        properties: {
          slug: {
            type: "string",
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
    handler: (request, reply) => updateBlog(request, reply, fastify),
  });

  // @route   DELETE Blog/Blogs/:docId
  // @desc    deletes a Blog
  // @access  private
  fastify.route({
    method: "DELETE",
    url: "/:docId",
    schema: {
      tags: ["Blogs"],
      description: "delete a Blog",
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
    handler: (request, reply) => deleteBlog(request, reply, fastify),
  });
};
