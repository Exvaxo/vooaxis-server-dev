const profile = async (request, reply, fastify) => {
  try {
    const _id = request.staff;
    const staff = await fastify.Staff.findOne({ _id }).populate({
      path: "permission",
    });

    if (!staff) {
      reply.code(400).send({ msg: "invalid credentials" });
      return;
    }

    reply.code(200).send(staff);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = profile;
