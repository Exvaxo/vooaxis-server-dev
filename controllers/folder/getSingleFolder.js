const getSingleFolder = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const folder = await fastify.Folder.findOne({
      _id: id,
    });
    reply.code(200).send(folder);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getSingleFolder;
