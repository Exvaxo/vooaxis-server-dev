const count = async (request, reply, fastify) => {
  try {
    const count = await fastify.MediaBank.estimatedDocumentCount({});
    reply.code(200).send({ count });
  } catch (error) {
    fastify.httpErrors.internalServerError();
    fastify.log.error(error);
  }
};

module.exports = count;
