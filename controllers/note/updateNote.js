const updateNote = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const { title, body } = request.body;
    const _id = request.user;
    await fastify.Note.updateOne({ _id: id, user: _id }, { title, body });
    reply.code(201).send({ _id: id, title, body });
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = updateNote;
