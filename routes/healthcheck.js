"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Health check"],
      description: "Checks whether the server is up and running.",
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            time: { type: "string", format: "date-time" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      return { status: "ok", time: new Date().toISOString() };
    },
  });
};
