const getSingleFolder = async (request, reply, fastify) => {
  try {
    const { id } = request.params;
    const folder = await fastify.Folder.findOne({
      _id: id,
    });
    const user_id = request.staff;
    const isEligible = await fastify.getPermissions(user_id, [
      { rule: "Gallery", priviledges: ["read"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    reply.code(200).send(folder);
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = getSingleFolder;
