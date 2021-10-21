const getAllStaffs = async (request, reply, fastify) => {
  try {
    const _uid = request.staff;

    const isEligible = await fastify.getPermissions(_uid, [
      { rule: "Staff", priviledges: ["read"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const staff = await fastify.Staff.find({}).populate({
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

module.exports = getAllStaffs;
