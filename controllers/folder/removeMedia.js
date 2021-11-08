const removeMedia = async (request, reply, fastify) => {
  try {
    const { id } = request.params;

    const user_id = request.staff;
    const isEligible = await fastify.getPermissions(user_id, [
      { rule: "Gallery", priviledges: ["delete"] },
    ]);

    if (!isEligible) {
      reply
        .code(403)
        .send({ msg: "You have no permission to perform this task." });
      return;
    }

    await fastify.Media.deleteOne({
      _id: id,
    });
    reply.code(204).send("no content");
  } catch (error) {
    reply.code(500).send({ msg: "server error" });
    fastify.log.error(error);
  }
};

module.exports = removeMedia;
