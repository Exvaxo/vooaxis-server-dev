const updateFolder = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const { title, description, folderName } = request.body;

    const user_id = request.staff;
    const isEligible = await fastify.getPermissions(user_id, [
      { rule: "Gallery", priviledges: ["update"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

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
