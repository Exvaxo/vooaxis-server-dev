const profile = async (request, reply, fastify) => {
  try {
    const _id = request.user;
    const user = await fastify.User.findOne({ _id });

    if (!user) {
      reply.code(400).send({ msg: "invalid credentials" });
      return;
    }
    reply.code(200).send(user);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = profile;
