const deleteNote = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const _id = request.staff;
    const count = await fastify.Staff.count({ permission: id });
    if (count === 0) {
      await fastify.Permission.deleteOne({ _id: id });
      reply.code(204).send("no content");
    } else {
      reply.code(403).send("there are users with this permission");
    }
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = deleteNote;
