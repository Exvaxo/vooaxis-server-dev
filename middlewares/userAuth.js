module.exports = async (request, reply, fastify) => {
  try {
    const { userId, isLoggedIn } = request.session.user;
    if (isLoggedIn) {
      request.user = userId;
      return;
    }
  } catch (error) {
    reply.code(401).send({ msg: "You are not allowed to view this content." });
    fastify.log.error(error);
  }
};
