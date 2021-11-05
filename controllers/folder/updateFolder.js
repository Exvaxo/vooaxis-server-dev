const updateFolder = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const { title, description, folderName } = request.body;

    await fastify.Folder.updateOne(
      { _id: id },
      { title, description, folderName }
    );
    console.log({ title, description });

    reply.code(204).send("updated");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = updateFolder;
