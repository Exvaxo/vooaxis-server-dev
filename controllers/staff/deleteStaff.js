const deleteStaff = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const _id = request.staff;

    if (id === _id) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    const isEligible = await fastify.getPermissions(_id, [
      { rule: "Staff", priviledges: ["delete"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    await fastify.Staff.deleteOne({ _id: id });
    reply.code(204).send("no content");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = deleteStaff;
