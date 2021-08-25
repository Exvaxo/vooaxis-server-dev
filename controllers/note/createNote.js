const createNote = async (request, reply, fastify) => {
  const { title, body } = request.body;
  try {
    const _id = request.user;
    const note = await fastify.Note.create({ title, body, user: _id });
    reply.code(201).send(note);
  } catch (error) {
    fastify.httpErrors.internalServerError();
    fastify.log.error(error);
  }
};

module.exports = createNote;
