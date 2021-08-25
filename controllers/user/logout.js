const logout = async (request, reply, fastify) => {
  try {
    request.session.user = null;
    request.sessionStore.destroy(request.session.sessionId, (err) => {
      if (err) {
        reply.code(500).send({ msg: "server error" });
        fastify.log.error(err);
        return;
      }
    });
    reply.code(204).send("logged out");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = logout;
