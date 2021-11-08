const createFolder = async (request, reply, fastify) => {
  try {
    const { _id, name } = request.body;
    const user_id = request.staff;

    const isEligible = await fastify.getPermissions(user_id, [
      { rule: "Gallery", priviledges: ["create"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }
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
