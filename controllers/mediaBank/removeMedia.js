const removeMedia = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    await fastify.MediaBank.deleteOne({
      _id: id,
    });
    reply.code(204).send("no content");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = removeMedia;
