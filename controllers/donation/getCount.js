const count = async (request, reply, fastify) => {
  try {
    const count = await fastify.Donation.estimatedDocumentCount({});
    reply.code(200).send({ count });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = count;
