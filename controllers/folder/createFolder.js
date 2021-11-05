const createFolder = async (request, reply, fastify) => {
  try {
    const { _id, name } = request.body;
    const media = await fastify.Folder.create({
      folder_id: _id,
      folderName: name,
    });
    reply.code(201).send(media);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = createFolder;
