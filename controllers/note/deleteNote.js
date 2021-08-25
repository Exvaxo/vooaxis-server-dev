const updateNote = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const _id = request.user;
    await fastify.Note.deleteOne({ _id: id, user: _id });
    reply.code(204).send("no content");
  } catch (error) {
    fastify.httpErrors.internalServerError();
    fastify.log.error(error);
  }
};

module.exports = updateNote;
