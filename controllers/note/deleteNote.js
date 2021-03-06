const deleteNote = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const _id = request.user;
    await fastify.Note.deleteOne({ _id: id, user: _id });
    reply.code(204).send("no content");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = deleteNote;
