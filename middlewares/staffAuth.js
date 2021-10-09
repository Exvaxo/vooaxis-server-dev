module.exports = async (request, reply, fastify) => {
  try {
    const { staffId, isLoggedIn, isStaff } = request.session.staff;
    if (isLoggedIn && isStaff) {
      request.staff = staffId;
      return;
    }
  } catch (error) {
    reply.code(401).send({ msg: "You are not allowed to view this content." });
    fastify.log.error(error);
  }
};
